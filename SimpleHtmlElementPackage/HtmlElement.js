import HtmlElementEmptyTags from "./HtmlElementEmptyTags.js";

class HtmlElement
{
    constructor(baseClass)
    {
        this.baseClass = baseClass;
        this.type = 'div';
        this.selfClosing = false;
        this.attributes = {};
        this.content = '';
        this.temporaryContent = '';
        this.beforeContent = false;
        this.identifier = this.generateUniqueId();
    }


    setType(type)
    {
        this.type = type;
        return this;
    }

    /**
     * Generate unique identifier for element attribute [data-ei]
     * @returns {string}
     */
    generateUniqueId()
    {
        return this.baseClass.constructor.name + "-" + Math.random().toString(36).slice(2, 9);
    }

    /**
     * Return element identifier
     * @returns {string}
     */
    getIdentifier()
    {
        return this.identifier;
    }

    /**
     * Set element identifier
     * @param identifier
     * @returns {HtmlElement}
     */
    setIdentifier(identifier)
    {
        this.identifier = identifier;
        return this;
    }

    /**
     * Toggle html attribute
     * @param attribute {string}
     * @param value {*}
     * @returns {HtmlElement}
     */
    toggleAttribute(attribute, value)
    {
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
    hasAttribute(attribute)
    {
        return this.attributes[attribute] !== undefined;
    }

    /**
     * Set element attributes
     * @param attributes
     */
    setAttributes(attributes)
    {
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
    addElement(element, beforeContent = false)
    {

        element.beforeContent = beforeContent;
        this.createElement(element, beforeContent);
        if (this.baseClass.elementDrawn === true) {
            const canNotInsertBlockElement = ['p', 'span', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            if (canNotInsertBlockElement.includes(this.type)) {
                element.setType('span');
            }
            this.somethingChanged();
        }
        return element;
    }


    addElementAtIndex(element, index, beforeContent = false)
    {
        element.beforeContent = beforeContent;
        this.createElement(element, false, index);
        if (this.baseClass.elementDrawn === true) {
            const canNotInsertBlockElement = ['p', 'span', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            if (canNotInsertBlockElement.includes(this.type)) {
                element.setType('span');
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
    createElement(element, beforeContent = false, index = null)
    {
        element.beforeContent = beforeContent;
        return this.baseClass.createChild(element, index);
    }

    /**
     * Trigger something changed event to redraw element
     */
    somethingChanged()
    {
        this.baseClass.somethingChanged();
    }

    /**
     * Add new element to children array
     * @param beforeContent
     * @returns {*}
     */
    addChild(beforeContent = false, index = null)
    {
        const element = this.createElement(this.baseClass.createElement(), beforeContent, index);
        if (this.baseClass.elementDrawn === true) {
            const canNotInsertBlockElement = ['p', 'span', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            if (canNotInsertBlockElement.includes(this.type)) {
                element.setType('span');
            }
            this.somethingChanged();
        }
        return element;
    }

    setChildren(children)
    {
        this.baseClass.children = children;
        if (this.baseClass.elementDrawn === true) {
            this.somethingChanged();
        }
    }

    setAttribute(attribute, value = null)
    {
        this.attributes[attribute] = value
        return this;
    }

    /**
     * Remove element attribute
     * @param attribute {string}
     * @returns {HtmlElement}
     */
    removeAttribute(attribute)
    {
        if (this.attributes[attribute] !== undefined) {
            delete this.attributes[attribute];
        }
        return this;
    }

    /**
     * Add attributes to element
     * @param attributes {object}
     * @returns {HtmlElement}
     */
    addAttributes(attributes)
    {
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
    addToAttribute_bak(attribute, value = null, separator = " ")
    {
        if (typeof this.attributes[attribute] === "undefined" ||
            this.attributes[attribute] === null ||
            this.attributes[attribute] === "" ||
            this.attributes[attribute] === undefined) {
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
        if (value == null) return this;

        const attr = attribute === "className" ? "class" : attribute;
        const rawCurrent = this.attributes[attr] ?? "";

        // Normalizuj přidanou hodnotu
        const val = String(value).trim();
        if (!val) return this;

        // Speciální zacházení pro class & style
        if (attr === "class") {
            // Rozpad na whitespace (mezery, taby, NBSP, nové řádky)
            const parts = rawCurrent
                .trim()
                .split(/\s+/u)
                .filter(Boolean);

            if (!parts.includes(val)) {
                parts.push(val);
            }
            return this.setAttribute("class", parts.join(" "));
        }

        if (attr === "style") {
            const map = Object.create(null);
            rawCurrent.split(";").forEach(rule => {
                const [k, v] = rule.split(":");
                if (!k || v == null) return;
                map[k.trim().toLowerCase()] = v.trim();
            });

            const [kNew, vNew] = val.split(":");
            if (!kNew || vNew == null) return this;
            map[kNew.trim().toLowerCase()] = vNew.trim();

            const styleStr = Object.entries(map)
                .map(([k, v]) => `${k}: ${v}`)
                .join("; ");
            return this.setAttribute("style", styleStr);
        }

        const parts = rawCurrent
            .split(separator)
            .map(s => s.trim())
            .filter(Boolean);

        if (!parts.includes(val)) {
            parts.push(val);
        }
        return this.setAttribute(attr, parts.join(separator));
    }

    addToAttribute_inline(attribute, value = null, separator = " ") {if (value == null) return this;const attr = attribute === "className" ? "class" : attribute;const rawCurrent = this.attributes[attr] ?? "";const val = String(value).trim();if (!val) return this;if (attr === "class") {const parts = rawCurrent.trim().split(/\s+/u).filter(Boolean);if (!parts.includes(val)) {parts.push(val);}return this.setAttribute("class", parts.join(" "));}if (attr === "style") {const map = Object.create(null);rawCurrent.split(";").forEach(rule => {const [k, v] = rule.split(":");if (!k || v == null) return;map[k.trim().toLowerCase()] = v.trim();});const [kNew, vNew] = val.split(":");if (!kNew || vNew == null) return this;map[kNew.trim().toLowerCase()] = vNew.trim();const styleStr = Object.entries(map).map(([k, v]) => `${k}: ${v}`).join("; ");return this.setAttribute("style", styleStr);}const parts = rawCurrent.split(separator).map(s => s.trim()).filter(Boolean);if (!parts.includes(val)) {parts.push(val);}return this.setAttribute(attr, parts.join(separator));}

    /**
     * Add class to element
     * @param className
     * @returns {HtmlElement}
     */
    addClass(className)
    {
        this.addToAttribute("class", ` ${className}`);
        return this;
    }

    /**
     * Set element class
     * @param className
     * @returns {HtmlElement}
     */
    setClass(className)
    {
        this.setAttribute("class", className);
        return this;
    }

    /**
     * Get element class
     * @returns {string|null}
     */
    getClass()
    {
        return this.getAttribute("class");
    }

    /**
     * Check if element has class
     * @param className
     * @returns {boolean}
     */
    hasClass(className)
    {
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
    removeClass(className)
    {
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
    toggleClass(className)
    {
        if (this.attributes["class"] !== undefined) {
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
    getAttribute(attribute)
    {
        return this.attributes[attribute] || null;
    }

    /**
     * Create element identifier
     */
    createIdentifier()
    {
        if (this.getIdentifier() !== null) {
            this.setAttribute(this.baseClass.elementDataAttributeName, this.getIdentifier());
        }
    }

    /**
     * Create element html
     * @returns {string}
     */
    html()
    {
        this.baseClass.elementDrawn = false;
        let html = '';
        let beforeContent = '';
        let afterContent = '';

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
    json()
    {
        const objectToJsonize = {
            type: this.type,
            selfClosing: this.selfClosing,
            attributes: this.attributes,
            content: this.content,
            beforeContent: this.beforeContent,
            identifier: this.identifier
        }
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
    create(content = '')
    {
        if (typeof content === "undefined" || content === "") {
            content = this.content;
        }
        if (this.selfClosing === true || new HtmlElementEmptyTags().check(this.type)) {
            const slash = this.baseClass.skipSlashForEmptyTags === true ? '' : ' /';
            return `<${this.type}${this.createAttributes()}${slash}>`;
        } else {
            return `<${this.type}${this.createAttributes()}>${content}</${this.type}>`;
        }
    }

    /**
     * Create element content
     * @returns {string}
     */
    createContent()
    {
        const contentChildren = this.baseClass.getContentChildren();
        if (contentChildren.length > 0) {
            let content = '';
            for (const element of contentChildren) {
                content += element.html();
            }
            return content;
        }
        return this.content;
    }

    getContent()
    {
        return this.content;
    }


    /**
     * Create element attributes
     * @returns {string}
     */
    createAttributes()
    {
        if (Object.keys(this.attributes).length === 0) {
            return '';
        }

        const attributes = [' '];
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
    setSelfClosing()
    {
        this.selfClosing = true;
        return this;
    }

    unsetSelfClosing()
    {
        this.selfClosing = false;
        return this;
    }

    /**
     * Set element content
     * @param content {string}
     * @returns {HtmlElement}
     */
    setContent(content) {
        if (content === null || content === undefined || content === 'null') {
            this.content = '';
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
    addContent(content)
    {
        this.content += content;
        return this;
    }

}
export default HtmlElement;