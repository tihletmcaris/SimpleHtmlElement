export default class HtmlElementDomManipulator {
    get(): Promise<HTMLElement>;
    redraw(): void;
    setAttribute(attribute: string, value: string | null): void;
    setAttributes(attributes: Record<string, string>): void;
    removeAttribute(attribute: string): void;
    toggleAttribute(attribute: string, value: string): void;
    addClass(className: string): void;
    setClass(className: string): void;
    removeClass(className: string): void;
    toggleClass(className: string): void;
    remove(): void;
    clear(): void;
    insertStyles(styles: string): void;
    removeStyles(): void;
}
