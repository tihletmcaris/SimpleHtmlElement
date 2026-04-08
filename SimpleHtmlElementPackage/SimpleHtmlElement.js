import HtmlElement from "./HtmlElement.js";
import HtmlElementSearch from "./HtmlElementSearch.js";
import HtmlElementDomManipulator from "./HtmlElementDomManipulator.js";
import HtmlElementVariableReplacer from "./HtmlElementVariableReplacer.js";
import HtmlElementChangeDetector from "./HtmlElementChangeDetector.js";
import HtmlElementDrawer from "./HtmlElementDrawer.js";
import HtmlElementEventHandler from "./HtmlElementEventHandler.js";
import HtmlLoaderHandler from "./HtmlLoaderHandler.js";
import HtmlElementCss from "./HtmlElementCss.js";
import HtmlElementDynamicScriptLoader from "./HtmlElementDynamicScriptLoader.js";
import HtmlElementStyle from "./HtmlElementStyle.js";

class SimpleHtmlElement
{

    /**
     * Constructor
     */
    constructor()
    {
        this.parent = null;
        this.children = [];
        this.contentChildren = []; // children made from content if variables are present children are split into spans
        this.parentElementTreeIndex = null;
        this.elementDrawn = false;
        this.elementDataAttributeName = 'data-ei';
        this.skipSlashForEmptyTags = true;
        this.contentVariableChangeDetectorInterval = 300;
        this.isLoading = false;

        // separate concerns
        this.htmlElement = new HtmlElement(this);
        this.search = new HtmlElementSearch(this);
        this.domManipulator = new HtmlElementDomManipulator(this);
        this.variableReplacer = new HtmlElementVariableReplacer(this);
        this.elementDrawer = new HtmlElementDrawer(this);
        this.eventHandler = null;
        this.loaderHandler = null;
        this.css = null;
        this.style = null;
        this.dynamicScriptLoader = null;

        // dynamic only if content has a variable
        this.contentVariableChangeDetector = null;
        this.attributesVariableChangeDetectors = [];

        this.parentComponent = null;
    }

    /**
     * Set a component wrapper component that contains this element
     * @param componentWrapper {ComponentWrapper}
     * @returns {SimpleHtmlElement}
     */
    setParentComponent(componentWrapper)
    {
        this.parentComponent = componentWrapper;
        return this;
    }

    getParentComponent()
    {
        return this.parentComponent;
    }


