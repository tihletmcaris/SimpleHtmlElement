import { ElementDefinition } from './HtmlElementFactory';

export default class HtmlToJson {
    constructor(selector?: string);
    setFromHtml(html: string): this;
    getJson(): ElementDefinition | null;
    elementToJson(element?: Element): ElementDefinition;
}
