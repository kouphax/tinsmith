/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
(function() {
  
  // poor man's adapter for template.content on various platform scenarios
  window.templateContent = window.templateContent || function(inTemplate) {
    return inTemplate.content;
  };

  // so we can call wrap/unwrap without testing for ShadowDOMPolyfill

  window.wrap = window.unwrap = function(n){
    return n;
  }
  
  var originalCreateShadowRoot = HTMLElement.prototype.webkitCreateShadowRoot;
  HTMLElement.prototype.webkitCreateShadowRoot = function() {
    var elderRoot = this.webkitShadowRoot;
    var root = originalCreateShadowRoot.call(this);
    root.olderShadowRoot = elderRoot;
    root.host = this;
    CustomElements.watchShadow(this);
    return root;
  }

  Object.defineProperties(HTMLElement.prototype, {
    shadowRoot: {
      get: function() {
        return this.webkitShadowRoot;
      }
    },
    createShadowRoot: {
      value: function() {
        return this.webkitCreateShadowRoot();
      }
    }
  });

  window.templateContent = function(inTemplate) {
    // if MDV exists, it may need to boostrap this template to reveal content
    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
      HTMLTemplateElement.bootstrap(inTemplate);
    }
    // fallback when there is no Shadow DOM polyfill, no MDV polyfill, and no
    // native template support
    if (!inTemplate.content && !inTemplate._content) {
      var frag = document.createDocumentFragment();
      while (inTemplate.firstChild) {
        frag.appendChild(inTemplate.firstChild);
      }
      inTemplate._content = frag;
    }
    return inTemplate.content || inTemplate._content;
  };

})();