    /**
     * Wait for element to be supposedly drawn in DOM
     * @returns {Promise<boolean>}
     */
    isElementDrawn()
    {
        return new Promise(resolve => {
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
    waitForElementToBeDrawn()
    {
        return this.isElementDrawn();
    }


    /**
     * Redraw element in DOM
     * @returns {SimpleHtmlElement}
     */
    redraw()
    {
        this.removeStyles();
        this.domManipulator.redraw();
        this.insertStyles();
        return this;
    }

    /**
     * Deprecated - Redraw element in DOM
     * @returns {SimpleHtmlElement}
     */
    redrawInPlace()
    {
        return this.redraw();
    }

    /**
     * GetElementSelector
     * @returns {string}
     */
    getElementDataAttributeName()
    {
        return this.elementDataAttributeName;
    }

    /**
     * Get DOM element
     * @returns {Promise<*>}
     */
    getDomElement()
    {
        return this.domManipulator.get();
    }


    /**
     * Set parent element
     * @param parent {SimpleHtmlElement}
     * @returns {SimpleHtmlElement}
     */
    setParent(parent)
    {
        this.parent = parent;
        return this;
    }

    /**
     * Set parent element tree index
     * @param parentElementTreeIndex {number}
     * @returns {SimpleHtmlElement}
     */
    setParentElementTreeIndex(parentElementTreeIndex)
    {
        this.parentElementTreeIndex = parentElementTreeIndex;
        return this;
    }


    /**
     * Get current html element identifier
     * @returns {string}
     */
    getIdentifier()
    {
        return this.htmlElement.getIdentifier();
    }

    /**
     * Deprecated - Get current html element identifier
     * @returns {string}
     */
    getIdentificator()
    {
        return this.getIdentifier();
    }

    /**
     * Set html element identifier
     * @param identifier {string}
     * @returns {SimpleHtmlElement}
     */
    setIdentifier(identifier)
    {
        this.htmlElement.setIdentifier(identifier);
        return this;
    }

    /**
     * Deprecated - Set html element identifier
     * @param identifier {string}
     * @returns {SimpleHtmlElement}
     */
    setIdentificator(identifier)
    {
        return this.setIdentifier(identifier);
    }

    /**
     * Get SimpleHtmlElement by given identificator
     * @param elementIdentifier {string | undefined}
     * @returns {SimpleHtmlElement}
     */
    get(elementIdentifier = undefined)
    {
        if (elementIdentifier === undefined) {
            return this;
        }
        return this.search.get(elementIdentifier);
    }

    /**
     * Find SimpleHtmlElement by given selector (element.type)
     * @param selector {string}
     * @returns {SimpleHtmlElement}
     */
    find(selector)
    {
        return this.search.find(selector);
    }

    /**
     * Find SimpleHtmlElement by given class
     * @param className
     * @returns {*|SimpleHtmlElement}
     */
    findByClass(className)
    {
        return this.search.findByClass(className);
    }

    /**
     * Clear element of all it's children
     */
    clear()
    {
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
    remove()
    {
        if (this.elementDrawn === true) {
           this.domManipulator.remove();
        }
        if (this.parent !== null) {
            return this.parent.removeChild(this.parentElementTreeIndex);
        }
        return this;
    }

    removeChild(childIndex)
    {
        this.children.splice(childIndex, 1);
        return this;
    }

    /**
     * Set element to be self closing (e.g. <img />)
     * @returns {SimpleHtmlElement}
     */
    selfClose()
    {
        return this.setSelfClosing();
    }

    /**
     * Alias for selfClose
     * Set element to be self closing (e.g. <img />)
     * @returns {SimpleHtmlElement}
     */
    setSelfClosing()
    {
        this.htmlElement.setSelfClosing();
        return this;
    }

    disableSelfClosing()
    {
        return this.htmlElement.unsetSelfClosing();
    }

    /**
     * Create HTML string from element
     * @returns {string}
     */
    html()
    {
        this.attachEvents();
        return this.htmlElement.html();
    }

    json()
    {
        this.attachEvents();
        return this.htmlElement.json();
    }

    /**
     * Add class to element
     * @param className {string}
     * @returns {SimpleHtmlElement}
     */
    addClass(className)
    {
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
    setClass(className)
    {
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
    getClass()
    {
        return this.htmlElement.getClass();
    }

    /**
     * Remove class from element
     * @param className {string}
     * @returns {SimpleHtmlElement}
     */
    removeClass(className)
    {
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
    hasClass(className)
    {
        return this.htmlElement.hasClass(className);
    }

    /**
     * Toggle class on element
     * @param className
     * @returns {SimpleHtmlElement}
     */
    toggleClass(className)
    {
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
    setAttribute(attribute, value, safeValue = false)
    {
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
    removeAttribute(attribute)
    {
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
    toggleAttribute(attribute, value)
    {
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
    hide()
    {
        this.addClass('d-none');
        return this;
    }

    /**
     * Show element (using bootstrap utility class d-none)
     * @returns {SimpleHtmlElement}
     */
    show()
    {
        this.removeClass('d-none');
        return this;
    }


    /**
     * Check if element has attribute
     * @param attribute
     * @returns {*}
     */
    hasAttribute(attribute)
    {
        return this.htmlElement.hasAttribute(attribute);
    }

    /**
     * Get attribute from element
     * @param attribute
     * @returns {*|null}
     */
    getAttribute(attribute)
    {
        return this.htmlElement.getAttribute(attribute);
    }

    /**
     * Set attributes on element
     * @param attributes
     * @returns {SimpleHtmlElement}
     */
    setAttributes(attributes)
    {
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
    setType(type)
    {
        this.htmlElement.setType(type);
        this.somethingChanged();
        return this;
    }

    getType()
    {
        return this.htmlElement.type;
    }

    /**
     * Set content of element
     * @param beforeContent
     * @returns {*}
     */
    addChild(beforeContent = false, index = null)
    {
        if (this.isLoading === true) {
            this.unsetIsLoading();
        }
        return this.htmlElement.addChild(beforeContent, index);
    }

    setChildren(children)
    {
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
    addChildLive(beforeContent = false)
    {
        const element = this.createElement();
        element.beforeContent = beforeContent;
        element.setParent(this);
        return element;
    }

    /**
     * Finish child live add
     * @returns {SimpleHtmlElement}
     */
    finishChild()
    {
        this.parent.addElement(this, this.beforeContent);
        return this;
    }

    /**
     * Add element to element
     * @param element
     * @param beforeContent
     * @returns {*}
     */
    addElement(element, beforeContent = false)
    {
        if (element === null) {
            return this;
        }
        if (this.isLoading === true) {
            this.unsetIsLoading();
        }
        try {
            if (!(element instanceof SimpleHtmlElement)) {
                throw new Error("Element must be instance of SimpleHtmlElement");
            }
        } catch (error) {
            console.error(error);
            console.error(element);
        }
        return this.htmlElement.addElement(element, beforeContent);
    }

    addElementAtIndex(element, index, beforeContent = false)
    {
        try {
            if (!(element instanceof SimpleHtmlElement)) {
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
    getLastElement()
    {
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
    getLastElementIndex()
    {
        return this.children.length - 1;
    }

    /**
     * Create new child element
     * @param element {SimpleHtmlElement}
     * @param index {number}
     * @returns {*}
     */
    createChild(element, index = null)
    {
        if (element === undefined) {
            element = this.createElement();
        }
        if (index === null) {
            this.children.push(element);
            return this.getLastElement()
                .setParentElementTreeIndex(this.getLastElementIndex())
                .setParent(this);
        } else {
            this.children.splice(index, 0, element);
            return this.children[index]
                .setParentElementTreeIndex(index)
                .setParent(this);
        }
    }


    /**
     * Create new SimpleHtmlElement
     * @returns {SimpleHtmlElement}
     */
    createElement()
    {
        return new SimpleHtmlElement();
    }

    /**
     * Something changed to be triggered when some change that needs to be reflected in DOM happens
     */
    somethingChanged()
    {
        if (this.elementDrawn === true) {
            this.redraw();
        }
    }

    /**
     * Get count of children elements
     * @returns {number}
     */
    getChildrenCount()
    {
        return this.children.length;
    }

    /**
     * getChildren elements
     * @returns {*}
     */
    getChildren()
    {
        return this.children;
    }

    /**
     * Get content children elements
     * @returns {*}
     */
    getContentChildren()
    {
        return this.contentChildren;
    }

    /**
     * Get count of content children elements
     * @returns {number}
     */
    getContentChildrenCount()
    {
        return this.contentChildren.length;
    }

    /**
     * Add content to element
     * @param content {string}
     * @param contentChild {boolean}
     * @returns {SimpleHtmlElement}
     */
    setContent(content, contentChild = false)
    {
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
    setText(content, contentChild = false)
    {
        return this.setContent(content, contentChild);
    }

    /**
     * Get content of element
     * @returns {string}
     */
    getContent()
    {
        return this.htmlElement.getContent();
    }



    /**
     * Add content to element += (append)
     * @param content {string}
     * @returns {SimpleHtmlElement}
     */
    addContent(content)
    {
        this.handleContentVariables(this.htmlElement.addContent(content).getContent());
        return this;
    }


    /**
     * Add content to element as a child (used with detected variables)
     * @param content
     * @param isVariable
     * @returns {SimpleHtmlElement}
     */
    addContentChild(content, isVariable = false)
    {
        const element = this.createElement().setType('span').setContent(content, true);
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
    handleContentVariables(content)
    {
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
    handleAttributeVariable(attribute, value)
    {
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
    attachAttributeVariableChangeDetector(attributeName, variableName)
    {
        const changeDetector = new HtmlElementChangeDetector(this)
            .setAttribute(attributeName)
            .setChangeDetectorInterval(this.contentVariableChangeDetectorInterval)
            .setVariable(variableName);
        this.attributesVariableChangeDetectors.push(changeDetector);
        return this;
    }


    /**
     * Attach content variable change detector
     * @param variableName
     * @returns {SimpleHtmlElement}
     */
    attachContentVariableChangeDetector(variableName)
    {
        this.contentVariableChangeDetector = new HtmlElementChangeDetector(this)
            .setChangeDetectorInterval(this.contentVariableChangeDetectorInterval)
            .setVariable(variableName);
        return this;
    }

    /**
     * Attach element to element (replaces content)
     * @param element
     * @returns {SimpleHtmlElement}
     */
    attach(element)
    {
        this.insertStyles();
        this.elementDrawer.attach(element);
        return this;
    }

    /**
     * Append element to element
     * @param element
     * @returns {SimpleHtmlElement}
     */
    append(element)
    {
        this.insertStyles();
        this.elementDrawer.append(element);
        return this;
    }

    /**
     * Prepend element to element
     * @param element
     * @returns {SimpleHtmlElement}
     */
    prependTo(element)
    {
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
    addEvent(event, callback)
    {
        if (this.eventHandler === null) {
            this.eventHandler = new HtmlElementEventHandler(this);
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
    attachEvents()
    {
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
    removeEvent(event)
    {
        if (this.eventHandler === null) {
            console.error('No events to remove', this);
            return;
        }
        this.eventHandler.removeEvent(event);
        return this;
    }

    /**
     * Trigger event on element
     * @param event
     */
    triggerEvent(event)
    {
        if (this.eventHandler === null) {
            console.error('No events to trigger', this);
            return;
        }
        this.eventHandler.triggerEvent(event);
        return this;
    }


    /**
     * Set element to be loading
     * @returns {SimpleHtmlElement}
     */
    setIsLoading()
    {
        if (this.loaderHandler === null) {
            this.loaderHandler = new HtmlLoaderHandler(this);
        }
        this.loaderHandler.setLoading();
        this.isLoading = true;
        return this;
    }

    /**
     * Unset element to be loading
     * @returns {SimpleHtmlElement|boolean}
     */
    unsetIsLoading()
    {
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
    setCss(css)
    {
        if (this.css === null) {
            this.css = new HtmlElementCss(this);
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
    addCss(css)
    {
        if (this.css === null) {
            this.css = new HtmlElementCss(this);
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
    setCssString(cssString)
    {
        if (this.css === null) {
            this.css = new HtmlElementCss(this);
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
    removeStyles()
    {
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
    insertStyles()
    {
        if (this.css === null) {
            return false;
        }
        this.domManipulator.insertStyles(this.css.getCss());
        return this;
    }

    loadScript(url)
    {
        if (this.dynamicScriptLoader === null) {
            this.dynamicScriptLoader = new HtmlElementDynamicScriptLoader(this);
        }
        this.dynamicScriptLoader.loadScript(url);
        return this;
    }


    /**
     * Execute script that was previously loaded
     * @returns {SimpleHtmlElement}

     * */
    executeScript()
    {
        this.dynamicScriptLoader.canExecute().then(() => {
            this.dynamicScriptLoader.execute();
        });
        return this;
    }

    addStyle(stylePropertyName, stylePropertyValue)
    {
        if (this.style === null) {
            this.style = new HtmlElementStyle(this);
        }
        this.style.addStyle(stylePropertyName, stylePropertyValue);
        return this;
    }

    clearStyles()
    {
        if (this.style === null) {
            this.style = new HtmlElementStyle(this);
        }
        this.style.clear();
        return this;
    }

    removeStyle(stylePropertyName)
    {
        if (this.style === null) {
            this.style = new HtmlElementStyle(this);
        }
        this.style.removeStyle(stylePropertyName);
        return this;
    }
}
export default SimpleHtmlElement;