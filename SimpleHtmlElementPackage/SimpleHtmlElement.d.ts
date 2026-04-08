import HtmlElementDrawer from './HtmlElementDrawer';
import HtmlElementDomManipulator from './HtmlElementDomManipulator';
import HtmlElementEventHandler from './HtmlElementEventHandler';
import HtmlElementCss, { CssDefinition } from './HtmlElementCss';
import HtmlElementStyle from './HtmlElementStyle';
import HtmlElementDynamicScriptLoader from './HtmlElementDynamicScriptLoader';
import ComponentWrapper from './ComponentWrapper';

export default class SimpleHtmlElement {
    // Internal sub-modules (public but low-level)
    readonly elementDrawer: HtmlElementDrawer;
    readonly domManipulator: HtmlElementDomManipulator;
    readonly eventHandler: HtmlElementEventHandler | null;
    readonly css: HtmlElementCss | null;
    readonly style: HtmlElementStyle | null;
    readonly dynamicScriptLoader: HtmlElementDynamicScriptLoader | null;

    parent: SimpleHtmlElement | null;
    children: SimpleHtmlElement[];
    elementDrawn: boolean;
    elementDataAttributeName: string;
    skipSlashForEmptyTags: boolean;
    contentVariableChangeDetectorInterval: number;
    isLoading: boolean;
    parentComponent: ComponentWrapper | null;

    // ── Identity ────────────────────────────────────────────────────────────
    getIdentifier(): string;
    setIdentifier(identifier: string): this;
    /** @deprecated use getIdentifier() */
    getIdentificator(): string;
    /** @deprecated use setIdentifier() */
    setIdentificator(identifier: string): this;
    getElementDataAttributeName(): string;

    // ── Element type ─────────────────────────────────────────────────────────
    setType(type: string): this;
    getType(): string;
    selfClose(): this;
    setSelfClosing(): this;
    disableSelfClosing(): this;

    // ── Attributes ───────────────────────────────────────────────────────────
    setAttribute(attribute: string, value: string | number | boolean | null, safeValue?: boolean): this;
    removeAttribute(attribute: string): this;
    toggleAttribute(attribute: string, value: string | boolean | number | undefined): this;
    hasAttribute(attribute: string): boolean;
    getAttribute(attribute: string): string | null;
    setAttributes(attributes: Record<string, string | number | boolean | null>): this;

    // ── Classes ──────────────────────────────────────────────────────────────
    addClass(className: string): this;
    setClass(className: string): this;
    getClass(): string | null;
    removeClass(className: string): this;
    hasClass(className: string): boolean;
    toggleClass(className: string): this;

    // ── Visibility ───────────────────────────────────────────────────────────
    hide(): this;
    show(): this;

    // ── Content ──────────────────────────────────────────────────────────────
    setContent(content: string, contentChild?: boolean): this;
    setText(content: string, contentChild?: boolean): this;
    getContent(): string;
    addContent(content: string): this;

    // ── Children ─────────────────────────────────────────────────────────────
    addChild(beforeContent?: boolean, index?: number | null): SimpleHtmlElement;
    addChildLive(beforeContent?: boolean): SimpleHtmlElement;
    finishChild(): SimpleHtmlElement;
    addElement(element: SimpleHtmlElement, beforeContent?: boolean): this;
    addElementAtIndex(element: SimpleHtmlElement, index: number, beforeContent?: boolean): this;
    setChildren(children: SimpleHtmlElement[]): this;
    getChildren(): SimpleHtmlElement[];
    getChildrenCount(): number;
    getLastElement(): SimpleHtmlElement;
    getLastElementIndex(): number;
    getContentChildren(): SimpleHtmlElement[];
    getContentChildrenCount(): number;
    createElement(): SimpleHtmlElement;
    createChild(element?: SimpleHtmlElement, index?: number | null): SimpleHtmlElement;
    clear(): this;
    remove(): this;
    removeChild(childIndex: number): this;

    // ── Tree search ──────────────────────────────────────────────────────────
    get(elementIdentifier?: string): SimpleHtmlElement;
    find(selector: string): SimpleHtmlElement;
    findByClass(className: string): SimpleHtmlElement;

    // ── Parent ───────────────────────────────────────────────────────────────
    setParent(parent: SimpleHtmlElement): this;
    setParentElementTreeIndex(parentElementTreeIndex: number): this;
    setParentComponent(componentWrapper: ComponentWrapper): this;
    getParentComponent(): ComponentWrapper;

    // ── Rendering ────────────────────────────────────────────────────────────
    html(): string;
    json(): object;
    attach(element: string | HTMLElement): this;
    append(element: string | HTMLElement): this;
    prependTo(element: string | HTMLElement): this;
    redraw(): this;
    /** @deprecated use redraw() */
    redrawInPlace(): this;
    getDomElement(): Promise<HTMLElement>;
    isElementDrawn(): Promise<boolean>;
    waitForElementToBeDrawn(): Promise<boolean>;
    somethingChanged(): void;

    // ── Events ───────────────────────────────────────────────────────────────
    addEvent(event: string, callback: (...args: any[]) => void): this;
    removeEvent(event: string): this;
    triggerEvent(event: string): this;
    attachEvents(): void;

    // ── Inline styles ────────────────────────────────────────────────────────
    addStyle(stylePropertyName: string, stylePropertyValue: string): this;
    removeStyle(stylePropertyName: string): this;
    clearStyles(): this;

    // ── Scoped CSS ───────────────────────────────────────────────────────────
    setCss(css: CssDefinition): this;
    addCss(css: CssDefinition): this;
    setCssString(cssString: string): this;
    insertStyles(): this | false;
    removeStyles(): this | false;

    // ── Loading state ─────────────────────────────────────────────────────────
    setIsLoading(): this;
    unsetIsLoading(): this | false;

    // ── Dynamic script loader ────────────────────────────────────────────────
    loadScript(url: string): this;
    executeScript(): this;
}
