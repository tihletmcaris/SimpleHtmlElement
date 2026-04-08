import { ElementDefinition } from './HtmlElementFactory';

export default class HtmlElementObjectBuilder {
    constructor(elementsObject: ElementDefinition, elementName?: string);
    /** Returns JavaScript source code that recreates the element tree. */
    build(): string;
}
