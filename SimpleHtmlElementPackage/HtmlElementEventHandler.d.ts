export default class HtmlElementEventHandler {
    readonly events: Record<string, () => void>;

    addEvent(eventName: string, callback: (...args: any[]) => void): this;
    removeEvent(eventName: string): this;
    triggerEvent(eventName: string): this;
    attach(element: HTMLElement): this;
    attachSingle(element: HTMLElement, eventName: string, callback: (...args: any[]) => void): this;
}
