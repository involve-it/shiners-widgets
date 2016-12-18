/**
 * Created by c_aarutyunyan on 12/5/16.
 */
// import Materialize  from 'shiners:materialize';
import { FlowRouter } from 'meteor/kadira:flow-router';


$(document).ready(function () {
    //Materialize.toast('Держитесь крепко-грузим виджет!', 5000) // 4000 is the duration of the toast
});
Template.requestLocation.onRendered(function () {
    Materialize.updateTextFields();
});
bz.bus.requestLocation = function () {
    /*var userId = bz.help.getParamURL().requesterUserId;
     if (userId) {

     } else {
     throw 'userId was not defined'
     }*/
    var to = $('.js-request-location-address').val();
    var msg = $('.js-request-location-message').val();
    if (to) {
        var trackId = _.guid();
        Tracker.autorun(function () {
            bz.cols.locationTrackings.find({trackId: trackId});
            if (bz.cols.locationTrackings.find({trackId: trackId}).fetch().length) {
                console.log('bz.bus.requestLocation, trackId=' + trackId);
                FlowRouter.go(`viewLocation`, {}, { trackId: trackId });
            }
        })

        Meteor.call('bz.sendNotificationLink', {
            to, trackId, msg,
        }, function (e, r) {
            if (!e) {
                // bz.ui.alert('Notification link was sent, your trackId: ' + trackId);
                bz.ui.alert('Сообщение послано, не закрывайте старницу');
                $('.js-form').hide();
                $('.js-wait').show();
            } else {
                bz.ui.alert('Ошибка при отправке: ' + e.message);
            }
        });
    }
    /*setInterval(function() {

     navigator.geolocation.getCurrentPosition(function(pos) {
     Meteor.call('bz.sendTrackedLocation', pos, function(e, r) {
     });
     }, function(err) {
     }, options);
     }, 3000);*/

}