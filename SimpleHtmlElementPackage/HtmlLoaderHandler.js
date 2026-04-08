class HtmlLoaderHandler
{
    constructor(baseClass)
    {
        this.baseClass = baseClass;
    }

    setLoading()
    {
        this.baseClass.setAttribute('data-loading', 'true', true);
        this.loader = this.baseClass.addChild()
            .setType('div')
            .addClass('loader');
        this.loader
            .addChild()
                .setType('span')
                .addClass('visually-hidden')
                .setContent('Loading...');
    }

    unsetLoading()
    {
        this.baseClass.removeAttribute('data-loading');
        this.loader.remove();
    }
}

export default HtmlLoaderHandler;