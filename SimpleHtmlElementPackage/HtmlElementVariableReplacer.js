class HtmlElementVariableReplacer
{
    constructor(baseClass)
    {
        this.baseClass = baseClass;
        this._variables = [];
    }

    parseContent(content)
    {
        let normalizedContent = content;
        let regex = /{{(.*?)}}/g;
        if (typeof content !== "string") {
            return content;
        }
        let matches = content.match(regex);
        if (matches !== null) {
            for (let i = 0; i < matches.length; i++) {
                let match = matches[i];
                let variable = match.replace("{{", "").replace("}}", "");
                normalizedContent = normalizedContent.replace("{{" + variable + "}}", "{{" + variable.trim() + "}}");
                if (this._variables.indexOf(variable.trim()) === -1) {
                    this._variables.push(variable.trim());
                }
            }
        } else {
            this._variables = [];
        }
        return normalizedContent;
    }

    get variables()
    {
        return this._variables;
    }

    splitContent(content)
    {
        return content.split(/({{.*?}})/g);
    }


}

export default HtmlElementVariableReplacer;