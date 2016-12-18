// sets global, to have an can-be-used-in-all-packages globals for browser/cordova packages compilation:
setPackagesCompilationGlobals();

Package.describe({
    name: 'arutune:bz-api',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Inits, helpers, configs, extends etc.',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    //api.versionsFrom('1.1.0.3');
    api.use(['anti:i18n', 'softwarerero:accounts-t9n'], ['client', 'server']);
    api.use(['ecmascript'], global.bzSettings.webBrowserArrayWithServer);
    api.use('service-configuration', ['server']);
    api.use('shiners:materialize', ['client']);

    //api.use('iron:layout', ['client', 'server']);
    api.use(['underscore', 'session']);
    api.use(['templating'], global.bzSettings.webBrowserArray);

    // load all server/client/shared lib files:
    api.addFiles([
        'shared/lib/01_inits/01_init.js',
        'shared/lib/01_inits/02_helpers.js',
        'shared/lib/01_inits/03_extends.js',
        'shared/lib/02_business/posts.js',
        'shared/lib/02_business/location.js'
    ]);
    api.addFiles([
        'server/inits.js',
        'server/lib/config.js',
        'server/lib/accounts.js'
    ], 'server');


    api.addFiles([
        'client/lib/01_inits/version.js',

        'client/lib/01_inits/accounts.js',
        'client/lib/01_inits/bz-js.js',
        'client/lib/01_inits/i18n.js',
        'client/lib/01_inits/bz-ui.js',
        'client/lib/01_inits/location.js',
        'client/lib/01_inits/fb.js',
        'client/lib/01_inits/maps.js',
        'client/lib/01_inits/template-helpers.js',
    ], 'client');
});

// HELPERS:
function setPackagesCompilationGlobals(mob) {
    if (mob) {
        // mobile developer:
        global.bzSettings = {
            webBrowserArray: [],
            webBrowserArrayWithServer: [],
            webCordovaArray: ['web.browser', 'web.cordova'],
            webCordovaArrayWithServer: ['web.browser', 'web.cordova', 'server']
        }
    } else {
        // browser developer:
        global.bzSettings = {
            webBrowserArray: ['web.browser', 'web.cordova'],
            webBrowserArrayWithServer: ['web.browser', 'web.cordova', 'server'],
            webCordovaArray: [],
            //webCordovaArray : ['web.cordova']
        }
    }
}