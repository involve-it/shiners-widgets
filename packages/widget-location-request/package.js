Package.describe({
    name: 'shiners:widget-location-request',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});
Package.onUse(function (api) {
    //api.versionsFrom('1.1.0.3');

    api.use(['underscore', 'mongo', 'reactive-var', 'tracker', 'ecmascript', 'matb33:collection-hooks',
        'kadira:flow-router',
        'arutune:bz-api'
    ], ['client', 'server']);
    api.use([
        'shiners:materialize'
    ], ['client']);

    api.use(['email'], 'server');

    api.use(['templating', 'less'], 'client');
    api.addFiles([
        'client/main-layout.html',
        'client/main-layout.js',
        'client/main-layout.less',
        'client/locator-about.html',
        'client/locator-home.html',
        'client/request-location.html',
        'client/request-location.js',
        'client/share-location.html',
        'client/share-location.js',
        'client/view-location.html',
        'client/view-location.js',
        'client/google-map.html',
        'client/google-map.js',
        'client/google-map.less',
        'client/router.js'
    ], 'client');
    api.addFiles(['server/main.js'], 'server');

    api.addFiles(['data/collection.js'], ['client', 'server']);

    api.addAssets([
        'client/static/dog.jpg',
        'client/static/map.png'
    ], 'client');
    api.addFiles([
        'client/i18n/english.js',
        'client/i18n/russian.js',
    ], 'client');
});

