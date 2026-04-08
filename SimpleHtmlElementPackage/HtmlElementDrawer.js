class HtmlElementDrawer
{
    constructor(baseClass)
    {
        this.baseClass = baseClass;
    }

    attach(element)
    {
        const container = this.getContainer(element);
        try {
            if (container) {
                container.innerHTML = this.baseClass.html();
            } else {
                throw new Error(`Element ${element} does not exist.`);
            }
        } catch (error) {
            console.error(error);
        }
        return this;
    }

    append(element)
    {
        const container = this.getContainer(element);
        try {
            if (container) {
                const htmlContent = this.baseClass.html();
                container.insertAdjacentHTML('beforeend', htmlContent);
            } else {
                throw new Error(`Element ${element} does not exist.`);
            }
        } catch (error) {
            console.error(error);
        }
        return this;
    }

    prependTo(element)
    {
        const container = this.getContainer(element);
        try {
            if (container) {
                const htmlContent = this.baseClass.html();
                container.insertAdjacentHTML('afterbegin', htmlContent);
            } else {
                throw new Error(`Element ${element} does not exist.`);
            }
        } catch (error) {
            console.error(error);
        }
        return this;
    }

    getContainer(element)
    {
        if (typeof element === 'string') {
            const container = document.querySelector(element);
            if (!container) {
                throw new Error(`Element ${element} not found.`);
            }
            return container;
        } else if (element instanceof HTMLElement) {
            return element;
        } else {
            throw new Error(`Invalid element type.`);
        }
    }
}

export default HtmlElementDrawer;