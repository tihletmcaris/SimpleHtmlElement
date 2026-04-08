import SimpleHtmlElement from './SimpleHtmlElement';
import HtmlElementObservableVariable from './HtmlElementObservableVariable';

export type ChangeDetectorType = 'content' | 'attribute';

export default class HtmlElementChangeDetector {
    variable: string | null;
    oldValue: string | null;
    changeDetectorInterval: number;
    type: ChangeDetectorType;
    attributeName: string | null;

    setType(type: ChangeDetectorType): this;
    setAttribute(attributeName: string): this;
    setVariable(variableName: string): this;
    setChangeDetectorInterval(interval: number): this;
    start(): this;
}
