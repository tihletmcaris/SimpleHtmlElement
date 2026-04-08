export default class HtmlElementStyle {
    addStyle(stylePropertyName: string, stylePropertyValue: string): this;
    removeStyle(stylePropertyName: string): this;
    clear(): this;
    apply(): this;
}
