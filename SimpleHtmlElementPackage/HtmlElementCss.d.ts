export interface CssDefinition {
    [selector: string]: {
        [property: string]: string;
    };
}

export default class HtmlElementCss {
    addCss(cssObject: CssDefinition): this;
    setCss(css: CssDefinition): this;
    setCssString(cssString: string): this;
    getCss(): string;
    getCssString(): string;
}
