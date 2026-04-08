class HtmlElementDomManipulator
{
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
    get()
    {
        return new Promise((resolve, reject) => {
            this.baseClass.isElementDrawn().then(() => {
                const element = document.querySelector(
                    `[${this.baseClass.getElementDataAttributeName()}='${this.baseClass.getIdentifier()}']`
                );
                if (element) {
                    resolve(element);
                } else {
                    //console.error("Element not found in DOM!", this.baseClass.getIdentifier());
                    //reject(null);
                }
            });
        });
    }

    /**
     * Redraw element in DOM
     */
    redraw()
    {
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
    setAttributes(attributes)
    {
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
    setAttribute(attribute, value)
    {
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
    removeAttribute(attribute)
    {
        this.get().then((element) => {
            element.removeAttribute(attribute);
        });
    }

    /**
     * Toggle DOM element attribute
     * @param attribute {string}
     * @param value {*}
     */
    toggleAttribute(attribute, value)
    {
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
    addClass(className)
    {
        this.get().then((element) => {
            className.split(' ').forEach((className) => {
                if (className !== '') {
                    element.classList.add(className);
                }
            });
        });
    }

    /**
     * Set DOM element class
     * @param className {string}
     */
    setClass(className)
    {
        this.get().then((element) => {
            element.setAttribute("class", className);
        });
    }

    /**
     * Remove DOM element class
     * @param className {string}
     */
    removeClass(className)
    {
        this.get().then((element) => {
            className.split(' ').forEach((className) => {
                if (className !== '') {
                    element.classList.remove(className);
                }
            });
        });
    }

    /**
     * Toggle DOM element class
     * @param className {string}
     */
    toggleClass(className)
    {
        this.get().then((element) => {
            element.classList.toggle(className);
        });
    }

    /**
     * Remove DOM element
     */
    remove()
    {
        this.get().then((element) => {
            element.remove();
        });
    }

    /**
     * Clear DOM element content (inner HTML)
     */
    clear()
    {
        this.get().then((element) => {
            element.innerHTML = '';
        });
    }

    /**
     * Append style element to head
     * @param styles
     */
    insertStyles(styles) {
        const elementIdentifier = this.baseClass.getIdentifier();
        //insert styles into head
        const style = document.createElement('style');
        style.innerHTML = styles;
        style.setAttribute('data-ei-style', elementIdentifier);
        document.head.appendChild(style);
    }

    /**
     * Remove style element from head
     */
    removeStyles() {
        const elementIdentifier = this.baseClass.getIdentifier();
        //remove styles from head
        const style = document.querySelector(`style[data-ei-style="${elementIdentifier}"]`);
        if (style) {
            style.remove();
        }
    }

}

export default HtmlElementDomManipulator;
