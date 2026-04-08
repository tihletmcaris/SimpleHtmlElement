import SimpleHtmlElement from './SimpleHtmlElement';

export interface ElementDefinition {
    type?: string;
    identifier?: string;
    /** @deprecated use identifier */
    identificator?: string;
    attributes?: Record<string, string>;
    content?: string;
    text?: string;
    createOnEmpty?: boolean;
    children?: ElementDefinition[];
    events?: Array<Record<string, (...args: any[]) => void>>;
    changes?: string;
    changedBy?: string;
}

export default class HtmlElementFactory {
    constructor(elementsObject: ElementDefinition, dataToReplace?: Record<string, any> | null);
    build(): SimpleHtmlElement | null;
}
