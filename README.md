# SimpleHtmlElement

![SimpleHtmlElement Logo](SimpleHtmlElementLogo.png)

A JavaScript library for building, composing, and rendering HTML elements programmatically using a fluent, chainable API — without writing raw HTML strings.

## Overview

`SimpleHtmlElement` represents a single HTML element in a tree structure. Each element tracks its type, attributes, content, children, and events. When an element is drawn into the DOM, subsequent changes are automatically synchronized in real time.

## Installation

### Browser (prebuilt global bundle)

The `dist/` folder contains prebuilt IIFE bundles that expose `SimpleHtmlElement` and `ComponentWrapper` as browser globals. Use `library.min.js` for production:

```html
<script src="dist/library.min.js"></script>
<script>
    const el = new SimpleHtmlElement();
    // ComponentWrapper is also available globally
</script>
```

| File | Description |
|---|---|
| `dist/library.js` | Development build (readable, unminified) |
| `dist/library.min.js` | Production build (minified) |

To rebuild the bundles (requires Node.js ≥ 16):

```bash
npm install
npm run build
```

### ES Modules (source)

Import directly from the source package:

```js
import SimpleHtmlElement from './SimpleHtmlElementPackage/SimpleHtmlElement.js';
```

## Core Classes

| Class | Description |
|---|---|
| `SimpleHtmlElement` | Main element class. Create, configure, and render HTML elements. |
| `ComponentWrapper` | Base class for reusable UI components. Extend and override `prebuild()`/`postBuild()`. |
| `HtmlElementFactory` | Build element trees from plain JS/JSON object definitions. |
| `HtmlElementObservableVariable` | Observable value that notifies subscriber elements when it changes. |
| `HtmlToJson` (`HtmlElementJson`) | Convert existing DOM elements to a JSON representation. |
| `HtmlElementObjectBuilder` | Generate JavaScript source code from an element object definition. |

---

## SimpleHtmlElement

### Creating and rendering an element

```js
const el = new SimpleHtmlElement();
el.setType('button')
  .addClass('btn btn-primary')
  .setAttribute('id', 'my-btn')
  .setContent('Click me');

// Render to a DOM container
el.elementDrawer.attach('#app');       // replace container innerHTML
el.elementDrawer.append('#app');       // append inside container
el.elementDrawer.prependTo('#app');    // prepend inside container
```

Each element gets a unique `data-ei` attribute used as its identity in the DOM.

### Building element trees

```js
const card = new SimpleHtmlElement();
card.setType('div').addClass('card');

const title = card.addChild()
    .setType('h2')
    .setContent('Hello World');

const body = card.addChild()
    .setType('p')
    .setContent('Some text here.');
```

`addChild()` creates and registers a new child `SimpleHtmlElement` and returns it for further configuration.

### Events

```js
el.addEvent('click', () => console.log('clicked'));
el.removeEvent('click');
el.triggerEvent('click');
```

### Visibility (Bootstrap)

```js
el.hide();   // adds class 'd-none'
el.show();   // removes class 'd-none'
```

### Inline styles

```js
el.addStyle('color', 'red');
el.removeStyle('color');
```

Styles are applied via a managed `style` attribute.

### Scoped CSS

```js
el.insertStyles({
    '.child-selector': { color: 'blue', 'font-size': '14px' }
});
```

CSS is scoped to the element using its `[data-ei]` identifier.

### Live DOM sync

Once an element is drawn in the DOM (`elementDrawn === true`), changes to classes, attributes, content, and children are automatically reflected in the DOM without a full redraw. For larger structural changes, call `redraw()`:

```js
el.redraw();
```

### Searching the element tree

```js
el.get('some-identifier');       // by data-ei identifier
el.find('span');                 // by tag name
el.findByClass('my-class');     // by class name
```

### Loading state

```js
el.setIsLoading();    // sets data-loading attribute and inserts a loader child
el.unsetIsLoading();  // removes loader
```

### Dynamic script loading

```js
el.enableDynamicScriptLoader();
el.dynamicScriptLoader.loadScript('/path/to/script.js', () => {});
el.dynamicScriptLoader.canExecute().then(() => el.dynamicScriptLoader.execute());
```

Inside the loaded script, `currentElement` refers to the `SimpleHtmlElement` instance.

---

## Template Variables

Content and attributes support `{{variableName}}` template syntax.

### With global variables (polling)

