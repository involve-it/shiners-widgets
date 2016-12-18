import { FlowRouter } from 'meteor/kadira:flow-router';
FlowRouter.route('/locator/share-location', {
    name: 'shareLocation',
    action() {
        BlazeLayout.render('mainLayoutLoc', { main: 'shareLocation' });
    }
});
FlowRouter.route('/locator/view-location', {
    name: 'viewLocation',
    action() {
        BlazeLayout.render('mainLayoutLoc', { main: 'viewLocation' });
    }
});
FlowRouter.route('/locator/request-location', {
    name: 'requestLocation',
    action() {
        BlazeLayout.render('mainLayoutLoc', { main: 'requestLocation' });
    }
});
FlowRouter.route('/locator', {
    name: 'locatorHome',
    action() {
        BlazeLayout.render('mainLayoutLoc', { main: 'bzLocatorHome' });
    }
});
FlowRouter.route('/locator/about', {
    name: 'locationAbout',
    action() {
        BlazeLayout.render('mainLayoutLoc', { main: 'bzLocatorAbout' });
    }
});
