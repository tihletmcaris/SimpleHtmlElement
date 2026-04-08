var SimpleHtmlLibrary = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // index.js
  var library_exports = {};
  __export(library_exports, {
    ComponentWrapper: () => ComponentWrapper_default,
    HtmlElementFactory: () => HtmlElementFactory_default,
    HtmlElementObjectBuilder: () => HtmlElementObjectBuilder_default,
    HtmlElementObservableVariable: () => HtmlElementObservableVariable_default,
    HtmlToJson: () => HtmlElementJson_default,
    SimpleHtmlElement: () => SimpleHtmlElement_default
  });

  // SimpleHtmlElementPackage/HtmlElementEmptyTags.js
  var HtmlElementEmptyTags = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this.emptyTags = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ];
    }
    check(tag) {
      return this.emptyTags.includes(tag);
    }
  };
  var HtmlElementEmptyTags_default = HtmlElementEmptyTags;

  // SimpleHtmlElementPackage/HtmlElement.js
  var HtmlElement = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this.type = "div";
      this.selfClosing = false;
      this.attributes = {};
      this.content = "";
      this.temporaryContent = "";
      this.beforeContent = false;
      this.identifier = this.generateUniqueId();
    }
    setType(type) {
      this.type = type;
      return this;
    }
    /**
     * Generate unique identifier for element attribute [data-ei]
     * @returns {string}
     */
    generateUniqueId() {
      return this.baseClass.constructor.name + "-" + Math.random().toString(36).slice(2, 9);
    }
    /**
     * Return element identifier
     * @returns {string}
     */
    getIdentifier() {
      return this.identifier;
    }
    /**
     * Set element identifier
     * @param identifier
     * @returns {HtmlElement}
     */
    setIdentifier(identifier) {
      this.identifier = identifier;
      return this;
    }
    /**
     * Toggle html attribute
     * @param attribute {string}
     * @param value {*}
     * @returns {HtmlElement}
     */
    toggleAttribute(attribute, value) {
      if (this.attributes[attribute] && this.attributes[attribute] === value) {
        this.removeAttribute(attribute);
      } else {
        this.setAttribute(attribute, value);
      }
      return this;
    }
    /**
     * Check if element has attribute
     * @param attribute
     * @returns {boolean}
     */
    hasAttribute(attribute) {
      return this.attributes[attribute] !== void 0;
    }
    /**
     * Set element attributes
     * @param attributes
     */
    setAttributes(attributes) {
      const keys = Object.keys(attributes);
      keys.forEach((key) => {
        this.setAttribute(key, attributes[key]);
      });
    }
    /**
     * Add new complete element to children array
     * @param element {SimpleHtmlElement}
     * @param beforeContent {boolean}
     * @returns {*}
     */
    addElement(element, beforeContent = false) {
      element.beforeContent = beforeContent;
      this.createElement(element, beforeContent);
      if (this.baseClass.elementDrawn === true) {
        const canNotInsertBlockElement = ["p", "span", "a", "h1", "h2", "h3", "h4", "h5", "h6"];
        if (canNotInsertBlockElement.includes(this.type)) {
          element.setType("span");
        }
        this.somethingChanged();
      }
      return element;
    }
    addElementAtIndex(element, index, beforeContent = false) {
      element.beforeContent = beforeContent;
      this.createElement(element, false, index);
      if (this.baseClass.elementDrawn === true) {
        const canNotInsertBlockElement = ["p", "span", "a", "h1", "h2", "h3", "h4", "h5", "h6"];
        if (canNotInsertBlockElement.includes(this.type)) {
          element.setType("span");
        }
        this.somethingChanged();
      }
      return element;
    }
    /**
     * Create new element
     * @param element
     * @param beforeContent
     * @returns {*}
     */
    createElement(element, beforeContent = false, index = null) {
      element.beforeContent = beforeContent;
      return this.baseClass.createChild(element, index);
    }
    /**
     * Trigger something changed event to redraw element
     */
    somethingChanged() {
      this.baseClass.somethingChanged();
    }
    /**
     * Add new element to children array
     * @param beforeContent
     * @returns {*}
     */
    addChild(beforeContent = false, index = null) {
      const element = this.createElement(this.baseClass.createElement(), beforeContent, index);
      if (this.baseClass.elementDrawn === true) {
        const canNotInsertBlockElement = ["p", "span", "a", "h1", "h2", "h3", "h4", "h5", "h6"];
        if (canNotInsertBlockElement.includes(this.type)) {
          element.setType("span");
        }
        this.somethingChanged();
      }
      return element;
    }
    setChildren(children) {
      this.baseClass.children = children;
      if (this.baseClass.elementDrawn === true) {
        this.somethingChanged();
      }
    }
    setAttribute(attribute, value = null) {
      this.attributes[attribute] = value;
      return this;
    }
    /**
     * Remove element attribute
     * @param attribute {string}
     * @returns {HtmlElement}
     */
    removeAttribute(attribute) {
      if (this.attributes[attribute] !== void 0) {
        delete this.attributes[attribute];
      }
      return this;
    }
    /**
     * Add attributes to element
     * @param attributes {object}
     * @returns {HtmlElement}
     */
    addAttributes(attributes) {
      if (typeof attributes !== "object") {
        console.error("Attributes must be an object", attributes);
        return this;
      }
      for (const attribute in attributes) {
        const value = attributes[attribute];
        this.setAttribute(attribute, value);
      }
      return this;
    }
    /**
     * Add value to element attribute
     * @param attribute
     * @param value
     * @param separator
     * @returns {HtmlElement}
     */
    addToAttribute_bak(attribute, value = null, separator = " ") {
      if (typeof this.attributes[attribute] === "undefined" || this.attributes[attribute] === null || this.attributes[attribute] === "" || this.attributes[attribute] === void 0) {
        return this.setAttribute(attribute, value.toString().trim());
      }
      if (attribute === "style") {
        separator = ";";
      }
      const attributeValue = this.attributes[attribute].split(separator);
      if (attributeValue.includes(value)) {
        return this;
      }
      attributeValue.push(value);
      return this.setAttribute(attribute, attributeValue.join(separator));
    }
    addToAttribute(attribute, value = null, separator = " ") {
      var _a;
      if (value == null) return this;
      const attr = attribute === "className" ? "class" : attribute;
      const rawCurrent = (_a = this.attributes[attr]) != null ? _a : "";
      const val = String(value).trim();
      if (!val) return this;
      if (attr === "class") {
        const parts2 = rawCurrent.trim().split(/\s+/u).filter(Boolean);
        if (!parts2.includes(val)) {
          parts2.push(val);
        }
        return this.setAttribute("class", parts2.join(" "));
      }
      if (attr === "style") {
        const map = /* @__PURE__ */ Object.create(null);
        rawCurrent.split(";").forEach((rule) => {
          const [k, v] = rule.split(":");
          if (!k || v == null) return;
          map[k.trim().toLowerCase()] = v.trim();
        });
        const [kNew, vNew] = val.split(":");
        if (!kNew || vNew == null) return this;
        map[kNew.trim().toLowerCase()] = vNew.trim();
        const styleStr = Object.entries(map).map(([k, v]) => `${k}: ${v}`).join("; ");
        return this.setAttribute("style", styleStr);
      }
      const parts = rawCurrent.split(separator).map((s) => s.trim()).filter(Boolean);
      if (!parts.includes(val)) {
        parts.push(val);
      }
      return this.setAttribute(attr, parts.join(separator));
    }
    addToAttribute_inline(attribute, value = null, separator = " ") {
      var _a;
      if (value == null) return this;
      const attr = attribute === "className" ? "class" : attribute;
      const rawCurrent = (_a = this.attributes[attr]) != null ? _a : "";
      const val = String(value).trim();
      if (!val) return this;
      if (attr === "class") {
        const parts2 = rawCurrent.trim().split(/\s+/u).filter(Boolean);
        if (!parts2.includes(val)) {
          parts2.push(val);
        }
        return this.setAttribute("class", parts2.join(" "));
      }
      if (attr === "style") {
        const map = /* @__PURE__ */ Object.create(null);
        rawCurrent.split(";").forEach((rule) => {
          const [k, v] = rule.split(":");
          if (!k || v == null) return;
          map[k.trim().toLowerCase()] = v.trim();
        });
        const [kNew, vNew] = val.split(":");
        if (!kNew || vNew == null) return this;
        map[kNew.trim().toLowerCase()] = vNew.trim();
        const styleStr = Object.entries(map).map(([k, v]) => `${k}: ${v}`).join("; ");
        return this.setAttribute("style", styleStr);
      }
      const parts = rawCurrent.split(separator).map((s) => s.trim()).filter(Boolean);
      if (!parts.includes(val)) {
        parts.push(val);
      }
      return this.setAttribute(attr, parts.join(separator));
    }
    /**
     * Add class to element
     * @param className
     * @returns {HtmlElement}
     */
    addClass(className) {
      this.addToAttribute("class", ` ${className}`);
      return this;
    }
    /**
     * Set element class
     * @param className
     * @returns {HtmlElement}
     */
    setClass(className) {
      this.setAttribute("class", className);
      return this;
    }
    /**
     * Get element class
     * @returns {string|null}
     */
    getClass() {
      return this.getAttribute("class");
    }
    /**
     * Check if element has class
     * @param className
     * @returns {boolean}
     */
    hasClass(className) {
      if (this.attributes.class) {
        const classList = this.attributes.class.split(" ");
        if (classList.includes(className)) {
          return true;
        }
      }
      return false;
    }
    /**
     * Remove class from element
     * @param className
     * @returns {HtmlElement}
     */
    removeClass(className) {
      if (this.attributes.class) {
        const classList = this.attributes.class.split(" ");
        if (classList.includes(className)) {
          classList.splice(classList.indexOf(className), 1);
          this.attributes.class = classList.join(" ");
        }
      }
      return this;
    }
    /**
     * Toggle class
     * @param className {string}
     * @returns {HtmlElement}
     */
    toggleClass(className) {
      if (this.attributes["class"] !== void 0) {
        let elementClass = this.attributes.class.split(" ");
        if (elementClass.includes(className)) {
          this.removeClass(className);
        } else {
          this.addClass(className);
        }
      } else {
        this.addClass(className);
      }
      return this;
    }
    /**
     * Get element attribute
     * @param attribute
     * @returns {*|null}
     */
    getAttribute(attribute) {
      return this.attributes[attribute] || null;
    }
    /**
     * Create element identifier
     */
    createIdentifier() {
      if (this.getIdentifier() !== null) {
        this.setAttribute(this.baseClass.elementDataAttributeName, this.getIdentifier());
      }
    }
    /**
     * Create element html
     * @returns {string}
     */
    html() {
      this.baseClass.elementDrawn = false;
      let html = "";
      let beforeContent = "";
      let afterContent = "";
      this.createIdentifier();
      const children = this.baseClass.getChildren();
      if (children.length > 0) {
        for (const element of children) {
          if (element.replaceContent !== true) {
            if (element.beforeContent === true) {
              beforeContent += element.html();
            } else {
              try {
                afterContent += element.html();
              } catch (error) {
                console.error(error);
                console.error(element);
              }
            }
          }
        }
        html += this.create(beforeContent + this.createContent() + afterContent);
      } else {
        html += this.create(this.createContent());
      }
      this.elementDrawn = true;
      this.baseClass.elementDrawn = true;
      return html;
    }
    /**
     * Returns representation of element as json
     */
    json() {
      const objectToJsonize = {
        type: this.type,
        selfClosing: this.selfClosing,
        attributes: this.attributes,
        content: this.content,
        beforeContent: this.beforeContent,
        identifier: this.identifier
      };
      const children = this.baseClass.getChildren();
      if (children.length > 0) {
        objectToJsonize.children = [];
        for (const child of children) {
          objectToJsonize.children.push(child.json());
        }
      }
      return JSON.parse(JSON.stringify(objectToJsonize));
    }
    /**
     * Create element
     * @param content
     * @returns {string}
     */
    create(content = "") {
      if (typeof content === "undefined" || content === "") {
        content = this.content;
      }
      if (this.selfClosing === true || new HtmlElementEmptyTags_default().check(this.type)) {
        const slash = this.baseClass.skipSlashForEmptyTags === true ? "" : " /";
        return `<${this.type}${this.createAttributes()}${slash}>`;
      } else {
        return `<${this.type}${this.createAttributes()}>${content}</${this.type}>`;
      }
    }
    /**
     * Create element content
     * @returns {string}
     */
    createContent() {
      const contentChildren = this.baseClass.getContentChildren();
      if (contentChildren.length > 0) {
        let content = "";
        for (const element of contentChildren) {
          content += element.html();
        }
        return content;
      }
      return this.content;
    }
    getContent() {
      return this.content;
    }
    /**
     * Create element attributes
     * @returns {string}
     */
    createAttributes() {
      if (Object.keys(this.attributes).length === 0) {
        return "";
      }
      const attributes = [" "];
      for (const attribute in this.attributes) {
        const value = this.attributes[attribute];
        if (value !== null) {
          attributes.push(`${attribute}="${value}"`);
        } else {
          attributes.push(`${attribute}`);
        }
      }
      return attributes.join(" ");
    }
    /**
     * Set element as self closing
     * @returns {HtmlElement}
     */
    setSelfClosing() {
      this.selfClosing = true;
      return this;
    }
    unsetSelfClosing() {
      this.selfClosing = false;
      return this;
    }
    /**
     * Set element content
     * @param content {string}
     * @returns {HtmlElement}
     */
    setContent(content) {
      if (content === null || content === void 0 || content === "null") {
        this.content = "";
      } else {
        this.content = content;
      }
      return this;
    }
    /**
     * Add content to element (append)
     * @param content {string}
     * @returns {HtmlElement}
     */
    addContent(content) {
      this.content += content;
      return this;
    }
  };
  var HtmlElement_default = HtmlElement;

  // SimpleHtmlElementPackage/HtmlElementSearch.js
  var HtmlElementSearch = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
    }
    /**
     * Find SimpleHtmlElement with given identifier
     * @param elementIdentifier
     * @returns {SimpleHtmlElement}
     */
    get(elementIdentifier) {
      for (const element of this.baseClass.children) {
        if (element.getIdentifier() === elementIdentifier) {
          return element;
        }
        if (element.children.length > 0) {
          const foundElement = element.get(elementIdentifier);
          if (foundElement.getIdentifier() === elementIdentifier) {
            return foundElement;
          }
        }
      }
      return this.baseClass;
    }
    /**
     * Find SimpleHtmlElement with given type
     * @param selector
     * @returns {SimpleHtmlElement|*}
     */
    find(selector) {
      for (const element of this.baseClass.children) {
        if (element.htmlElement.type === selector) {
          return element;
        }
        if (element.children.length > 0) {
          const foundElement = element.find(selector);
          if (foundElement instanceof SimpleHtmlElement_default && foundElement.htmlElement.type === selector) {
            return foundElement;
          }
        }
      }
      return this.baseClass;
    }
    /**
     * Find SimpleHtmlElement with given class
     * @param className
     * @returns {SimpleHtmlElement|*}
     */
    findByClass(className) {
      className = className.replace(".", "");
      for (const element of this.baseClass.children) {
        const elementClass = element.htmlElement.attributes.class ? element.htmlElement.attributes.class.split(" ") : [];
        if (elementClass.includes(className)) {
          return element;
        }
        if (element.children.length > 0) {
          const foundElement = element.findByClass(className);
          const elementClassCh = foundElement.htmlElement.attributes.class ? foundElement.htmlElement.attributes.class.split(" ") : [];
          if (foundElement instanceof SimpleHtmlElement_default && elementClassCh.includes(className)) {
            return foundElement;
          }
        }
      }
      return this.baseClass;
    }
    findById(id) {
    }
    findByAttribute(attribute) {
    }
  };
  var HtmlElementSearch_default = HtmlElementSearch;

  // SimpleHtmlElementPackage/HtmlElementDomManipulator.js
  var HtmlElementDomManipulator = class {
    /**
     * Constructor
     * @param baseClass {SimpleHtmlElement}
     */
    constructor(baseClass) {
      this.baseClass = baseClass;
    }
    /**
     * Get DOM element
     * @returns {Promise<unknown>}
     */
    get() {
      return new Promise((resolve, reject) => {
        this.baseClass.isElementDrawn().then(() => {
          const element = document.querySelector(
            `[${this.baseClass.getElementDataAttributeName()}='${this.baseClass.getIdentifier()}']`
          );
          if (element) {
            resolve(element);
          } else {
          }
        });
      });
    }
    /**
     * Redraw element in DOM
     */
    redraw() {
      this.get().then((element) => {
        element.outerHTML = this.baseClass.html();
      }).catch(() => {
        if (this.baseClass.parent !== null) {
          this.baseClass.parent.redraw();
        }
      });
    }
    /**
     * Set DOM element attributes
     * @param attributes
     */
    setAttributes(attributes) {
      const keys = Object.keys(attributes);
      keys.forEach((key) => {
        this.setAttribute(key, attributes[key]);
      });
    }
    /**
     * Set DOM element attribute
     * @param attribute {string}
     * @param value {*}
     */
    setAttribute(attribute, value) {
      this.get().then((element) => {
        if (value === null) {
          element.setAttribute(attribute);
        } else {
          element.setAttribute(attribute, value);
        }
      });
    }
    /**
     * Remove DOM element attribute
     * @param attribute {string}
     */
    removeAttribute(attribute) {
      this.get().then((element) => {
        element.removeAttribute(attribute);
      });
    }
    /**
     * Toggle DOM element attribute
     * @param attribute {string}
     * @param value {*}
     */
    toggleAttribute(attribute, value) {
      this.get().then((element) => {
        if (element.hasAttribute(attribute)) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, value);
        }
      });
    }
    /**
     * Add DOM element class
     * @param className {string}
     */
    addClass(className) {
      this.get().then((element) => {
        className.split(" ").forEach((className2) => {
          if (className2 !== "") {
            element.classList.add(className2);
          }
        });
      });
    }
    /**
     * Set DOM element class
     * @param className {string}
     */
    setClass(className) {
      this.get().then((element) => {
        element.setAttribute("class", className);
      });
    }
    /**
     * Remove DOM element class
     * @param className {string}
     */
    removeClass(className) {
      this.get().then((element) => {
        className.split(" ").forEach((className2) => {
          if (className2 !== "") {
            element.classList.remove(className2);
          }
        });
      });
    }
    /**
     * Toggle DOM element class
     * @param className {string}
     */
    toggleClass(className) {
      this.get().then((element) => {
        element.classList.toggle(className);
      });
    }
    /**
     * Remove DOM element
     */
    remove() {
      this.get().then((element) => {
        element.remove();
      });
    }
    /**
     * Clear DOM element content (inner HTML)
     */
    clear() {
      this.get().then((element) => {
        element.innerHTML = "";
      });
    }
    /**
     * Append style element to head
     * @param styles
     */
    insertStyles(styles) {
      const elementIdentifier = this.baseClass.getIdentifier();
      const style = document.createElement("style");
      style.innerHTML = styles;
      style.setAttribute("data-ei-style", elementIdentifier);
      document.head.appendChild(style);
    }
    /**
     * Remove style element from head
     */
    removeStyles() {
      const elementIdentifier = this.baseClass.getIdentifier();
      const style = document.querySelector(`style[data-ei-style="${elementIdentifier}"]`);
      if (style) {
        style.remove();
      }
    }
  };
  var HtmlElementDomManipulator_default = HtmlElementDomManipulator;

  // SimpleHtmlElementPackage/HtmlElementVariableReplacer.js
  var HtmlElementVariableReplacer = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this._variables = [];
    }
    parseContent(content) {
      let normalizedContent = content;
      let regex = /{{(.*?)}}/g;
      if (typeof content !== "string") {
        return content;
      }
      let matches = content.match(regex);
      if (matches !== null) {
        for (let i = 0; i < matches.length; i++) {
          let match = matches[i];
          let variable = match.replace("{{", "").replace("}}", "");
          normalizedContent = normalizedContent.replace("{{" + variable + "}}", "{{" + variable.trim() + "}}");
          if (this._variables.indexOf(variable.trim()) === -1) {
            this._variables.push(variable.trim());
          }
        }
      } else {
        this._variables = [];
      }
      return normalizedContent;
    }
    get variables() {
      return this._variables;
    }
    splitContent(content) {
      return content.split(/({{.*?}})/g);
    }
  };
  var HtmlElementVariableReplacer_default = HtmlElementVariableReplacer;

  // SimpleHtmlElementPackage/HtmlElementObservableVariable.js
  var HtmlElementObservableVariable = class {
    constructor() {
      this._value = "";
      this.eventName = "stateChange";
      this.observers = [];
      this.useEvent = false;
    }
    /**
     *
     * @param observer {SimpleHtmlElement}
     * @param callBack {string}
     * @returns {HtmlElementObservableVariable}
     */
    addObserver(observer, callBack, attributeName) {
      this.observers.push({ callBack, observer, attributeName });
      if (callBack === "setContent") {
        observer.setContent(this._value, true);
      }
      if (callBack === "setAttribute") {
        observer.setAttribute(attributeName, this._value, true);
      }
      return this;
    }
    /**
     * Value Getter
     * @returns {string}
     */
    get value() {
      return this._value;
    }
    /**
     * Set event name
     * @param eventName {string}
     * @returns {HtmlElementObservableVariable}
     */
    setEventName(eventName) {
      this.eventName = eventName;
      return this;
    }
    triggerFirstChange() {
      this.notifyObservers(this._value);
      return this;
    }
    set value(newValue) {
      if (newValue !== this._value) {
        this._value = newValue;
        this.notifyObservers(newValue);
      }
    }
    /**
     * Fire event or notify observers
     * @param newValue
     */
    notifyObservers(newValue) {
      if (this.useEvent) {
        const stateChangeEvent = new Event(this.eventName);
        stateChangeEvent.detail = { value: newValue };
        document.dispatchEvent(stateChangeEvent);
      }
      if (this.observers.length > 0) {
        this.observers.forEach((observer) => {
          if (observer.callBack === "setContent") {
            observer.observer.setContent(newValue, true);
          } else {
            observer.observer.setAttribute(observer.attributeName, newValue, true);
          }
        });
      }
    }
  };
  var HtmlElementObservableVariable_default = HtmlElementObservableVariable;

  // SimpleHtmlElementPackage/HtmlElementChangeDetector.js
  var HtmlElementChangeDetector = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this.variable = null;
      this.oldValue = null;
      this.changeDetectorInterval = 300;
      this.type = "content";
      this.attributeName = null;
    }
    /**
     * Set type of change detector (content, attribute)
     * @param type {string} - content, attribute
     * @returns {HtmlElementChangeDetector}
     */
    setType(type) {
      this.baseClass.setType(type);
      return this;
    }
    setAttribute(attributeName) {
      this.attributeName = attributeName;
      this.type = "attribute";
      return this;
    }
    /**
     * @param variableName {string}
     * @returns {HtmlElementChangeDetector}
     */
    setVariable(variableName) {
      try {
        if (typeof window[variableName] === void 0) {
          throw new Error("Variable " + variableName + " is not defined");
        }
        if (window[variableName] instanceof HtmlElementObservableVariable_default) {
          window[variableName].addObserver(
            this.baseClass,
            this.type === "content" ? "setContent" : "setAttribute",
            this.attributeName || void 0
          );
          return this;
        }
        this.variable = variableName;
        this.start();
      } catch (e) {
        console.error(e);
      }
      return this;
    }
    /**
     * Set change detector interval
     * @param interval {number}
     * @returns {HtmlElementChangeDetector}
     */
    setChangeDetectorInterval(interval) {
      this.changeDetectorInterval = interval;
      return this;
    }
    start() {
      if (this.type === "content") {
        this.baseClass.setContent(window[this.variable]);
      } else {
        this.baseClass.setAttribute(this.attributeName, window[this.variable], true);
      }
      this.changeDetector();
      return this;
    }
    changeDetector() {
      setTimeout(() => {
        if (this.oldValue !== window[this.variable]) {
          this.oldValue = window[this.variable];
          if (this.type === "content") {
            this.baseClass.setContent(this.oldValue, true);
          } else {
            console.log("setting attribute", this.attributeName, this.oldValue);
            this.baseClass.setAttribute(this.attributeName, this.oldValue, true);
          }
        }
        this.changeDetector();
      }, this.changeDetectorInterval);
    }
  };
  var HtmlElementChangeDetector_default = HtmlElementChangeDetector;

  // SimpleHtmlElementPackage/HtmlElementDrawer.js
  var HtmlElementDrawer = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
    }
    attach(element) {
      const container = this.getContainer(element);
      try {
        if (container) {
          container.innerHTML = this.baseClass.html();
        } else {
          throw new Error(`Element ${element} does not exist.`);
        }
      } catch (error) {
        console.error(error);
      }
      return this;
    }
    append(element) {
      const container = this.getContainer(element);
      try {
        if (container) {
          const htmlContent = this.baseClass.html();
          container.insertAdjacentHTML("beforeend", htmlContent);
        } else {
          throw new Error(`Element ${element} does not exist.`);
        }
      } catch (error) {
        console.error(error);
      }
      return this;
    }
    prependTo(element) {
      const container = this.getContainer(element);
      try {
        if (container) {
          const htmlContent = this.baseClass.html();
          container.insertAdjacentHTML("afterbegin", htmlContent);
        } else {
          throw new Error(`Element ${element} does not exist.`);
        }
      } catch (error) {
        console.error(error);
      }
      return this;
    }
    getContainer(element) {
      if (typeof element === "string") {
        const container = document.querySelector(element);
        if (!container) {
          throw new Error(`Element ${element} not found.`);
        }
        return container;
      } else if (element instanceof HTMLElement) {
        return element;
      } else {
        throw new Error(`Invalid element type.`);
      }
    }
  };
  var HtmlElementDrawer_default = HtmlElementDrawer;

  // SimpleHtmlElementPackage/HtmlElementEventHandler.js
  var HtmlElementEventHandler = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this._events = {};
    }
    /**
     * Add event to element
     * @param eventName {string}
     * @param callback {function}
     * @returns {HtmlElementEventHandler}
     */
    addEvent(eventName, callback) {
      if (typeof callback !== "function") {
        console.error("Callback must be a function", this.baseClass);
      }
      this._events[eventName] = callback;
      return this;
    }
    /**
     * Remove event from element
     * @param eventName
     * @param domManipulator {HtmlElementDomManipulator|null}
     * @returns {HtmlElementEventHandler}
     */
    removeEvent(eventName) {
      if (this._events[eventName]) {
        delete this._events[eventName];
        this.baseClass.somethingChanged();
      }
      return this;
    }
    /**
     * Trigger event
     * @param eventName
     * @returns {HtmlElementEventHandler}
     */
    triggerEvent(eventName) {
      if (this._events[eventName]) {
        this._events[eventName]();
      }
      return this;
    }
    /**
     * Get events
     * @returns {*|{}}
     */
    get events() {
      return this._events;
    }
    attach(element) {
      for (const eventName in this._events) {
        element.addEventListener(eventName, this._events[eventName]);
      }
      return this;
    }
    attachSingle(element, eventName, callback) {
      element.addEventListener(eventName, callback);
      return this;
    }
  };
  var HtmlElementEventHandler_default = HtmlElementEventHandler;

  // SimpleHtmlElementPackage/HtmlLoaderHandler.js
  var HtmlLoaderHandler = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
    }
    setLoading() {
      this.baseClass.setAttribute("data-loading", "true", true);
      this.loader = this.baseClass.addChild().setType("div").addClass("loader");
      this.loader.addChild().setType("span").addClass("visually-hidden").setContent("Loading...");
    }
    unsetLoading() {
      this.baseClass.removeAttribute("data-loading");
      this.loader.remove();
    }
  };
  var HtmlLoaderHandler_default = HtmlLoaderHandler;

  // SimpleHtmlElementPackage/HtmlElementCss.js
  var HtmlElementCss = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this.css = {};
      this.cssString = null;
    }
    /**
     * Add css to element
     * @param cssObject
     * @returns {HtmlElementCss}
     */
    addCss(cssObject) {
      this.css = __spreadValues(__spreadValues({}, this.css), cssObject);
      return this;
    }
    /**
     * Get css string
     * @returns {string}
     */
    getCss() {
      return this.cssString === null ? this.createCssString() : this.getCssString();
    }
    /**
     * Create css string from css object
     * @returns {string}
     */
    createCssString() {
      let cssString = "[data-ei='" + this.baseClass.getIdentifier() + "'] {\n";
      for (let key in this.css) {
        cssString += `${key} {
`;
        for (let subKey in this.css[key]) {
          cssString += `${subKey}: ${this.css[key][subKey]};`;
        }
        cssString += "\n}\n}\n";
      }
      return cssString;
    }
    /**
     * Set css object
     * @param css {Object}
     * @returns {HtmlElementCss}
     */
    setCss(css) {
      this.css = css;
      return this;
    }
    /**
     * Set css string
     * @param cssString {string}
     * @returns {HtmlElementCss}
     */
    setCssString(cssString) {
      this.cssString = cssString;
      return this;
    }
    /**
     * Get css string
     * @returns {string}
     */
    getCssString() {
      let cssString = "[data-ei='" + this.baseClass.getIdentifier() + "'] {\n";
      cssString += this.cssString;
      cssString += "\n}\n";
      return cssString;
    }
  };
  var HtmlElementCss_default = HtmlElementCss;

  // SimpleHtmlElementPackage/HtmlElementDynamicScriptLoader.js
  var HtmlElementDynamicScriptLoader = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this.script = null;
      this.executable = null;
    }
    /**
     * Load script
     * @param url {string}
     * @param callback {function}
     */
    loadScript(url, callback) {
      const self = this;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "text";
      xhr.onload = function() {
        if (xhr.status === 200) {
          self.script = xhr.responseText;
          self.createFunctionFromString();
        } else {
          console.error("Failed to load script: " + url);
        }
      };
      xhr.send();
    }
    createFunctionFromString() {
      const assignElement = "const currentElement = this;";
      const scriptWithContext = assignElement + this.script;
      this.executable = new Function(scriptWithContext).bind(this.baseClass);
    }
    execute() {
      return this.executable();
    }
    canExecute() {
      return new Promise((resolve, reject) => {
        if (this.executable !== null) {
          resolve(true);
          return;
        }
        setTimeout(() => {
          resolve(this.canExecute());
        }, 1e3);
      });
    }
  };
  var HtmlElementDynamicScriptLoader_default = HtmlElementDynamicScriptLoader;

  // SimpleHtmlElementPackage/HtmlElementStyle.js
  var HtmlElementStyle = class {
    constructor(baseClass) {
      this.baseClass = baseClass;
      this.styles = {};
    }
    clear() {
      this.styles = {};
      this.baseClass.removeAttribute("style");
      return this;
    }
    addStyle(stylePropertyName, stylePropertyValue) {
      this.styles[stylePropertyName] = stylePropertyValue;
      this.apply();
      return this;
    }
    removeStyle(stylePropertyName) {
      delete this.styles[stylePropertyName];
      this.apply();
      return this;
    }
    apply() {
      let styles = "";
      for (let style in this.styles) {
        styles += `${style}: ${this.styles[style]}; `;
      }
      if (styles.trim() !== "") {
        this.baseClass.setAttribute("style", styles);
      } else {
        this.baseClass.removeAttribute("style");
      }
      return this;
    }
  };
  var HtmlElementStyle_default = HtmlElementStyle;

  // SimpleHtmlElementPackage/SimpleHtmlElement.js
  var SimpleHtmlElement = class _SimpleHtmlElement {
    /**
     * Constructor
     */
    constructor() {
      this.parent = null;
      this.children = [];
      this.contentChildren = [];
      this.parentElementTreeIndex = null;
      this.elementDrawn = false;
      this.elementDataAttributeName = "data-ei";
      this.skipSlashForEmptyTags = true;
      this.contentVariableChangeDetectorInterval = 300;
      this.isLoading = false;
      this.htmlElement = new HtmlElement_default(this);
      this.search = new HtmlElementSearch_default(this);
      this.domManipulator = new HtmlElementDomManipulator_default(this);
      this.variableReplacer = new HtmlElementVariableReplacer_default(this);
      this.elementDrawer = new HtmlElementDrawer_default(this);
      this.eventHandler = null;
      this.loaderHandler = null;
      this.css = null;
      this.style = null;
      this.dynamicScriptLoader = null;
      this.contentVariableChangeDetector = null;
      this.attributesVariableChangeDetectors = [];
      this.parentComponent = null;
    }
    /**
     * Set a component wrapper component that contains this element
     * @param componentWrapper {ComponentWrapper}
     * @returns {SimpleHtmlElement}
     */
    setParentComponent(componentWrapper) {
      this.parentComponent = componentWrapper;
      return this;
    }
    getParentComponent() {
      return this.parentComponent;
    }
    /**
     * Wait for element to be supposedly drawn in DOM
     * @returns {Promise<boolean>}
     */
    isElementDrawn() {
      return new Promise((resolve) => {
        if (this.elementDrawn !== false) {
          resolve(true);
        } else {
          setTimeout(() => {
            resolve(this.isElementDrawn());
          }, 300);
        }
      });
    }
    /**
     * Wait for element to be supposedly drawn in DOM
     * Alias isElementDrawn
     * @returns {Promise<boolean>}
     */
    waitForElementToBeDrawn() {
      return this.isElementDrawn();
    }
    /**
     * Redraw element in DOM
     * @returns {SimpleHtmlElement}
     */
    redraw() {
      this.removeStyles();
      this.domManipulator.redraw();
      this.insertStyles();
      return this;
    }
    /**
     * Deprecated - Redraw element in DOM
     * @returns {SimpleHtmlElement}
     */
    redrawInPlace() {
      return this.redraw();
    }
    /**
     * GetElementSelector
     * @returns {string}
     */
    getElementDataAttributeName() {
      return this.elementDataAttributeName;
    }
    /**
     * Get DOM element
     * @returns {Promise<*>}
     */
    getDomElement() {
      return this.domManipulator.get();
    }
    /**
     * Set parent element
     * @param parent {SimpleHtmlElement}
     * @returns {SimpleHtmlElement}
     */
    setParent(parent) {
      this.parent = parent;
      return this;
    }
    /**
     * Set parent element tree index
     * @param parentElementTreeIndex {number}
     * @returns {SimpleHtmlElement}
     */
    setParentElementTreeIndex(parentElementTreeIndex) {
      this.parentElementTreeIndex = parentElementTreeIndex;
      return this;
    }
    /**
     * Get current html element identifier
     * @returns {string}
     */
    getIdentifier() {
      return this.htmlElement.getIdentifier();
    }
    /**
     * Deprecated - Get current html element identifier
     * @returns {string}
     */
    getIdentificator() {
      return this.getIdentifier();
    }
    /**
     * Set html element identifier
     * @param identifier {string}
     * @returns {SimpleHtmlElement}
     */
    setIdentifier(identifier) {
      this.htmlElement.setIdentifier(identifier);
      return this;
    }
    /**
     * Deprecated - Set html element identifier
     * @param identifier {string}
     * @returns {SimpleHtmlElement}
     */
    setIdentificator(identifier) {
      return this.setIdentifier(identifier);
    }
    /**
     * Get SimpleHtmlElement by given identificator
     * @param elementIdentifier {string | undefined}
     * @returns {SimpleHtmlElement}
     */
    get(elementIdentifier = void 0) {
      if (elementIdentifier === void 0) {
        return this;
      }
      return this.search.get(elementIdentifier);
    }
    /**
     * Find SimpleHtmlElement by given selector (element.type)
     * @param selector {string}
     * @returns {SimpleHtmlElement}
     */
    find(selector) {
      return this.search.find(selector);
    }
    /**
     * Find SimpleHtmlElement by given class
     * @param className
     * @returns {*|SimpleHtmlElement}
     */
    findByClass(className) {
      return this.search.findByClass(className);
    }
    /**
     * Clear element of all it's children
     */
    clear() {
      if (this.children.length > 0) {
        this.children.forEach((child) => {
          child.clear();
          child.remove();
        });
        this.children = [];
      }
      if (this.elementDrawn === true) {
        this.domManipulator.clear();
      }
      return this;
    }
    /**
     * Remove element from DOM if necessary
     */
    remove() {
      if (this.elementDrawn === true) {
        this.domManipulator.remove();
      }
      if (this.parent !== null) {
        return this.parent.removeChild(this.parentElementTreeIndex);
      }
      return this;
    }
    removeChild(childIndex) {
      this.children.splice(childIndex, 1);
      return this;
    }
    /**
     * Set element to be self closing (e.g. <img />)
     * @returns {SimpleHtmlElement}
     */
    selfClose() {
      return this.setSelfClosing();
    }
    /**
     * Alias for selfClose
     * Set element to be self closing (e.g. <img />)
     * @returns {SimpleHtmlElement}
     */
    setSelfClosing() {
      this.htmlElement.setSelfClosing();
      return this;
    }
    disableSelfClosing() {
      return this.htmlElement.unsetSelfClosing();
    }
    /**
     * Create HTML string from element
     * @returns {string}
     */
    html() {
      this.attachEvents();
      return this.htmlElement.html();
    }
    json() {
      this.attachEvents();
      return this.htmlElement.json();
    }
    /**
     * Add class to element
     * @param className {string}
     * @returns {SimpleHtmlElement}
     */
    addClass(className) {
      this.htmlElement.addClass(className);
      if (this.elementDrawn === true) {
        this.domManipulator.addClass(className);
      }
      return this;
    }
    /**
     * Set class on element
     * @param className
     * @returns {SimpleHtmlElement}
     */
    setClass(className) {
      this.htmlElement.setClass(className);
      if (this.elementDrawn === true) {
        this.domManipulator.setClass(className);
      }
      return this;
    }
    /**
     * Get class of element
     * @returns {string|null}
     */
    getClass() {
      return this.htmlElement.getClass();
    }
    /**
     * Remove class from element
     * @param className {string}
     * @returns {SimpleHtmlElement}
     */
    removeClass(className) {
      this.htmlElement.removeClass(className);
      if (this.elementDrawn === true) {
        this.domManipulator.removeClass(className);
      }
      return this;
    }
    /**
     * Check if element has class
     * @param className
     * @returns {boolean}
     */
    hasClass(className) {
      return this.htmlElement.hasClass(className);
    }
    /**
     * Toggle class on element
     * @param className
     * @returns {SimpleHtmlElement}
     */
    toggleClass(className) {
      this.htmlElement.toggleClass(className);
      if (this.elementDrawn === true) {
        this.domManipulator.toggleClass(className);
      }
      return this;
    }
    /**
     * Set attribute on element
     * @param attribute
     * @param value
     * @param safeValue
     * @returns {SimpleHtmlElement}
     */
    setAttribute(attribute, value, safeValue = false) {
      if (safeValue === true) {
        this.htmlElement.setAttribute(attribute, value);
      } else {
        this.handleAttributeVariable(attribute, value);
      }
      if (this.elementDrawn === true) {
        this.domManipulator.setAttribute(attribute, value);
      }
      return this;
    }
    /**
     * Remove attribute from element
     * @param attribute
     * @returns {SimpleHtmlElement}
     */
    removeAttribute(attribute) {
      this.htmlElement.removeAttribute(attribute);
      if (this.elementDrawn === true) {
        this.domManipulator.removeAttribute(attribute);
      }
      return this;
    }
    /**
     * Toggle attribute on element
     * @param attribute {string}
     * @param value {string| boolean | number | undefined}
     * @returns {SimpleHtmlElement}
     */
    toggleAttribute(attribute, value) {
      this.htmlElement.toggleAttribute(attribute, value);
      if (this.elementDrawn === true) {
        this.domManipulator.toggleAttribute(attribute, value);
      }
      return this;
    }
    /**
     * Hide element (using bootstrap utility class d-none)
     * @returns {SimpleHtmlElement}
     */
    hide() {
      this.addClass("d-none");
      return this;
    }
    /**
     * Show element (using bootstrap utility class d-none)
     * @returns {SimpleHtmlElement}
     */
    show() {
      this.removeClass("d-none");
      return this;
    }
    /**
     * Check if element has attribute
     * @param attribute
     * @returns {*}
     */
    hasAttribute(attribute) {
      return this.htmlElement.hasAttribute(attribute);
    }
    /**
     * Get attribute from element
     * @param attribute
     * @returns {*|null}
     */
    getAttribute(attribute) {
      return this.htmlElement.getAttribute(attribute);
    }
    /**
     * Set attributes on element
     * @param attributes
     * @returns {SimpleHtmlElement}
     */
    setAttributes(attributes) {
      this.htmlElement.setAttributes(attributes);
      if (this.elementDrawn === true) {
        this.domManipulator.setAttributes(attributes);
      }
      return this;
    }
    /**
     * Set type of element
     * @param type {string}
     * @returns {SimpleHtmlElement}
     */
    setType(type) {
      this.htmlElement.setType(type);
      this.somethingChanged();
      return this;
    }
    getType() {
      return this.htmlElement.type;
    }
    /**
     * Set content of element
     * @param beforeContent
     * @returns {*}
     */
    addChild(beforeContent = false, index = null) {
      if (this.isLoading === true) {
        this.unsetIsLoading();
      }
      return this.htmlElement.addChild(beforeContent, index);
    }
    setChildren(children) {
      if (this.isLoading === true) {
        this.unsetIsLoading();
      }
      this.htmlElement.setChildren(children);
      return this;
    }
    /**
     * Start live add
     * If we use addChild normally, each change will redraw the element
     * Here we can add multiple children and then finish live add and only then the element will be redrawn
     * @param beforeContent
     * @returns {SimpleHtmlElement}
     */
    addChildLive(beforeContent = false) {
      const element = this.createElement();
      element.beforeContent = beforeContent;
      element.setParent(this);
      return element;
    }
    /**
     * Finish child live add
     * @returns {SimpleHtmlElement}
     */
    finishChild() {
      this.parent.addElement(this, this.beforeContent);
      return this;
    }
    /**
     * Add element to element
     * @param element
     * @param beforeContent
     * @returns {*}
     */
    addElement(element, beforeContent = false) {
      if (element === null) {
        return this;
      }
      if (this.isLoading === true) {
        this.unsetIsLoading();
      }
      try {
        if (!(element instanceof _SimpleHtmlElement)) {
          throw new Error("Element must be instance of SimpleHtmlElement");
        }
      } catch (error) {
        console.error(error);
        console.error(element);
      }
      return this.htmlElement.addElement(element, beforeContent);
    }
    addElementAtIndex(element, index, beforeContent = false) {
      try {
        if (!(element instanceof _SimpleHtmlElement)) {
          throw new Error("Element must be instance of SimpleHtmlElement");
        }
      } catch (error) {
        console.error(error);
        console.error(element);
      }
      this.htmlElement.addElementAtIndex(element, index, beforeContent);
      return this;
    }
    /**
     * Get last element
     * @returns {SimpleHtmlElement}
     */
    getLastElement() {
      if (typeof this.children.at === "function") {
        return this.children.at(-1);
      } else {
        return this.children[this.children.length - 1];
      }
    }
    /**
     * Get last element index
     * @returns {number}
     */
    getLastElementIndex() {
      return this.children.length - 1;
    }
    /**
     * Create new child element
     * @param element {SimpleHtmlElement}
     * @param index {number}
     * @returns {*}
     */
    createChild(element, index = null) {
      if (element === void 0) {
        element = this.createElement();
      }
      if (index === null) {
        this.children.push(element);
        return this.getLastElement().setParentElementTreeIndex(this.getLastElementIndex()).setParent(this);
      } else {
        this.children.splice(index, 0, element);
        return this.children[index].setParentElementTreeIndex(index).setParent(this);
      }
    }
    /**
     * Create new SimpleHtmlElement
     * @returns {SimpleHtmlElement}
     */
    createElement() {
      return new _SimpleHtmlElement();
    }
    /**
     * Something changed to be triggered when some change that needs to be reflected in DOM happens
     */
    somethingChanged() {
      if (this.elementDrawn === true) {
        this.redraw();
      }
    }
    /**
     * Get count of children elements
     * @returns {number}
     */
    getChildrenCount() {
      return this.children.length;
    }
    /**
     * getChildren elements
     * @returns {*}
     */
    getChildren() {
      return this.children;
    }
    /**
     * Get content children elements
     * @returns {*}
     */
    getContentChildren() {
      return this.contentChildren;
    }
    /**
     * Get count of content children elements
     * @returns {number}
     */
    getContentChildrenCount() {
      return this.contentChildren.length;
    }
    /**
     * Add content to element
     * @param content {string}
     * @param contentChild {boolean}
     * @returns {SimpleHtmlElement}
     */
    setContent(content, contentChild = false) {
      if (contentChild !== true) {
        this.handleContentVariables(this.htmlElement.setContent(content).getContent());
      } else {
        this.htmlElement.setContent(content);
      }
      this.somethingChanged();
      return this;
    }
    /**
     * Add content to element
     * @param content {string}
     * @param contentChild {boolean}
     * @returns {SimpleHtmlElement}
     */
    setText(content, contentChild = false) {
      return this.setContent(content, contentChild);
    }
    /**
     * Get content of element
     * @returns {string}
     */
    getContent() {
      return this.htmlElement.getContent();
    }
    /**
     * Add content to element += (append)
     * @param content {string}
     * @returns {SimpleHtmlElement}
     */
    addContent(content) {
      this.handleContentVariables(this.htmlElement.addContent(content).getContent());
      return this;
    }
    /**
     * Add content to element as a child (used with detected variables)
     * @param content
     * @param isVariable
     * @returns {SimpleHtmlElement}
     */
    addContentChild(content, isVariable = false) {
      const element = this.createElement().setType("span").setContent(content, true);
      this.contentChildren.push(element);
      if (isVariable === true) {
        element.attachContentVariableChangeDetector(content);
      }
      return element;
    }
    /**
     * Handle content variables
     * @param content
     */
    handleContentVariables(content) {
      const normalizedContent = this.variableReplacer.parseContent(content);
      if (this.variableReplacer.variables.length > 0) {
        this.htmlElement.setContent(normalizedContent);
        this.contentChildren = [];
        const splitContent = this.variableReplacer.splitContent(normalizedContent);
        splitContent.forEach((part) => {
          const variableName = part.replace("{{", "").replace("}}", "");
          this.addContentChild(variableName, this.variableReplacer.variables.indexOf(variableName.trim()) !== -1);
        });
      }
    }
    /**
     * Handle attribute variable
     * @param attribute
     * @param value
     */
    handleAttributeVariable(attribute, value) {
      if (typeof value !== "string" && typeof value !== "number") {
        return;
      }
      const normalizedValue = this.variableReplacer.parseContent(value);
      if (this.variableReplacer.variables.length === 1) {
        this.htmlElement.setAttribute(attribute, normalizedValue);
        const variableName = normalizedValue.replace("{{", "").replace("}}", "");
        this.attachAttributeVariableChangeDetector(attribute, variableName);
        return;
      }
      this.htmlElement.setAttribute(attribute, normalizedValue);
    }
    /**
     * Attach attribute variable change detector
     * @param attributeName
     * @param variableName
     * @returns {SimpleHtmlElement}
     */
    attachAttributeVariableChangeDetector(attributeName, variableName) {
      const changeDetector = new HtmlElementChangeDetector_default(this).setAttribute(attributeName).setChangeDetectorInterval(this.contentVariableChangeDetectorInterval).setVariable(variableName);
      this.attributesVariableChangeDetectors.push(changeDetector);
      return this;
    }
    /**
     * Attach content variable change detector
     * @param variableName
     * @returns {SimpleHtmlElement}
     */
    attachContentVariableChangeDetector(variableName) {
      this.contentVariableChangeDetector = new HtmlElementChangeDetector_default(this).setChangeDetectorInterval(this.contentVariableChangeDetectorInterval).setVariable(variableName);
      return this;
    }
    /**
     * Attach element to element (replaces content)
     * @param element
     * @returns {SimpleHtmlElement}
     */
    attach(element) {
      this.insertStyles();
      this.elementDrawer.attach(element);
      return this;
    }
    /**
     * Append element to element
     * @param element
     * @returns {SimpleHtmlElement}
     */
    append(element) {
      this.insertStyles();
      this.elementDrawer.append(element);
      return this;
    }
    /**
     * Prepend element to element
     * @param element
     * @returns {SimpleHtmlElement}
     */
    prependTo(element) {
      this.insertStyles();
      this.elementDrawer.prependTo(element);
      return this;
    }
    /**
     * Add event to element
     * @param event {string}
     * @param callback {function}
     * @returns {SimpleHtmlElement}
     */
    addEvent(event, callback) {
      if (this.eventHandler === null) {
        this.eventHandler = new HtmlElementEventHandler_default(this);
      }
      this.eventHandler.addEvent(event, callback);
      if (this.elementDrawn === true) {
        this.domManipulator.get().then((element) => {
          this.eventHandler.attachSingle(element, event, callback);
        });
      }
      return this;
    }
    /**
     * Attach events to element
     */
    attachEvents() {
      if (this.eventHandler === null) {
        return;
      }
      this.domManipulator.get().then((element) => {
        this.eventHandler.attach(element);
      });
    }
    /**
     * Remove event from element
     * @param event {string}
     * @returns {SimpleHtmlElement}
     */
    removeEvent(event) {
      if (this.eventHandler === null) {
        console.error("No events to remove", this);
        return;
      }
      this.eventHandler.removeEvent(event);
      return this;
    }
    /**
     * Trigger event on element
     * @param event
     */
    triggerEvent(event) {
      if (this.eventHandler === null) {
        console.error("No events to trigger", this);
        return;
      }
      this.eventHandler.triggerEvent(event);
      return this;
    }
    /**
     * Set element to be loading
     * @returns {SimpleHtmlElement}
     */
    setIsLoading() {
      if (this.loaderHandler === null) {
        this.loaderHandler = new HtmlLoaderHandler_default(this);
      }
      this.loaderHandler.setLoading();
      this.isLoading = true;
      return this;
    }
    /**
     * Unset element to be loading
     * @returns {SimpleHtmlElement|boolean}
     */
    unsetIsLoading() {
      if (this.loaderHandler === null) {
        return false;
      }
      this.loaderHandler.unsetLoading();
      this.isLoading = false;
      return this;
    }
    /**
     * Set css to element {a: {color: 'red'}}
     * @param css
     * @returns {SimpleHtmlElement}
     */
    setCss(css) {
      if (this.css === null) {
        this.css = new HtmlElementCss_default(this);
      }
      this.css.setCss(css);
      if (this.elementDrawn === true) {
        this.domManipulator.removeStyles();
        this.domManipulator.insertStyles(this.css.getCss());
      }
      return this;
    }
    /**
     * Add css to element {a: {color: 'red'}}
     * @param css {object}
     * @returns {SimpleHtmlElement}
     */
    addCss(css) {
      if (this.css === null) {
        this.css = new HtmlElementCss_default(this);
      }
      this.css.addCss(css);
      if (this.elementDrawn === true) {
        this.domManipulator.removeStyles();
        this.domManipulator.insertStyles(this.css.getCss());
      }
      return this;
    }
    /**
     * Set css string to element '{color: red; background: blue;}'
     * @param cssString
     * @returns {SimpleHtmlElement}
     */
    setCssString(cssString) {
      if (this.css === null) {
        this.css = new HtmlElementCss_default(this);
      }
      this.css.setCssString(cssString);
      this.isElementDrawn().then(() => {
        this.domManipulator.removeStyles();
        this.domManipulator.insertStyles(this.css.getCss());
      });
      return this;
    }
    /**
     * Remove styles from element
     * @returns {SimpleHtmlElement|boolean}
     */
    removeStyles() {
      if (this.css === null) {
        return false;
      }
      this.domManipulator.removeStyles();
      return this;
    }
    /**
     * Insert styles to element
     * @returns {SimpleHtmlElement|boolean}
     */
    insertStyles() {
      if (this.css === null) {
        return false;
      }
      this.domManipulator.insertStyles(this.css.getCss());
      return this;
    }
    loadScript(url) {
      if (this.dynamicScriptLoader === null) {
        this.dynamicScriptLoader = new HtmlElementDynamicScriptLoader_default(this);
      }
      this.dynamicScriptLoader.loadScript(url);
      return this;
    }
    /**
         * Execute script that was previously loaded
         * @returns {SimpleHtmlElement}
    
         * */
    executeScript() {
      this.dynamicScriptLoader.canExecute().then(() => {
        this.dynamicScriptLoader.execute();
      });
      return this;
    }
    addStyle(stylePropertyName, stylePropertyValue) {
      if (this.style === null) {
        this.style = new HtmlElementStyle_default(this);
      }
      this.style.addStyle(stylePropertyName, stylePropertyValue);
      return this;
    }
    clearStyles() {
      if (this.style === null) {
        this.style = new HtmlElementStyle_default(this);
      }
      this.style.clear();
      return this;
    }
    removeStyle(stylePropertyName) {
      if (this.style === null) {
        this.style = new HtmlElementStyle_default(this);
      }
      this.style.removeStyle(stylePropertyName);
      return this;
    }
  };
  var SimpleHtmlElement_default = SimpleHtmlElement;

  // SimpleHtmlElementPackage/ComponentWrapper.js
  var ComponentWrapper = class {
    constructor() {
      this.element = new SimpleHtmlElement_default();
      this.element.setParentComponent(this);
      this.parent = null;
      this.isBuilt = false;
      this.parentComponent = null;
      this.methodsThatMustNotBeOverriden = {
        "setParent": true,
        "html": true,
        "get": true,
        "build": true
      };
    }
    /**
     * Clear overide flag for method
     * @param methodName
     */
    clearOverride(methodName) {
      this.methodsThatMustNotBeOverriden[methodName] = false;
    }
    /**
     * Check if all required methods are overriden
     */
    checkOverrides() {
      for (const methodName in this.methodsThatMustNotBeOverriden) {
        if (this.methodsThatMustNotBeOverriden[methodName] === true) {
          throw new Error("Method " + methodName + " must not be overriden");
        }
      }
    }
    /**
     * Set parent to actual element
     * @param parent
     * @returns {ComponentWrapper}
     */
    setParent(parent) {
      this.parent = parent;
      this.element.setParent(parent);
      this.clearOverride("setParent");
      return this;
    }
    /**
     * Set parent component to actual instance of the component
     * @param parent
     * @returns {ComponentWrapper}
     */
    setParentComponent(parent) {
      this.parentComponent = parent;
      return this;
    }
    /**
     * Get parent component
     * @returns {null|*}
     */
    getParentComponent() {
      if (this.parentComponent === null || typeof this.parentComponent === "undefined") {
        throw new Error("Parent component is not set");
      }
      return this.parentComponent;
    }
    html() {
      this.isBuilt = false;
      this.build();
      this.clearOverride("html");
      this.checkOverrides();
      return this.element.html();
    }
    get(elementIdentifier) {
      this.clearOverride("get");
      return elementIdentifier === "undefined" ? this.element : this.element.get(elementIdentifier);
    }
    find(selector) {
      return this.element.find(selector);
    }
    build() {
      this.clearOverride("build");
      if (!this.isBuilt) {
        if (typeof this.prebuild === "function") {
          this.prebuild();
        }
        if (typeof this.postBuild === "function") {
          this.postBuild();
        }
      }
      this.isBuilt = true;
      return this.element;
    }
    prebuild() {
    }
    postBuild() {
    }
    rebuild() {
      this.isBuilt = false;
      return this.build();
    }
    setIdentifier(identifier) {
      this.element.setIdentifier(identifier);
      return this;
    }
    getElement() {
      return this.element;
    }
    addClass(className) {
      this.element.addClass(className);
      return this;
    }
  };
  var ComponentWrapper_default = ComponentWrapper;

  // SimpleHtmlElementPackage/HtmlElementFactory.js
  var HtmlElementFactory = class _HtmlElementFactory {
    constructor(elementsObject, dataToReplace = null) {
      this.elementsObject = elementsObject;
      this.dataToReplace = dataToReplace;
    }
    build() {
      if (this.elementsObject instanceof Object) {
        if (this.dataToReplace !== null) {
          this.replaceData();
        }
        let elementIsEmpty = true;
        const createOnEmpty = this.elementsObject.hasOwnProperty("createOnEmpty") ? this.elementsObject.createOnEmpty : true;
        const element = new SimpleHtmlElement_default();
        if (this.elementsObject.hasOwnProperty("type")) {
          element.setType(this.elementsObject.type);
        }
        if (this.elementsObject.hasOwnProperty("attributes")) {
          element.setAttributes(this.elementsObject.attributes);
        }
        if (this.elementsObject.hasOwnProperty("children")) {
          for (const elementObject of this.elementsObject.children) {
            const child = new _HtmlElementFactory(elementObject).build();
            if (child !== null) {
              element.addElement(child);
              elementIsEmpty = false;
            }
          }
        }
        if (this.elementsObject.hasOwnProperty("identifier")) {
          element.setIdentifier(this.elementsObject.identifier);
        }
        if (this.elementsObject.hasOwnProperty("identificator")) {
          element.setIdentifier(this.elementsObject.identificator);
        }
        if (this.elementsObject.hasOwnProperty("content")) {
          if (this.elementsObject.content !== "") {
            elementIsEmpty = false;
          }
          element.setContent(this.elementsObject.content);
        }
        if (this.elementsObject.hasOwnProperty("text")) {
          if (this.elementsObject.text !== "") {
            elementIsEmpty = false;
          }
          element.setText(this.elementsObject.content);
        }
        if (this.elementsObject.hasOwnProperty("changes")) {
          element.setChanges(this.elementsObject.changes);
        }
        if (this.elementsObject.hasOwnProperty("changedBy")) {
          element.setChangedBy(this.elementsObject.changedBy);
        }
        if (this.elementsObject.hasOwnProperty("events")) {
          for (const event in this.elementsObject.events) {
            const eventName = Object.keys(this.elementsObject.events[event])[0];
            element.addEvent(eventName, this.elementsObject.events[event][eventName]);
          }
        }
        return elementIsEmpty && createOnEmpty === false ? null : element;
      }
    }
    replaceData() {
      let stringifiedObject = JSON.stringify(this.elementsObject);
      const keys = Object.keys(this.dataToReplace);
      keys.forEach((key) => {
        if (this.dataToReplace[key] !== null && typeof this.dataToReplace[key] === "object") {
          const nestedKeys = Object.keys(this.dataToReplace[key]);
          nestedKeys.forEach((nestedKey) => {
            keys.push(`${key}.${nestedKey}`);
            this.dataToReplace[`${key}.${nestedKey}`] = this.dataToReplace[key][nestedKey];
          });
        }
      });
      for (const key of keys) {
        const regex = new RegExp(`{${key}}`, "g");
        stringifiedObject = stringifiedObject.replace(regex, this.dataToReplace[key]);
      }
      this.elementsObject = JSON.parse(stringifiedObject);
    }
  };
  var HtmlElementFactory_default = HtmlElementFactory;

  // SimpleHtmlElementPackage/HtmlElementJson.js
  var HtmlToJson = class {
    constructor(selector) {
      if (selector) {
        this.element = document.querySelector(selector);
      }
    }
    setFromHtml(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      this.element = doc.body.firstChild;
      return this;
    }
    // Helper function to extract attributes from an element
    getAttributes(element) {
      const attributes = {};
      for (const attr of element.attributes) {
        attributes[attr.name] = attr.value;
      }
      return attributes;
    }
    getIdentifier(element) {
      if (element.attributes.hasOwnProperty("data-ei")) {
        return element.attributes["data-ei"].value;
      }
      return null;
    }
    // Helper function to create a JSON representation of an element and its children
    elementToJson(element) {
      if (!element) {
        element = this.element;
      }
      const clonedElement = this.cloneElementWithoutChildren(element);
      const json = {
        type: element.tagName.toLowerCase(),
        attributes: this.getAttributes(element),
        content: this.getTextContentWithoutChildren(clonedElement),
        children: []
      };
      const elementIdentifier = this.getIdentifier(element);
      if (elementIdentifier !== null) {
        json.elementIdentificator = elementIdentifier;
      }
      for (const child of element.children) {
        json.children.push(this.elementToJson(child));
      }
      return json;
    }
    // Public method to get the JSON representation of the selected element and its children
    getJson() {
      if (!this.element) {
        return null;
      }
      return this.elementToJson(this.element);
    }
    // Helper function to clone an element and remove its children
    // Helper function to clone an element and remove its children
    cloneElementWithoutChildren(element) {
      return element.cloneNode(true);
    }
    getTextContentWithoutChildren(element) {
      const childTexts = [];
      for (const child of element.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          childTexts.push(child.textContent.trim());
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const clonedChild = child.cloneNode(false);
          childTexts.push(this.getTextContentWithoutChildren(clonedChild));
        }
      }
      return childTexts.filter((text) => text.trim() !== "").join(" ");
    }
  };
  var HtmlElementJson_default = HtmlToJson;

  // SimpleHtmlElementPackage/HtmlElementObjectBuilder.js
  var HtmlElementObjectBuilder = class _HtmlElementObjectBuilder {
    constructor(elementsObject, elementName) {
      this.elementsObject = elementsObject;
      this.elementName = elementName || "element";
      this.paddingSeparator = "	";
    }
    addNewLine() {
      return "\n";
    }
    build() {
      if (this.elementsObject instanceof Object) {
        const elementVariable = this.elementName;
        let elementString = `const ${elementVariable} = new SimpleHtmlElement();${this.addNewLine()}`;
        if (this.elementsObject.hasOwnProperty("identifier")) {
          elementString += `${elementVariable}.setIdentifier('${this.elementsObject.identifier}');${this.addNewLine()}`;
        }
        if (this.elementsObject.hasOwnProperty("type")) {
          elementString += `${elementVariable}.setType('${this.elementsObject.type}');${this.addNewLine()}`;
        }
        if (this.elementsObject.hasOwnProperty("attributes")) {
          const attributeKeys = Object.keys(this.elementsObject.attributes);
          for (const attributeKey of attributeKeys) {
            elementString += `${elementVariable}.setAttribute('${attributeKey}', '${this.elementsObject.attributes[attributeKey]}');${this.addNewLine()}`;
          }
        }
        let childIndex = 0;
        if (this.elementsObject.hasOwnProperty("children")) {
          for (const elementObject of this.elementsObject.children) {
            let child = new _HtmlElementObjectBuilder(elementObject, this.elementName + "_" + childIndex).build();
            const depth = this.elementName.split("_").length - 1;
            const padding = this.paddingSeparator.repeat(depth);
            child = child.split("\n");
            if (child.length > 0) {
              child.forEach((line, index) => {
                child[index] = padding + line;
              });
            }
            child = child.join("\n");
            elementString += child;
            elementString += `${elementVariable}.addElement(${this.elementName + "_" + childIndex});${this.addNewLine()}`;
            childIndex++;
          }
        }
        if (this.elementsObject.hasOwnProperty("content")) {
          if (this.elementsObject.content.trim() !== "") {
            elementString += `${elementVariable}.setContent('${this.elementsObject.content}');${this.addNewLine()}`;
          }
        }
        if (this.elementsObject.hasOwnProperty("text")) {
          elementString += `${elementVariable}.setText('${this.elementsObject.content}');${this.addNewLine()}`;
        }
        if (this.elementsObject.hasOwnProperty("changes")) {
          elementString += `${elementVariable}.setChanges('${this.elementsObject.changes}');${this.addNewLine()}`;
        }
        if (this.elementsObject.hasOwnProperty("changedBy")) {
          elementString += `${elementVariable}.setChangedBy('${this.elementsObject.changedBy}');${this.addNewLine()}`;
        }
        if (this.elementsObject.hasOwnProperty("events")) {
          for (const event in this.elementsObject.events) {
            const eventName = Object.keys(this.elementsObject.events[event])[0];
            elementString += `${elementVariable}.addEvent('${eventName}', () => {${this.addNewLine()}${this.elementsObject.events[event][eventName]}${this.addNewLine()}});${this.addNewLine()}`;
          }
        }
        return elementString;
      }
    }
  };
  var HtmlElementObjectBuilder_default = HtmlElementObjectBuilder;
  return __toCommonJS(library_exports);
})();
window.SimpleHtmlElement = SimpleHtmlLibrary.SimpleHtmlElement; window.ComponentWrapper = SimpleHtmlLibrary.ComponentWrapper; window.HtmlElementObservableVariable = SimpleHtmlLibrary.HtmlElementObservableVariable; window.HtmlElementFactory = SimpleHtmlLibrary.HtmlElementFactory; window.HtmlToJson = SimpleHtmlLibrary.HtmlToJson; window.HtmlElementObjectBuilder = SimpleHtmlLibrary.HtmlElementObjectBuilder;