```js
window.myVar = 'Hello';

el.setContent('{{myVar}}');  // content updates every 300ms when window.myVar changes
```

### With `HtmlElementObservableVariable` (reactive)

```js
import HtmlElementObservableVariable from './SimpleHtmlElementPackage/HtmlElementObservableVariable.js';

window.myVar = new HtmlElementObservableVariable();

el.setContent('{{myVar}}');  // element subscribes and updates instantly on value change

window.myVar.value = 'World';  // triggers update
```

Observable variables can also fire a DOM `CustomEvent` instead of direct notification:

```js
window.myVar.useEvent = true;
window.myVar.setEventName('myStateChange');
```

---

## ComponentWrapper

Extend `ComponentWrapper` to create reusable components. Override `prebuild()` to define the element structure. The base class provides `build()`, `html()`, `get()`, and `find()`.

```js
import ComponentWrapper from './SimpleHtmlElementPackage/ComponentWrapper.js';

class MyCard extends ComponentWrapper {
    prebuild() {
        this.element.setType('div').addClass('card');

        this.element.addChild()
            .setType('h2')
            .setContent(this.title);
    }

    setTitle(title) {
        this.title = title;
        return this;
    }
}

const card = new MyCard();
card.setTitle('My Title');
card.build().attach("#app");
```

Components can be nested — use `setParentComponent()` to track ownership.

---

## HtmlElementFactory

Build an element tree from a plain object (e.g. from JSON):

```js
import HtmlElementFactory from './SimpleHtmlElementPackage/HtmlElementFactory.js';

const definition = {
    type: 'div',
    attributes: { class: 'card' },
    children: [
        { type: 'h2', content: '{title}' },
        { type: 'p',  content: '{description}' }
    ]
};

const data = { title: 'Hello', description: 'World' };

const element = new HtmlElementFactory(definition, data).build();
document.querySelector('#app').innerHTML = element.html();
```

Data replacement uses `{key}` placeholders (single braces) inside the object definition. Nested keys are supported using dot notation (`{user.name}`).

---

## HtmlToJson

Convert an existing DOM element (or HTML string) to the library's JSON format:

```js
import HtmlToJson from './SimpleHtmlElementPackage/HtmlElementJson.js';

const converter = new HtmlToJson('#my-element');
console.log(converter.getJson());

// Or from an HTML string:
const converter2 = new HtmlToJson();
converter2.setFromHtml('<div class="card"><h2>Title</h2></div>');
console.log(converter2.getJson());
```

---

## HtmlElementObjectBuilder

Generate JavaScript source code from an element object definition:

```js
import HtmlElementObjectBuilder from './SimpleHtmlElementPackage/HtmlElementObjectBuilder.js';

const definition = {
    type: 'div',
    attributes: { class: 'card' },
    content: 'Hello'
};

const code = new HtmlElementObjectBuilder(definition, 'myElement').build();
console.log(code);
// const myElement = new SimpleHtmlElement();
// myElement.setType('div');
// myElement.setAttribute('class', 'card');
// myElement.setContent('Hello');
```

---

## Module Structure

```
SimpleHtmlElementPackage/
├── SimpleHtmlElement.js          # Main element class (entry point)
├── HtmlElement.js                # Core element data (type, attributes, content, children)
├── HtmlElementSearch.js          # Tree search (by id, type, class)
├── HtmlElementDomManipulator.js  # Real-time DOM synchronization
├── HtmlElementDrawer.js          # Attach/append/prepend to DOM containers
├── HtmlElementEventHandler.js    # DOM event registration
├── HtmlElementVariableReplacer.js# {{variable}} template parsing
├── HtmlElementChangeDetector.js  # Poll/observe global variables for changes
├── HtmlElementObservableVariable.js # Observable value with observer pattern
├── HtmlElementCss.js             # Scoped CSS injection
├── HtmlElementStyle.js           # Inline style management
├── HtmlElementDynamicScriptLoader.js # Load and execute remote scripts
├── HtmlLoaderHandler.js          # Loading state (spinner)
├── HtmlElementEmptyTags.js       # Self-closing tag list
├── HtmlElementFactory.js         # Build elements from object/JSON definitions
├── HtmlElementJson.js            # Convert DOM elements to JSON
├── HtmlElementObjectBuilder.js   # Generate JS code from object definitions
└── ComponentWrapper.js           # Base class for reusable components
```
