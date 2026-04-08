class HtmlToJson
{
    constructor(selector)
    {
        if (selector) {
            this.element = document.querySelector(selector);
        }
    }

    setFromHtml(html)
    {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        this.element = doc.body.firstChild;
        return this;
    }

    // Helper function to extract attributes from an element
    getAttributes(element)
    {
        const attributes = {};
        for (const attr of element.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    }

    getIdentifier(element)
    {
        if (element.attributes.hasOwnProperty("data-ei")) {
            return element.attributes["data-ei"].value;
        }
        return null;
    }

    // Helper function to create a JSON representation of an element and its children
    elementToJson(element)
    {
        if (!element) {
            element = this.element;
        }
        const clonedElement = this.cloneElementWithoutChildren(element);
        const json = {
            type: element.tagName.toLowerCase(),
            attributes: this.getAttributes(element),
            content: this.getTextContentWithoutChildren(clonedElement),
            children: [],
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
    getJson()
    {
        if (!this.element) {
            return null; // If no element found, return null
        }

        return this.elementToJson(this.element);
    }

    // Helper function to clone an element and remove its children
    // Helper function to clone an element and remove its children
    cloneElementWithoutChildren(element)
    {
        return element.cloneNode(true); // Clone without children
    }

    getTextContentWithoutChildren(element)
    {
        const childTexts = [];

        for (const child of element.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                // For text nodes, add the text content to the array
                childTexts.push(child.textContent.trim());
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                // For element nodes, clone the child element and remove its children
                const clonedChild = child.cloneNode(false);
                childTexts.push(this.getTextContentWithoutChildren(clonedChild));
            }
        }
        //remove empty strings from childtexts
        return childTexts.filter((text) => text.trim() !== "").join(" ");
    }
}

export default HtmlToJson;