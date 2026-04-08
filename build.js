const esbuild = require('esbuild');

const sharedOptions = {
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2017'],
};

// Combined bundle – both classes from the same file so instanceof checks work
// when SimpleHtmlElement and ComponentWrapper are used together.
const combinedFooter = {
    js: [
        'window.SimpleHtmlElement = SimpleHtmlLibrary.SimpleHtmlElement;',
        'window.ComponentWrapper = SimpleHtmlLibrary.ComponentWrapper;',
        'window.HtmlElementObservableVariable = SimpleHtmlLibrary.HtmlElementObservableVariable;',
        'window.HtmlElementFactory = SimpleHtmlLibrary.HtmlElementFactory;',
        'window.HtmlToJson = SimpleHtmlLibrary.HtmlToJson;',
        'window.HtmlElementObjectBuilder = SimpleHtmlLibrary.HtmlElementObjectBuilder;',
    ].join(' '),
};

async function build() {
    await esbuild.build({
        ...sharedOptions,
        entryPoints: ['index.js'],
        globalName: 'SimpleHtmlLibrary',
        outfile: 'dist/library.js',
        footer: combinedFooter,
    });
    await esbuild.build({
        ...sharedOptions,
        entryPoints: ['index.js'],
        globalName: 'SimpleHtmlLibrary',
        outfile: 'dist/library.min.js',
        minify: true,
        footer: combinedFooter,
    });
    console.log('Built → dist/library.js / dist/library.min.js');
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
