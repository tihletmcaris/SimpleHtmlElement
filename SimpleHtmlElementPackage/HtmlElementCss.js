class HtmlElementCss {
    constructor(baseClass) {
        this.baseClass = baseClass;
        this.css = {};
        this.cssString = null;
    }

    /**
     * Add css to element
     * @param cssObject
     * @returns {HtmlElementCss}
     */
    addCss(cssObject) {
        this.css = {...this.css, ...cssObject};
        return this;
    }

    /**
     * Get css string
     * @returns {string}
     */
    getCss() {
        return this.cssString === null ? this.createCssString() : this.getCssString();
    }

    /**
     * Create css string from css object
     * @returns {string}
     */
    createCssString() {
        let cssString = "[data-ei='" + this.baseClass.getIdentifier() + "'] {\n";
        for (let key in this.css) {
            cssString += `${key} {\n`;
            for (let subKey in this.css[key]) {
                cssString += `${subKey}: ${this.css[key][subKey]};`;
            }
            cssString += "\n}\n}\n";
        }
        return cssString;
    }

    /**
     * Set css object
     * @param css {Object}
     * @returns {HtmlElementCss}
     */
    setCss(css) {
        this.css = css;
        return this;
    }

    /**
     * Set css string
     * @param cssString {string}
     * @returns {HtmlElementCss}
     */
    setCssString(cssString) {
        this.cssString = cssString;
        return this;
    }

    /**
     * Get css string
     * @returns {string}
     */
    getCssString() {
        let cssString = "[data-ei='" + this.baseClass.getIdentifier() + "'] {\n";
        cssString += this.cssString;
        cssString += "\n}\n";
        return cssString;
    }
}

export default HtmlElementCss;