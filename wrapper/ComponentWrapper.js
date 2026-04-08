import SimpleHtmlElement from '../packages/SimpleHtmlElementPackage/SimpleHtmlElement.js';
class ComponentWrapper {
    constructor()
    {
        this.element = new SimpleHtmlElement();
        this.element.setParentComponent(this);
        this.parent = null;
        this.isBuilt = false;
        this.parentComponent = null;

        //override flags
        this.methodsThatMustNotBeOverriden = {
            "setParent": true,
            "html": true,
            "get": true,
            "build": true,
        };

    }

    /**
     * Clear overide flag for method
     * @param methodName
     */
    clearOverride(methodName)
    {
        this.methodsThatMustNotBeOverriden[methodName] = false;
    }

    /**
     * Check if all required methods are overriden
     */
    checkOverrides()
    {
        for (const methodName in this.methodsThatMustNotBeOverriden) {
            if (this.methodsThatMustNotBeOverriden[methodName] === true) {
                throw new Error("Method " + methodName + " must not be overriden");
            }
        }
    }

    /**
     * Set parent to actual element
     * @param parent
     * @returns {ComponentWrapper}
     */
    setParent(parent)
    {
        this.parent = parent;
        this.element.setParent(parent);
        this.clearOverride("setParent");
        return this;
    }

    /**
     * Set parent component to actual instance of the component
     * @param parent
     * @returns {ComponentWrapper}
     */
    setParentComponent(parent)
    {
        this.parentComponent = parent;
        return this;
    }

    /**
     * Get parent component
     * @returns {null|*}
     */
    getParentComponent()
    {
        if (this.parentComponent === null || typeof this.parentComponent === "undefined") {
            throw new Error("Parent component is not set");
        }
        return this.parentComponent;
    }

    html()
    {
        this.isBuilt = false;
        this.build()
        this.clearOverride("html");
        this.checkOverrides();
        return this.element.html();
    }

    get(elementIdentifier)
    {
        this.clearOverride("get");
        return elementIdentifier === "undefined" ? this.element : this.element.get(elementIdentifier);
    }

    find(selector)
    {
        return this.element.find(selector);
    }


    build()
    {
        this.clearOverride("build");
        if (!this.isBuilt) {
            if (typeof this.prebuild === "function") {
                this.prebuild();
            }
            if (typeof this.postBuild === "function") {
                this.postBuild();
            }
        }
        this.isBuilt = true;
        return this.element;
    }

    prebuild()
    {}

    postBuild()
    {}

    rebuild()
    {
        this.isBuilt = false;
        return this.build();
    }

    setIdentifier(identifier)
    {
        this.element.setIdentifier(identifier);
        return this;
    }

    getElement()
    {
        return this.element;
    }

    addClass(className)
    {
        this.element.addClass(className);
        return this;
    }
}

export default ComponentWrapper;