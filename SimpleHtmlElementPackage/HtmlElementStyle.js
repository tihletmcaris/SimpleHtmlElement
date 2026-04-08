class HtmlElementStyle {
    constructor(baseClass) {
        this.baseClass = baseClass;
        this.styles = {};
    }

    clear() {
        this.styles = {};
        this.baseClass.removeAttribute('style');
        return this;
    }

    addStyle(stylePropertyName, stylePropertyValue) {
        this.styles[stylePropertyName] = stylePropertyValue;
        this.apply();
        return this;
    }

    removeStyle(stylePropertyName) {
        delete this.styles[stylePropertyName];
        this.apply();
        return this;
    }

    apply() {
        let styles = '';
        for (let style in this.styles) {
            styles += `${style}: ${this.styles[style]}; `;
        }
        if (styles.trim() !== '') {
            this.baseClass.setAttribute('style', styles);
        } else {
            this.baseClass.removeAttribute('style');
        }
        return this;
    }
}

export default HtmlElementStyle;