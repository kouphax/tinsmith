/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function(scope) {
  var CLONE_PROPS = [
    // MouseEvent
    'bubbles',
    'cancelable',
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget',
    // DOM Level 3
    'buttons',
    // PointerEvent
    'pointerId',
    'width',
    'height',
    'pressure',
    'tiltX',
    'tiltY',
    'pointerType',
    'hwTimestamp',
    'isPrimary',
    // event instance
    'type',
    'target',
    'currentTarget',
    'which'
  ];

  var CLONE_DEFAULTS = [
    // MouseEvent
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
    // DOM Level 3
    undefined,
    // PointerEvent
    0,
    0,
    0,
    0,
    0,
    0,
    '',
    0,
    false,
    // event instance
    '',
    null,
    null,
    0
  ];

  /**
   * This module is for normalizing events. Mouse and Touch events will be
   * collected here, and fire PointerEvents that have the same semantics, no
   * matter the source.
   * Events fired:
   *   - pointerdown: a pointing is added
   *   - pointerup: a pointer is removed
   *   - pointermove: a pointer is moved
   *   - pointerover: a pointer crosses into an element
   *   - pointerout: a pointer leaves an element
   *   - pointercancel: a pointer will no longer generate events
   */
  var dispatcher = {
    targets: new WeakMap(),
    handledEvents: new WeakMap(),
    pointermap: new scope.PointerMap(),
    eventMap: {},
    // Scope objects for native events.
    // This exists for ease of testing.
    eventSources: {},
    eventSourceList: [],
    /**
     * Add a new event source that will generate pointer events.
     *
     * `inSource` must contain an array of event names named `events`, and
     * functions with the names specified in the `events` array.
     * @param {string} name A name for the event source
     * @param {Object} source A new source of platform events.
     */
    registerSource: function(name, source) {
      var s = source;
      var newEvents = s.events;
      if (newEvents) {
        newEvents.forEach(function(e) {
          if (s[e]) {
            this.eventMap[e] = s[e].bind(s);
          }
        }, this);
        this.eventSources[name] = s;
        this.eventSourceList.push(s);
      }
    },
    register: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {
        // call eventsource register
        es.register.call(es, element);
      }
    },
    unregister: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; (i < l) && (es = this.eventSourceList[i]); i++) {
        // call eventsource register
        es.unregister.call(es, element);
      }
    },
    contains: scope.external.contains || function(container, contained) {
      return container.contains(contained);
    },
    // EVENTS
    down: function(inEvent) {
      this.fireEvent('pointerdown', inEvent);
    },
    move: function(inEvent) {
      this.fireEvent('pointermove', inEvent);
    },
    up: function(inEvent) {
      this.fireEvent('pointerup', inEvent);
    },
    enter: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerenter', inEvent);
    },
    leave: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent('pointerleave', inEvent);
    },
    over: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerover', inEvent);
    },
    out: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent('pointerout', inEvent);
    },
    cancel: function(inEvent) {
      this.fireEvent('pointercancel', inEvent);
    },
    leaveOut: function(event) {
      if (!this.contains(event.target, event.relatedTarget)) {
        this.leave(event);
      }
      this.out(event);
    },
    enterOver: function(event) {
      if (!this.contains(event.target, event.relatedTarget)) {
        this.enter(event);
      }
      this.over(event);
    },
    // LISTENER LOGIC
    eventHandler: function(inEvent) {
      // This is used to prevent multiple dispatch of pointerevents from
      // platform events. This can happen when two elements in different scopes
      // are set up to create pointer events, which is relevant to Shadow DOM.
      if (this.handledEvents.get(inEvent)) {
        return;
      }
      var type = inEvent.type;
      var fn = this.eventMap && this.eventMap[type];
      if (fn) {
        fn(inEvent);
      }
      this.handledEvents.set(inEvent, true);
    },
    // set up event listeners
    listen: function(target, events) {
      events.forEach(function(e) {
        this.addEvent(target, e);
      }, this);
    },
    // remove event listeners
    unlisten: function(target, events) {
      events.forEach(function(e) {
        this.removeEvent(target, e);
      }, this);
    },
    addEvent: scope.external.addEvent || function(target, eventName) {
      target.addEventListener(eventName, this.boundHandler);
    },
    removeEvent: scope.external.removeEvent || function(target, eventName) {
      target.removeEventListener(eventName, this.boundHandler);
    },
    // EVENT CREATION AND TRACKING
    /**
     * Creates a new Event of type `inType`, based on the information in
     * `inEvent`.
     *
     * @param {string} inType A string representing the type of event to create
     * @param {Event} inEvent A platform event with a target
     * @return {Event} A PointerEvent of type `inType`
     */
    makeEvent: function(inType, inEvent) {
      // relatedTarget must be null if pointer is captured
      if (this.captureInfo) {
        inEvent.relatedTarget = null;
      }
      var e = new PointerEvent(inType, inEvent);
      if (inEvent.preventDefault) {
        e.preventDefault = inEvent.preventDefault;
      }
      this.targets.set(e, this.targets.get(inEvent) || inEvent.target);
      return e;
    },
    // make and dispatch an event in one call
    fireEvent: function(inType, inEvent) {
      var e = this.makeEvent(inType, inEvent);
      return this.dispatchEvent(e);
    },
    /**
     * Returns a snapshot of inEvent, with writable properties.
     *
     * @param {Event} inEvent An event that contains properties to copy.
     * @return {Object} An object containing shallow copies of `inEvent`'s
     *    properties.
     */
    cloneEvent: function(inEvent) {
      var eventCopy = {}, p;
      for (var i = 0; i < CLONE_PROPS.length; i++) {
        p = CLONE_PROPS[i];
        eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];
      }
      // keep the semantics of preventDefault
      if (inEvent.preventDefault) {
        eventCopy.preventDefault = function() {
          inEvent.preventDefault();
        };
      }
      return eventCopy;
    },
    getTarget: function(inEvent) {
      // if pointer capture is set, route all events for the specified pointerId
      // to the capture target
      if (this.captureInfo) {
        if (this.captureInfo.id === inEvent.pointerId) {
          return this.captureInfo.target;
        }
      }
      return this.targets.get(inEvent);
    },
    setCapture: function(inPointerId, inTarget) {
      if (this.captureInfo) {
        this.releaseCapture(this.captureInfo.id);
      }
      this.captureInfo = {id: inPointerId, target: inTarget};
      var e = new PointerEvent('gotpointercapture', { bubbles: true });
      this.implicitRelease = this.releaseCapture.bind(this, inPointerId);
      document.addEventListener('pointerup', this.implicitRelease);
      document.addEventListener('pointercancel', this.implicitRelease);
      this.targets.set(e, inTarget);
      this.asyncDispatchEvent(e);
    },
    releaseCapture: function(inPointerId) {
      if (this.captureInfo && this.captureInfo.id === inPointerId) {
        var e = new PointerEvent('lostpointercapture', { bubbles: true });
        var t = this.captureInfo.target;
        this.captureInfo = null;
        document.removeEventListener('pointerup', this.implicitRelease);
        document.removeEventListener('pointercancel', this.implicitRelease);
        this.targets.set(e, t);
        this.asyncDispatchEvent(e);
      }
    },
    /**
     * Dispatches the event to its target.
     *
     * @param {Event} inEvent The event to be dispatched.
     * @return {Boolean} True if an event handler returns true, false otherwise.
     */
    dispatchEvent: scope.external.dispatchEvent || function(inEvent) {
      var t = this.getTarget(inEvent);
      if (t) {
        return t.dispatchEvent(inEvent);
      }
    },
    asyncDispatchEvent: function(inEvent) {
      setTimeout(this.dispatchEvent.bind(this, inEvent), 0);
    }
  };
  dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);
  scope.dispatcher = dispatcher;
  scope.register = dispatcher.register.bind(dispatcher);
  scope.unregister = dispatcher.unregister.bind(dispatcher);
})(window.PointerEventsPolyfill);
