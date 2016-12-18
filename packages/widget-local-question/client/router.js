import { FlowRouter } from 'meteor/kadira:flow-router';
FlowRouter.route('/locquestion/location', {
    name: 'locquestionLocation',
    action() {
        BlazeLayout.render('locquestionLayout', { main: 'locquestionLocation' });
    }
});
FlowRouter.route('/locquestion/question', {
    name: 'locquestionQuestion',
    action() {
        BlazeLayout.render('locquestionLayout', { main: 'locquestionQuestion' });
    }
});
FlowRouter.route('/locquestion', {
    name: 'locquestionHome',
    action() {
        BlazeLayout.render('locquestionLayout', { main: 'locquestionHome' });
    }
});
FlowRouter.route('/locquestion/home', {
    name: 'locquestionHome',
    action() {
        BlazeLayout.render('locquestionLayout', { main: 'locquestionHome' });
    }
});
FlowRouter.route('/locquestion/about', {
    name: 'locquestionAbout',
    action() {
        BlazeLayout.render('locquestionLayout', { main: 'locquestionAbout' });
    }
});
