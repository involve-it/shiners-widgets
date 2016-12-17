/**
 * Created by c_aarutyunyan on 12/5/16.
 */
bz.help.makeNamespace('bz.bus');

$(document).ready(function() {
  //Materialize.toast('Держитесь крепко-грузим виджет!', 5000) // 4000 is the duration of the toast
});
Template.requestLocation.onRendered(function() {
  Materialize.updateTextFields();
});
bz.bus.requestLocation = function() {
  /*var userId = bz.help.getParamURL().requesterUserId;
  if (userId) {

  } else {
    throw 'userId was not defined'
  }*/
  var to = $('.js-request-location-address').val();
  if (to) {
    var trackId = _.guid();
    Tracker.autorun(function() {
      bz.cols.locationTrackings.find({ trackId: trackId });
      if (bz.cols.locationTrackings.find({ trackId: trackId }).fetch().length) {
        console.log('bz.bus.requestLocation, trackId=' + trackId);
        Router.go(`viewLocation`, {}, { query: { trackId: trackId }});
      }
    })

    Meteor.call('bz.sendNotificationLink', to, trackId, function (e, r) {
      bz.ui.alert('Notification link was sent, your trackId: ' + trackId);
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