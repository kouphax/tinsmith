## Learn the tech

### Why Custom Elements?

Custom Elements let authors define their own elements. Authors associate JavaScript code with custom tag names, and then use those custom tag names as they would any standard tag.

For example, after registering a special kind of button called `super-button`, use the super button just like this:

    <super-button></super-button>

Custom elements are still elements. We can create, use, manipulate, and compose them just as easily as any standard `<div>` or `<span>` today.

### Basic usage

As with any element, custom elements can be created in JavaScript or declared.
**Custom element names must always contain a dash (-).**

#### Element registration

Before you can use a custom element, it needs to be registered. Otherwise, the browser considers it an <code>HTMLElement</code>.

##### document.register()

To register a new custom element in JavaScript, invoke `document.register()` somewhere in the page.
As before, custom elements built this way work just like standard elements.

Here's the imperative version of the previous example:

    var XFooPrototype = Object.create(HTMLElement.prototype);
    XFooPrototype.createdCallback = function() {
      this.textContent = "I'm an x-foo!";
    };
    XFooPrototype.foo = function() {
      console.log('foo() called');
    };

    var XFoo = document.register('x-foo', {
      prototype: XFooPrototype
    });

**Note:** the prototype must be chained to `HTMLElement.prototype` (i.e. `instanceof HTMLElement.prototype`).

**Extending existing elements**

If you want to inherit from a specialized form of `HTMLElement` (e.g. `HTMLButtonElement`),
declare the type using the `extends` option when calling `document.register()`:
  
Example extending `button`:
  
    var XFooButtonPrototype = Object.create(HTMLButtonElement.prototype);
    XFooButtonPrototype.createdCallback = function() {
      this.textContent = "I'm an x-foo button!";
    };

    var XFooButton = document.register('x-foo-button', {
      prototype: XFooButtonPrototype,
      extends: 'button'
    });

#### Using a custom element

After registration, you can construct an instance of your element just like
standard DOM elements:

    <x-foo></x-foo>

If you've used `extends` to create a custom element that derives from an existing DOM element
(e.g. something other than `HTMLElement`), use the `is` syntax:

    <button is="x-foo-button"></button>

In the declarative and `document.register()` example above, `XFoo` was defined as the new element's constructor.
This can also be used to create an instance:

    var xFoo = new XFoo();
    document.body.appendChild(xFoo);

    var xFooButton = document.createElement('button', 'x-foo-button');
    xFooButton.foo(); // "foo() called"

Browser limitations require that we supply the constructor while you supply the `prototype`.
Use the `createdCallback` to do initialization work that might otherwise be in a constructor.

## Polyfill details

### Getting Started

Include the `custom-elements.js` or `custom-elements.min.js` (minified) file in your project.

    <script src="CustomElements/custom-elements.js"></script>

`custom-elements.js` is the debug loader and uses `document.write` to load additional modules. 
Use the minified version (`custom-elements.min.js`) if you need to load the file dynamically.

### Polyfill Notes

The polyfill handles element upgrades _asynchronously_. To know when it has
finished all of its start up tasks, listen to the `WebComponentsReady` event on `document` or `window`.

Example:

    <script>
      // hide body to prevent FOUC
      document.body.style.opacity = 0;
      window.addEventListener('WebComponentsReady', function() {
        // show body now that everything is ready
        document.body.style.opacity = 1;
      });
    </script>

The Custom Elements specification is still under discussion. The polyfill implements certain features in advance of the specification. In particular, the lifecycle callback methods that get called if implemented on the element prototype:

* `createdCallback()` is called when a custom element is created.
* `enteredViewCallback()` is called when a custom element is inserted into a DOM subtree.
* `leftViewCallback()` is called when a custom element is removed from a DOM subtree.
* `attributeChangedCallback(attributeName)` is called when a custom element's attribute value has changed

`createdCallback` is invoked _synchronously_ with element instantiation, the other callbacks are called _asyncronously_. The asynchronous callbacks generally use the MutationObserver timing model, which means they are called before layouts, paints, or other triggered events, so the developer need not worry about flashing content or other bad things happening before the callback has a chance to react to changes.

The `extends` option to `document.register()` (discussed above)  is exclusive to this polyfill.

## Tools & Testing

For running tests or building minified files, consult the [tooling information](http://polymer-project.org/tooling-strategy.html).
