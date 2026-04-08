class HtmlElementDynamicScriptLoader
{
    constructor(baseClass) {
        this.baseClass = baseClass;
        this.script = null;
        this.executable = null;
    }

    /**
     * Load script
     * @param url {string}
     * @param callback {function}
     */
    loadScript(url, callback)
    {
        const self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';
        xhr.onload = function() {
            if (xhr.status === 200) {
                self.script = xhr.responseText;
                self.createFunctionFromString();
            } else {
                console.error('Failed to load script: ' + url);
            }
        };
        xhr.send();
    }

    createFunctionFromString() {

        const assignElement = 'const currentElement = this;'; // Reference to the class instance
        const scriptWithContext = assignElement + this.script;
        this.executable = new Function(scriptWithContext).bind(this.baseClass);
    }

    execute()
    {
        return this.executable();
    }

    canExecute()
    {
        return new Promise((resolve, reject) => {
            if (this.executable !== null) {
                resolve(true);
                return;
            }
            setTimeout(() => {
                resolve(this.canExecute());
            }, 1000);
        });
    }
}

export default HtmlElementDynamicScriptLoader;