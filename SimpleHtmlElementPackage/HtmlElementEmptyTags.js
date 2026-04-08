class HtmlElementEmptyTags
{
    constructor(baseClass)
    {
        this.baseClass = baseClass;
        this.emptyTags = [
            "area",
            "base",
            "br",
            "col",
            "embed",
            "hr",
            "img",
            "input",
            "keygen",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr"
        ];
    }

    check(tag)
    {
        return this.emptyTags.includes(tag);
    }
}

export default HtmlElementEmptyTags;