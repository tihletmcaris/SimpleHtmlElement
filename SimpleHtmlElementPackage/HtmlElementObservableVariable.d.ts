export default class HtmlElementObservableVariable {
    get value(): string;
    set value(newValue: string);

    useEvent: boolean;

    setEventName(eventName: string): this;
    addObserver(observer: import('./SimpleHtmlElement').default, callBack: 'setContent' | 'setAttribute', attributeName?: string): this;
    triggerFirstChange(): this;
    notifyObservers(newValue: string): void;
}
