import SimpleHtmlElement from "./SimpleHtmlElement.js";

class HtmlElementSearch {
    constructor(baseClass) {
        this.baseClass = baseClass;
    }


    /**
     * Find SimpleHtmlElement with given identifier
     * @param elementIdentifier
     * @returns {SimpleHtmlElement}
     */
    get(elementIdentifier)
    {
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
    find(selector)
    {
        for (const element of this.baseClass.children) {
            if (element.htmlElement.type === selector) {
                return element;
            }
            if (element.children.length > 0) {
                const foundElement = element.find(selector);
                if (foundElement instanceof SimpleHtmlElement && foundElement.htmlElement.type === selector){
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
    findByClass(className)
    {
        className = className.replace('.','');
        for (const element of this.baseClass.children) {
            const elementClass = element.htmlElement.attributes.class ? element.htmlElement.attributes.class.split(' ') : [];
            if (elementClass.includes(className)) {
                return element;
            }
            if (element.children.length > 0) {
                const foundElement = element.findByClass(className);
                const elementClassCh = foundElement.htmlElement.attributes.class ? foundElement.htmlElement.attributes.class.split(' ') : [];
                if (foundElement instanceof SimpleHtmlElement && elementClassCh.includes(className)){
                    return foundElement;
                }
            }
        }
        return this.baseClass;
    }

    findById(id)
    {}

    findByAttribute(attribute)
    {}

}
export default HtmlElementSearch;
