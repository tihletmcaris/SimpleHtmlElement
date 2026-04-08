class HtmlElementObservableVariable {
    constructor() {
        this._value = '';
        this.eventName = 'stateChange'; // Custom event name
        this.observers = [];
        this.useEvent = false;
    }

    /**
     *
     * @param observer {SimpleHtmlElement}
     * @param callBack {string}
     * @returns {HtmlElementObservableVariable}
     */
    addObserver(observer, callBack, attributeName) {
        this.observers.push({callBack: callBack, observer: observer, attributeName: attributeName});
        if (callBack === 'setContent') {
            observer.setContent(this._value, true);
        }
        if (callBack === 'setAttribute') {
            observer.setAttribute(attributeName, this._value, true);
        }
        return this;
    }

    /**
     * Value Getter
     * @returns {string}
     */
    get value() {
        return this._value;
    }

    /**
     * Set event name
     * @param eventName {string}
     * @returns {HtmlElementObservableVariable}
     */
    setEventName(eventName) {
        this.eventName = eventName;
        return this;
    }

    triggerFirstChange() {
        this.notifyObservers(this._value);
        return this;
    }
    set value(newValue) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.notifyObservers(newValue);
        }
    }

    /**
     * Fire event or notify observers
     * @param newValue
     */
    notifyObservers(newValue) {
        if (this.useEvent) {
            const stateChangeEvent = new Event(this.eventName);
            stateChangeEvent.detail = {value: newValue};
            document.dispatchEvent(stateChangeEvent);
        }
        if(this.observers.length > 0) {

            this.observers.forEach(observer => {
                if (observer.callBack === 'setContent') {
                    observer.observer.setContent(newValue, true);
                } else {
                    observer.observer.setAttribute(observer.attributeName, newValue, true);
                }
            });
        }
    }
}

export default HtmlElementObservableVariable;