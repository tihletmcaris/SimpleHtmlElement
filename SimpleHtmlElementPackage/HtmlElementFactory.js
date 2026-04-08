import SimpleHtmlElement from './SimpleHtmlElement.js';
class HtmlElementFactory
{
    constructor(elementsObject, dataToReplace = null) {
        this.elementsObject = elementsObject;
        this.dataToReplace = dataToReplace;
    }

    build()
    {
        if (this.elementsObject instanceof Object) {
            if (this.dataToReplace !== null) {
                this.replaceData();
            }
            let elementIsEmpty = true;
            const createOnEmpty = this.elementsObject.hasOwnProperty('createOnEmpty') ? this.elementsObject.createOnEmpty : true;

            const element = new SimpleHtmlElement();
            //check if class exists of elementType

            if (this.elementsObject.hasOwnProperty('type')) {
                element.setType(this.elementsObject.type);
            }
            if (this.elementsObject.hasOwnProperty('attributes')) {
                element.setAttributes(this.elementsObject.attributes);
            }

            if (this.elementsObject.hasOwnProperty('children')) {
                for (const elementObject of this.elementsObject.children) {
                    const child = new HtmlElementFactory(elementObject).build();
                    if (child !== null) {
                        element.addElement(child);
                        elementIsEmpty = false;
                    }
                }
            }
            if (this.elementsObject.hasOwnProperty('identifier')) {
                element.setIdentifier(this.elementsObject.identifier);
            }
            if (this.elementsObject.hasOwnProperty('identificator')) {
                element.setIdentifier(this.elementsObject.identificator);
            }

            if (this.elementsObject.hasOwnProperty('content')) {
                if (this.elementsObject.content !== '') {
                    elementIsEmpty = false;
                }
                element.setContent(this.elementsObject.content);
            }

            if (this.elementsObject.hasOwnProperty('text')) {
                if (this.elementsObject.text !== '') {
                    elementIsEmpty = false;
                }
                element.setText(this.elementsObject.content);
            }

            if (this.elementsObject.hasOwnProperty('changes')) {
                element.setChanges(this.elementsObject.changes);
            }
            if (this.elementsObject.hasOwnProperty('changedBy')) {
                element.setChangedBy(this.elementsObject.changedBy);
            }

            if (this.elementsObject.hasOwnProperty('events')) {
                for (const event in this.elementsObject.events) {
                    const eventName = Object.keys(this.elementsObject.events[event])[0];
                    element.addEvent(eventName, this.elementsObject.events[event][eventName]);
                }
            }
            return (elementIsEmpty && createOnEmpty === false) ? null : element;
        }
    }

    replaceData()
    {
        let stringifiedObject = JSON.stringify(this.elementsObject);
        const keys = Object.keys(this.dataToReplace);
        //check if this.dataToReplace has objects, if yes, create add to keys with .noteation
        keys.forEach((key) => {
            if (this.dataToReplace[key] !== null && typeof this.dataToReplace[key] === 'object') {
                const nestedKeys = Object.keys(this.dataToReplace[key]);
                nestedKeys.forEach((nestedKey) => {
                    keys.push(`${key}.${nestedKey}`);
                    this.dataToReplace[`${key}.${nestedKey}`] = this.dataToReplace[key][nestedKey];
                });
            }
        });
        for (const key of keys) {
            const regex = new RegExp(`{${key}}`, 'g');
            stringifiedObject = stringifiedObject.replace(regex, this.dataToReplace[key]);
        }
        this.elementsObject = JSON.parse(stringifiedObject);
    }
}

export default HtmlElementFactory;