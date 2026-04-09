# SimpleHtmlElement

![SimpleHtmlElement Logo](https://raw.githubusercontent.com/tihletmcaris/SimpleHtmlElement/main/SimpleHtmlElementLogo.png)

A JavaScript library for building, composing, and rendering HTML elements programmatically using a fluent, chainable API — no raw HTML strings, no framework required.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [SimpleHtmlElement API](#simplehtmlelement-api)
- [ComponentWrapper](#componentwrapper)
- [HtmlElementObservableVariable](#htmlelementobservablevariable)
- [Template Variables](#template-variables)
- [HtmlElementFactory](#htmlelementfactory)
- [HtmlToJson](#htmltojson)
- [HtmlElementObjectBuilder](#htmlelementobjectbuilder)
- [Performance: Bulk Updates](#performance-bulk-updates)
- [Module Structure](#module-structure)
- [TypeScript](#typescript)

---

## Installation

### npm

```bash
npm install @mcaris/simple-html-element
```

### CDN (browser global)

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@mcaris/simple-html-element/dist/library.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/@mcaris/simple-html-element/dist/library.min.js"></script>
```

The bundle exposes these globals: `SimpleHtmlElement`, `ComponentWrapper`, `HtmlElementObservableVariable`, `HtmlElementFactory`, `HtmlToJson`, `HtmlElementObjectBuilder`.

### Local dist folder

```html
<script src="dist/library.min.js"></script>
```

| File | Description |
|---|---|
| `dist/library.js` | Development build (readable) |
| `dist/library.min.js` | Production build (minified) |

To rebuild:

```bash
npm install
npm run build
```

### ES Modules

```js
import SimpleHtmlElement from './SimpleHtmlElementPackage/SimpleHtmlElement.js';
import ComponentWrapper  from './SimpleHtmlElementPackage/ComponentWrapper.js';
```

---

## Quick Start

```html
<div id="app"></div>
<script src="dist/library.min.js"></script>
<script>
    const card = new SimpleHtmlElement()
        .setType('div')
        .addClass('card');

    card.addChild()
        .setType('h2')
        .setContent('Hello World');

    card.addChild()
        .setType('p')
        .setContent('Built without writing a single HTML string.');

    card.attach('#app');
</script>
```

---

## Core Concepts

### Element identity

Every `SimpleHtmlElement` gets a unique `data-ei` attribute on creation. This identifier is used internally to find and update the element in the DOM without relying on `id` or `querySelector`.

### Two-phase lifecycle

1. **Pre-draw** — build the element tree using the fluent API. No DOM interaction yet.
2. **Drawn** — after `attach()`, `append()`, or `prependTo()`, the element is in the DOM (`elementDrawn === true`). From this point, changes to content, classes, attributes, and styles are synced to the DOM automatically.

### createElement() vs addChild()

- **`element.createElement()`** — creates a detached `SimpleHtmlElement` not yet attached to any parent. It is only placed in the DOM when passed to `setChildren()` or `addElement()`. Use this when building child arrays before committing them.
- **`element.addChild()`** — creates a child and immediately registers it. If the parent is already drawn, **this triggers a DOM redraw**. Avoid calling it in a loop on a drawn element — use `setChildren()` instead.

---

## SimpleHtmlElement API

### Drawing into the DOM

```js
el.attach('#app');     // replaces innerHTML of #app
el.append('#app');     // appends inside #app
el.prependTo('#app');  // prepends inside #app
```

`attach()` / `append()` / `prependTo()` also accept a live `HTMLElement` reference.

### Element type

```js
el.setType('section');
el.getType(); // 'section'
```

### CSS classes

```js
el.addClass('active');
el.removeClass('active');
el.toggleClass('active');
el.hasClass('active');  // → boolean
el.setClass('btn btn-primary');  // replaces all classes
el.getClass();          // → string | null
```

Class changes on drawn elements are applied directly to the DOM node without a full redraw.

### Attributes

```js
el.setAttribute('href', '/home');
el.getAttribute('href');        // → '/home'
el.removeAttribute('href');
el.toggleAttribute('disabled');
el.hasAttribute('disabled');    // → boolean
el.setAttributes({ id: 'nav', role: 'navigation' });
```

### Content

```js
el.setContent('Hello <strong>World</strong>');  // sets inner HTML / text
el.setText('Plain text');                        // alias for setContent
el.getContent();
el.addContent(' — appended');
```

Content supports `{{variableName}}` template syntax — see [Template Variables](#template-variables).

### Inline styles

```js
el.addStyle('background', '#1e293b');
el.addStyle('border-radius', '0.5rem');
el.removeStyle('background');
el.clearStyles();
```

Styles are applied via the element's `style` attribute.

### Scoped CSS

For scoped stylesheet injection (useful for complex selectors like `:hover`, `::before`):

```js
el.setCss({
    'span': { color: '#6366f1', 'font-weight': '600' }
});
el.addCss({ 'a:hover': { 'text-decoration': 'underline' } });
el.setCssString('[data-ei] span { color: red; }');
```

CSS is injected into `<head>` scoped to the element's `[data-ei]` identifier.

### Visibility (Bootstrap compatible)

```js
el.hide();  // addClass('d-none')
el.show();  // removeClass('d-none')
```

### Events

```js
el.addEvent('click', (e) => console.log('clicked', e));
el.removeEvent('click');
el.triggerEvent('click');
```

Events added to drawn elements are attached to the DOM node immediately.

### Building children

```js
// Create and register a child directly
const child = el.addChild().setType('span').setContent('hello');

// Create a detached element (no parent yet, no redraw)
const detached = el.createElement().setType('li').setContent('item');

// Attach multiple children at once — triggers exactly ONE redraw
el.setChildren([child1, child2, child3]);

// Add a single pre-built element
el.addElement(someSimpleHtmlElement);
el.addElementAtIndex(someSimpleHtmlElement, 2);
```

### Searching the tree

```js
el.get('my-identifier');     // find by data-ei identifier
el.find('span');             // find first descendant by tag name
el.findByClass('card');      // find first descendant by class name
```

### Redraw and DOM access

```js
el.redraw();             // force a full redraw of this element in the DOM

// getDomElement() returns a Promise — the element may not be in the DOM yet
el.getDomElement().then(domEl => {
    domEl.style.opacity = '0.5';
});
```

### Loading state

```js
el.setIsLoading();    // inserts a loader child
el.unsetIsLoading();  // removes loader
```

### Dynamic script loading

```js
el.loadScript('/path/to/script.js');
el.executeScript();
```

Inside the loaded script, `currentElement` refers to the `SimpleHtmlElement` instance.

---

## ComponentWrapper

Extend `ComponentWrapper` to create reusable, self-contained UI components.

```js
class AlertBox extends ComponentWrapper {
    constructor(message, type = 'info') {
        super();
        this._message = message;
        this._type    = type;
    }

    prebuild() {
        this.element
            .setType('div')
            .addClass('alert')
            .addClass(`alert-${this._type}`);

        const icon = this.element.createElement().setType('span').setContent('ℹ️');
        const msg  = this.element.createElement().setType('p').setContent(this._message);
        this.element.setChildren([icon, msg]);
    }
}

// Usage
const alert = new AlertBox('Something went wrong!', 'error').build();
alert.attach('#app');
```

### Key rules

- Override `prebuild()` — define the structure here, not in the constructor.
- Use `this.element` — the root `SimpleHtmlElement` for this component.
- Call `.build()` — this runs `prebuild()` and returns `this.element`.
- Use `this.element.createElement()` inside `prebuild()` to create detached children, then batch them with `setChildren([...])` for a single DOM operation.
- Nest components by calling `.build()` on a child component and passing the result to `addElement()` or `setChildren()`.

```js
class Page extends ComponentWrapper {
    prebuild() {
        this.element.setType('main');

        const header = this.element.createElement().setType('header').setContent('My App');
        const alert  = this.element.createElement(); // placeholder
        // nest another component
        const alertEl = new AlertBox('Welcome!').build();

        this.element.setChildren([header, alertEl]);
    }
}
```

---

## HtmlElementObservableVariable

A reactive value that notifies bound `SimpleHtmlElement` instances when it changes. The subscriber element updates its content or attribute instantly — no polling, no full redraw.

```js
const count = new HtmlElementObservableVariable();
count.value = '0';

const badge = new SimpleHtmlElement()
    .setType('span')
    .addClass('badge');

// Bind: when count.value changes, badge content updates automatically
count.addObserver(badge, 'setContent');

// Bind to an attribute instead
count.addObserver(badge, 'setAttribute', 'data-count');

// Update the value — badge DOM updates immediately
count.value = '5';

// Force notification even if value hasn't changed
count.triggerFirstChange();
```

### Event mode

```js
count.useEvent = true;
count.setEventName('countChanged');

document.addEventListener('countChanged', (e) => {
    console.log('new value:', e.detail?.value);
});
```

---

## Template Variables

Content and attributes support `{{variableName}}` syntax. The element watches the named global variable and updates automatically.

### Global variable polling (simple)

```js
window.username = 'Alice';

const greeting = new SimpleHtmlElement()
    .setType('p')
    .setContent('Hello, {{username}}!');

// Updates every 300ms when window.username changes
greeting.attach('#app');
```

### Reactive with HtmlElementObservableVariable (recommended)

```js
window.username = new HtmlElementObservableVariable();
window.username.value = 'Alice';

const greeting = new SimpleHtmlElement()
    .setType('p')
    .setContent('Hello, {{username}}!');

greeting.attach('#app');

window.username.value = 'Bob';  // DOM updates instantly
```

Both content and attributes support the syntax:

```js
el.setAttribute('placeholder', '{{searchQuery}}');
```

---

## HtmlElementFactory

Build element trees from a plain JS object (e.g. from a server-side JSON response).

```js
const schema = {
    type: 'div',
    attributes: { class: 'card' },
    children: [
        { type: 'h3', content: '{title}' },
        { type: 'p',  content: '{description}' },
        {
            type: 'a',
            attributes: { href: '{url}' },
            content: 'Read more'
        }
    ]
};

const data = {
    title:       'Getting Started',
    description: 'Learn how to use SimpleHtmlElement.',
    url:         '/docs'
};

const el = new HtmlElementFactory(schema, data).build();
el.attach('#app');
```

Data replacement uses `{key}` placeholders (single braces) inside string values. Nested objects use dot notation: `{user.name}`.

Supported schema keys: `type`, `attributes`, `content`, `children`, `identifier`, `events`, `createOnEmpty`.

---

## HtmlToJson

Convert an existing DOM element or HTML string to the library's JSON schema:

```js
const json = new HtmlToJson('#my-element').getJson();
// → { type: 'div', attributes: { class: 'card' }, children: [...] }

// From an HTML string
const json2 = new HtmlToJson().setFromHtml('<ul><li>One</li><li>Two</li></ul>').getJson();
```

Useful for round-tripping: convert existing HTML → JSON → feed into `HtmlElementFactory`.

---

## HtmlElementObjectBuilder

Generate JavaScript source code from a schema object:

```js
const code = new HtmlElementObjectBuilder({
    type: 'button',
    attributes: { class: 'btn' },
    content: 'Submit'
}, 'submitBtn').build();

console.log(code);
// const submitBtn = new SimpleHtmlElement();
// submitBtn.setType('button');
// submitBtn.setAttribute('class', 'btn');
// submitBtn.setContent('Submit');
```

---

## Performance: Bulk Updates

> **Important:** when a parent element is already drawn in the DOM, every `addChild()` and `addElement()` call immediately triggers a DOM redraw. Calling either in a loop causes multiple overlapping redraws — this manifests as flickering or focus loss, and is most visible in Chrome and Edge.

### Pattern: use setChildren() for bulk updates

```js
// ❌ Triggers N redraws — causes flickering in Chrome/Edge
items.forEach(item => {
    container.addChild().setType('li').setContent(item);
});

// ✅ Builds everything first, then triggers exactly ONE redraw
const children = items.map(item =>
    container.createElement().setType('li').setContent(item)
);
container.setChildren(children);
```

### Pattern: use createElement() to build before attaching

`createElement()` returns a new detached `SimpleHtmlElement`. It carries no parent and triggers no redraws until placed via `setChildren()` or `addElement()`. This is the preferred way to build subtrees inside `prebuild()`:

```js
prebuild() {
    const header  = this.element.createElement().setType('header').setContent('Title');
    const content = this.element.createElement().setType('div').addClass('body');
    const footer  = this.element.createElement().setType('footer').setContent('Footer');

    // Single DOM operation
    this.element.setChildren([header, content, footer]);
}
```

---

## Module Structure

```
SimpleHtmlElementPackage/
├── SimpleHtmlElement.js           Main element class
├── ComponentWrapper.js            Base class for reusable components
├── HtmlElement.js                 Core data: type, attributes, content, children
├── HtmlElementSearch.js           Tree search by identifier, tag, or class
├── HtmlElementDomManipulator.js   Real-time DOM synchronisation
├── HtmlElementDrawer.js           attach / append / prependTo
├── HtmlElementEventHandler.js     DOM event registration and delegation
├── HtmlElementVariableReplacer.js {{variable}} template parsing
├── HtmlElementChangeDetector.js   Poll/observe global variables for changes
├── HtmlElementObservableVariable.js  Observable value with push notifications
├── HtmlElementCss.js              Scoped <style> injection per element
├── HtmlElementStyle.js            Inline style attribute management
├── HtmlElementDynamicScriptLoader.js  Load and execute remote scripts
├── HtmlLoaderHandler.js           Loading spinner state
├── HtmlElementEmptyTags.js        Self-closing tag registry
├── HtmlElementFactory.js          Build element trees from JS/JSON objects
├── HtmlElementJson.js             Convert DOM/HTML to JSON schema
└── HtmlElementObjectBuilder.js    Generate JS source from schema objects

dist/
├── library.js                     Prebuilt IIFE bundle (development)
└── library.min.js                 Prebuilt IIFE bundle (production)
```

---

## TypeScript

TypeScript definitions are included for all public classes:

```ts
import type { SimpleHtmlElement } from '@mcaris/simple-html-element';
```

`index.d.ts` at the package root re-exports all types.

---

## Examples

```
examples/
├── basic.html       Getting started — elements, children, events
├── dashboard.html   Task dashboard — ComponentWrapper, ObservableVariable, live clock
├── data-table.html  Sortable/filterable data table — HtmlElementFactory, setChildren
└── shop2.html       Product catalog — CSS classes only, ComponentWrapper, cart counter
```

