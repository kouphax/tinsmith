// Copyright 2012 The Polymer Authors. All rights reserved.
// Use of this source code is goverened by a BSD-style
// license that can be found in the LICENSE file.

window.ShadowDOMPolyfill = {};

(function(scope) {
  'use strict';

  var constructorTable = new WeakMap();
  var nativePrototypeTable = new WeakMap();
  var wrappers = Object.create(null);

  // Don't test for eval if document has CSP securityPolicy object and we can
  // see that eval is not supported. This avoids an error message in console
  // even when the exception is caught
  var hasEval = !('securityPolicy' in document) ||
      document.securityPolicy.allowsEval;
  if (hasEval) {
    try {
      var f = new Function('', 'return true;');
      hasEval = f();
    } catch (ex) {
      hasEval = false;
    }
  }

  function assert(b) {
    if (!b)
      throw new Error('Assertion failed');
  };

  function mixin(to, from) {
    Object.getOwnPropertyNames(from).forEach(function(name) {
      Object.defineProperty(to, name,
                            Object.getOwnPropertyDescriptor(from, name));
    });
    return to;
  };

  function mixinStatics(to, from) {
    Object.getOwnPropertyNames(from).forEach(function(name) {
      switch (name) {
        case 'arguments':
        case 'caller':
        case 'length':
        case 'name':
        case 'prototype':
        case 'toString':
          return;
      }
      Object.defineProperty(to, name,
                            Object.getOwnPropertyDescriptor(from, name));
    });
    return to;
  };

  function oneOf(object, propertyNames) {
    for (var i = 0; i < propertyNames.length; i++) {
      if (propertyNames[i] in object)
        return propertyNames[i];
    }
  }

  // Mozilla's old DOM bindings are bretty busted:
  // https://bugzilla.mozilla.org/show_bug.cgi?id=855844
  // Make sure they are create before we start modifying things.
  Object.getOwnPropertyNames(window);

  function getWrapperConstructor(node) {
    var nativePrototype = node.__proto__ || Object.getPrototypeOf(node);
    var wrapperConstructor = constructorTable.get(nativePrototype);
    if (wrapperConstructor)
      return wrapperConstructor;

    var parentWrapperConstructor = getWrapperConstructor(nativePrototype);

    var GeneratedWrapper = createWrapperConstructor(parentWrapperConstructor);
    registerInternal(nativePrototype, GeneratedWrapper, node);

    return GeneratedWrapper;
  }

  function addForwardingProperties(nativePrototype, wrapperPrototype) {
    installProperty(nativePrototype, wrapperPrototype, true);
  }

  function registerInstanceProperties(wrapperPrototype, instanceObject) {
    installProperty(instanceObject, wrapperPrototype, false);
  }

  var isFirefox = /Firefox/.test(navigator.userAgent);

  // This is used as a fallback when getting the descriptor fails in
  // installProperty.
  var dummyDescriptor = {
    get: function() {},
    set: function(v) {},
    configurable: true,
    enumerable: true
  };

  function isEventHandlerName(name) {
    return /^on[a-z]+$/.test(name);
  }

  function isIdentifierName(name) {
    return /^\w[a-zA-Z_0-9]*$/.test(name);
  }

  function getGetter(name) {
    return hasEval && isIdentifierName(name) ?
        new Function('return this.impl.' + name) :
        function() { return this.impl[name]; };
  }

  function getSetter(name) {
    return hasEval && isIdentifierName(name) ?
        new Function('v', 'this.impl.' + name + ' = v') :
        function(v) { this.impl[name] = v; };
  }

  function getMethod(name) {
    return hasEval && isIdentifierName(name) ?
        new Function('return this.impl.' + name +
                     '.apply(this.impl, arguments)') :
        function() { return this.impl[name].apply(this.impl, arguments); };
  }

  function installProperty(source, target, allowMethod) {
    Object.getOwnPropertyNames(source).forEach(function(name) {
      if (name in target)
        return;

      if (isFirefox) {
        // Tickle Firefox's old bindings.
        source.__lookupGetter__(name);
      }
      var descriptor;
      try {
        descriptor = Object.getOwnPropertyDescriptor(source, name);
      } catch (ex) {
        // JSC and V8 both use data properties instead of accessors which can
        // cause getting the property desciptor to throw an exception.
        // https://bugs.webkit.org/show_bug.cgi?id=49739
        descriptor = dummyDescriptor;
      }
      var getter, setter;
      if (allowMethod && typeof descriptor.value === 'function') {
        target[name] = getMethod(name);
        return;
      }

      var isEvent = isEventHandlerName(name);
      if (isEvent)
        getter = scope.getEventHandlerGetter(name);
      else
        getter = getGetter(name);

      if (descriptor.writable || descriptor.set) {
        if (isEvent)
          setter = scope.getEventHandlerSetter(name);
        else
          setter = getSetter(name);
      }

      Object.defineProperty(target, name, {
        get: getter,
        set: setter,
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable
      });
    });
  }

  /**
   * @param {Function} nativeConstructor
   * @param {Function} wrapperConstructor
   * @param {Object=} opt_instance If present, this is used to extract
   *     properties from an instance object.
   */
  function register(nativeConstructor, wrapperConstructor, opt_instance) {
    var nativePrototype = nativeConstructor.prototype;
    registerInternal(nativePrototype, wrapperConstructor, opt_instance);
    mixinStatics(wrapperConstructor, nativeConstructor);
  }

  function registerInternal(nativePrototype, wrapperConstructor, opt_instance) {
    var wrapperPrototype = wrapperConstructor.prototype;
    assert(constructorTable.get(nativePrototype) === undefined);

    constructorTable.set(nativePrototype, wrapperConstructor);
    nativePrototypeTable.set(wrapperPrototype, nativePrototype);

    addForwardingProperties(nativePrototype, wrapperPrototype);
    if (opt_instance)
      registerInstanceProperties(wrapperPrototype, opt_instance);
  }

  function isWrapperFor(wrapperConstructor, nativeConstructor) {
    return constructorTable.get(nativeConstructor.prototype) ===
        wrapperConstructor;
  }

  /**
   * Creates a generic wrapper constructor based on |object| and its
   * constructor.
   * Sometimes the constructor does not have an associated instance
   * (CharacterData for example). In that case you can pass the constructor that
   * you want to map the object to using |opt_nativeConstructor|.
   * @param {Node} object
   * @param {Function=} opt_nativeConstructor
   * @return {Function} The generated constructor.
   */
  function registerObject(object) {
    var nativePrototype = Object.getPrototypeOf(object);

    var superWrapperConstructor = getWrapperConstructor(nativePrototype);
    var GeneratedWrapper = createWrapperConstructor(superWrapperConstructor);
    registerInternal(nativePrototype, GeneratedWrapper, object);

    return GeneratedWrapper;
  }

  function createWrapperConstructor(superWrapperConstructor) {
    function GeneratedWrapper(node) {
      superWrapperConstructor.call(this, node);
    }
    GeneratedWrapper.prototype =
        Object.create(superWrapperConstructor.prototype);
    GeneratedWrapper.prototype.constructor = GeneratedWrapper;

    return GeneratedWrapper;
  }

  var OriginalDOMImplementation = window.DOMImplementation;
  var OriginalEvent = window.Event;
  var OriginalNode = window.Node;
  var OriginalWindow = window.Window;
  var OriginalRange = window.Range;
  var OriginalCanvasRenderingContext2D = window.CanvasRenderingContext2D;
  var OriginalWebGLRenderingContext = window.WebGLRenderingContext;

  function isWrapper(object) {
    return object instanceof wrappers.EventTarget ||
           object instanceof wrappers.Event ||
           object instanceof wrappers.Range ||
           object instanceof wrappers.DOMImplementation ||
           object instanceof wrappers.CanvasRenderingContext2D ||
           wrappers.WebGLRenderingContext &&
               object instanceof wrappers.WebGLRenderingContext;
  }

  function isNative(object) {
    return object instanceof OriginalNode ||
           object instanceof OriginalEvent ||
           object instanceof OriginalWindow ||
           object instanceof OriginalRange ||
           object instanceof OriginalDOMImplementation ||
           object instanceof OriginalCanvasRenderingContext2D ||
           OriginalWebGLRenderingContext &&
               object instanceof OriginalWebGLRenderingContext;
  }

  /**
   * Wraps a node in a WrapperNode. If there already exists a wrapper for the
   * |node| that wrapper is returned instead.
   * @param {Node} node
   * @return {WrapperNode}
   */
  function wrap(impl) {
    if (impl === null)
      return null;

    assert(isNative(impl));
    return impl.polymerWrapper_ ||
        (impl.polymerWrapper_ = new (getWrapperConstructor(impl))(impl));
  }

  /**
   * Unwraps a wrapper and returns the node it is wrapping.
   * @param {WrapperNode} wrapper
   * @return {Node}
   */
  function unwrap(wrapper) {
    if (wrapper === null)
      return null;
    assert(isWrapper(wrapper));
    return wrapper.impl;
  }

  /**
   * Unwraps object if it is a wrapper.
   * @param {Object} object
   * @return {Object} The native implementation object.
   */
  function unwrapIfNeeded(object) {
    return object && isWrapper(object) ? unwrap(object) : object;
  }

  /**
   * Wraps object if it is not a wrapper.
   * @param {Object} object
   * @return {Object} The wrapper for object.
   */
  function wrapIfNeeded(object) {
    return object && !isWrapper(object) ? wrap(object) : object;
  }

  /**
   * Overrides the current wrapper (if any) for node.
   * @param {Node} node
   * @param {WrapperNode=} wrapper If left out the wrapper will be created as
   *     needed next time someone wraps the node.
   */
  function rewrap(node, wrapper) {
    if (wrapper === null)
      return;
    assert(isNative(node));
    assert(wrapper === undefined || isWrapper(wrapper));
    node.polymerWrapper_ = wrapper;
  }

  function defineGetter(constructor, name, getter) {
    Object.defineProperty(constructor.prototype, name, {
      get: getter,
      configurable: true,
      enumerable: true
    });
  }

  function defineWrapGetter(constructor, name) {
    defineGetter(constructor, name, function() {
      return wrap(this.impl[name]);
    });
  }

  /**
   * Forwards existing methods on the native object to the wrapper methods.
   * This does not wrap any of the arguments or the return value since the
   * wrapper implementation already takes care of that.
   * @param {Array.<Function>} constructors
   * @parem {Array.<string>} names
   */
  function forwardMethodsToWrapper(constructors, names) {
    constructors.forEach(function(constructor) {
      names.forEach(function(name) {
        constructor.prototype[name] = function() {
          var w = wrapIfNeeded(this);
          return w[name].apply(w, arguments);
        };
      });
    });
  }

  scope.assert = assert;
  scope.constructorTable = constructorTable;
  scope.defineGetter = defineGetter;
  scope.defineWrapGetter = defineWrapGetter;
  scope.forwardMethodsToWrapper = forwardMethodsToWrapper;
  scope.isWrapperFor = isWrapperFor;
  scope.mixin = mixin;
  scope.nativePrototypeTable = nativePrototypeTable;
  scope.oneOf = oneOf;
  scope.registerObject = registerObject;
  scope.registerWrapper = register;
  scope.rewrap = rewrap;
  scope.unwrap = unwrap;
  scope.unwrapIfNeeded = unwrapIfNeeded;
  scope.wrap = wrap;
  scope.wrapIfNeeded = wrapIfNeeded;
  scope.wrappers = wrappers;

})(window.ShadowDOMPolyfill);
