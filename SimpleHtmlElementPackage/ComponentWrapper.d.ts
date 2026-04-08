import SimpleHtmlElement from './SimpleHtmlElement';

export default class ComponentWrapper {
    element: SimpleHtmlElement;
    parent: SimpleHtmlElement | null;
    isBuilt: boolean;
    parentComponent: ComponentWrapper | null;

    setParent(parent: SimpleHtmlElement): this;
    setParentComponent(parent: ComponentWrapper): this;
    getParentComponent(): ComponentWrapper;

    /** Called once per build cycle — override to define the element structure. */
    prebuild(): void;
    /** Called after prebuild — override for post-build setup. */
    postBuild(): void;

    build(): SimpleHtmlElement;
    rebuild(): SimpleHtmlElement;
    html(): string;
    get(elementIdentifier?: string): SimpleHtmlElement;
    find(selector: string): SimpleHtmlElement;

    setIdentifier(identifier: string): this;
    getElement(): SimpleHtmlElement;
    addClass(className: string): this;
}
