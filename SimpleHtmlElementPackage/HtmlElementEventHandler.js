class HtmlElementEventHandler
{
    constructor(baseClass)
    {
        this.baseClass = baseClass;
        this._events = {};
    }

    /**
     * Add event to element
     * @param eventName {string}
     * @param callback {function}
     * @returns {HtmlElementEventHandler}
     */
    addEvent(eventName, callback)
    {
        if (typeof callback !== 'function') {
            console.error('Callback must be a function', this.baseClass);
        }
        this._events[eventName] = callback;
        return this;
    }

    /**
     * Remove event from element
     * @param eventName
     * @param domManipulator {HtmlElementDomManipulator|null}
     * @returns {HtmlElementEventHandler}
     */
    removeEvent(eventName)
    {
        if (this._events[eventName]) {
            delete this._events[eventName];
            this.baseClass.somethingChanged();
        }
        return this;
    }

    /**
     * Trigger event
     * @param eventName
     * @returns {HtmlElementEventHandler}
     */
    triggerEvent(eventName)
    {
        if (this._events[eventName]) {
            this._events[eventName]();
        }
        return this;
    }

    /**
     * Get events
     * @returns {*|{}}
     */
    get events()
    {
        return this._events;
    }

    attach(element)
    {
        for (const eventName in this._events) {
            element.addEventListener(eventName, this._events[eventName]);
        }
        return this;
    }

    attachSingle(element, eventName, callback)
    {
        element.addEventListener(eventName, callback);
        return this;
    }
}

export default HtmlElementEventHandler;