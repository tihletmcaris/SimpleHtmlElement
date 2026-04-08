import SimpleHtmlElement from './SimpleHtmlElement';

export default class HtmlElementDrawer {
    /** Replace the innerHTML of a container with this element's HTML. */
    attach(element: string | HTMLElement): this;
    /** Append this element's HTML inside a container. */
    append(element: string | HTMLElement): this;
    /** Prepend this element's HTML inside a container. */
    prependTo(element: string | HTMLElement): this;
    getContainer(element: string | HTMLElement): HTMLElement;
}
