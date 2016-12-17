import { FlowRouter } from 'meteor/kadira:flow-router';
FlowRouter.route('/share-location', {
    name: 'shareLocation',
    action() {
        BlazeLayout.render('mainLayoutLoc', { main: 'shareLocation' });
    }
});
FlowRouter.route('/request-location', {
    name: 'requestLocation',
    action() {
        BlazeLayout.render('mainLayoutLoc', { main: 'bzLocatorHome' });
    }
});
/*Router.map(function () {
  this.route('shareLocation', {
    path: '/share-location',
    template: 'shareLocation',
    layoutTemplate: 'mainLayoutHome'
  });
  this.route('viewLocation', {
    path: '/view-location',
    template: 'viewLocation',
    layoutTemplate: 'mainLayoutLoc'
  });
  this.route('requestLocation', {
    path: '/locator/request-location',
    template: 'requestLocation',
    layoutTemplate: 'mainLayoutLoc',
    controller: 'requireLoginController'
  });
  this.route('locatorHome', {
    path: '/request-location',
    template: 'bzLocatorHome',
    layoutTemplate: 'mainLayoutLoc',
    controller: 'requireLoginController'
  });
});*/
/*
function setPackageLanguage(){
  var enAll = _.extend(bz.language.i18n.en, enI18n);
  T9n.map('en', enAll);
  var ruAll = _.extend(bz.language.i18n.ru, ruI18n);
  T9n.map('ru', ruAll);
}
*/
