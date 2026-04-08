import HtmlElementObservableVariable from "./HtmlElementObservableVariable.js";
class HtmlElementChangeDetector
{
    constructor(baseClass) {
        this.baseClass = baseClass;
        this.variable = null;
        this.oldValue = null;
        this.changeDetectorInterval = 300;
        this.type = 'content';
        this.attributeName = null;
    }

    /**
     * Set type of change detector (content, attribute)
     * @param type {string} - content, attribute
     * @returns {HtmlElementChangeDetector}
     */
    setType(type)
    {
        this.baseClass.setType(type);
        return this;
    }

    setAttribute(attributeName)
    {
        this.attributeName = attributeName;
        this.type = 'attribute';
        return this;
    }

    /**
     * @param variableName {string}
     * @returns {HtmlElementChangeDetector}
     */
    setVariable(variableName)
    {
        try {
            if (typeof window[variableName] === undefined) {
                throw new Error("Variable " + variableName + " is not defined");
            }
            if (window[variableName] instanceof HtmlElementObservableVariable) {

                window[variableName].addObserver(
                    this.baseClass,
                    this.type === 'content' ? 'setContent' : 'setAttribute',
                    this.attributeName || undefined);

                return this;
            }

            this.variable = variableName;
            this.start();
        } catch (e) {
            console.error(e);
        }
        return this;
    }

    /**
     * Set change detector interval
     * @param interval {number}
     * @returns {HtmlElementChangeDetector}
     */
    setChangeDetectorInterval(interval)
    {
        this.changeDetectorInterval = interval;
        return this;
    }

    start()
    {
        if (this.type === 'content') {
            this.baseClass.setContent(window[this.variable]);
        } else {
            this.baseClass.setAttribute(this.attributeName, window[this.variable], true);
        }
        this.changeDetector();
        return this;
    }

    changeDetector()
    {
        setTimeout(() => {
            if (this.oldValue !== window[this.variable]) {
                this.oldValue = window[this.variable];
                if (this.type === 'content') {
                    this.baseClass.setContent(this.oldValue, true);
                } else {
                    console.log('setting attribute', this.attributeName, this.oldValue);
                    this.baseClass.setAttribute(this.attributeName, this.oldValue, true);
                }
            }
            this.changeDetector();
        }, this.changeDetectorInterval);
    }
}

export default HtmlElementChangeDetector;