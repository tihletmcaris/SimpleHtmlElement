class HtmlElementObjectBuilder
{
    constructor(elementsObject, elementName) {
        this.elementsObject = elementsObject;
        this.elementName = elementName || "element";
        this.paddingSeparator = "\t";
    }

    addNewLine()
    {
        return "\n";
    }
    build()
    {
        if (this.elementsObject instanceof Object) {
            const elementVariable = this.elementName;
			let elementString = `const ${elementVariable} = new SimpleHtmlElement();${this.addNewLine()}`;

            if (this.elementsObject.hasOwnProperty('identifier')) {
                elementString += `${elementVariable}.setIdentifier('${this.elementsObject.identifier}');${this.addNewLine()}`;
            }

            if (this.elementsObject.hasOwnProperty('type')) {
                elementString += `${elementVariable}.setType('${this.elementsObject.type}');${this.addNewLine()}`;
            }
            if (this.elementsObject.hasOwnProperty('attributes')) {
                const attributeKeys = Object.keys(this.elementsObject.attributes);
                for (const attributeKey of attributeKeys) {
                    elementString += `${elementVariable}.setAttribute('${attributeKey}', '${this.elementsObject.attributes[attributeKey]}');${this.addNewLine()}`;
                }
            }

            let childIndex = 0;
            if (this.elementsObject.hasOwnProperty('children')) {
                for (const elementObject of this.elementsObject.children) {
                    let child = new HtmlElementObjectBuilder(elementObject, this.elementName + "_" + childIndex).build();

                    //based on number of _ in elementName, we can determine the depth of the element and add split lines of child and add space padding
                    //detect number of _ in elementName

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


            if (this.elementsObject.hasOwnProperty('content')) {
                if (this.elementsObject.content.trim() !== "") {
                    elementString += `${elementVariable}.setContent('${this.elementsObject.content}');${this.addNewLine()}`;
                }
            }

            if (this.elementsObject.hasOwnProperty('text')) {
                elementString += `${elementVariable}.setText('${this.elementsObject.content}');${this.addNewLine()}`;
            }


            if (this.elementsObject.hasOwnProperty('changes')) {
                elementString += `${elementVariable}.setChanges('${this.elementsObject.changes}');${this.addNewLine()}`;
            }
            if (this.elementsObject.hasOwnProperty('changedBy')) {
                elementString += `${elementVariable}.setChangedBy('${this.elementsObject.changedBy}');${this.addNewLine()}`;
            }

            if (this.elementsObject.hasOwnProperty('events')) {
                for (const event in this.elementsObject.events) {
                    const eventName = Object.keys(this.elementsObject.events[event])[0];
                    //element.addEvent(eventName, this.elementsObject.events[event][eventName]);
                    elementString += `${elementVariable}.addEvent('${eventName}', () => {${this.addNewLine()}${this.elementsObject.events[event][eventName]}${this.addNewLine()}});${this.addNewLine()}`;
                }
            }


            return elementString;
        }
    }
}

export default HtmlElementObjectBuilder;