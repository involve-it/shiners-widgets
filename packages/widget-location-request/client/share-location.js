/**
 * Created by c_aarutyunyan on 12/5/16.
 */
Template.shareLocation.onRendered(function () {
    $('.modal').modal();
    Meteor.call('bz.generateMessageForSharingLocation', bz.help.getParamURL().requesterUserId, function (e, r) {
        $('.js-message-holder').html(r)
    })
})

Template.shareLocation.events({
    'click .js-share-location-btn': function () {
        bz.bus.shareLocation();
    }
})
Template.shareLocation.helpers({})

bz.bus.shareLocation = function () {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    $('#modal1').modal('open');
    _.defer(() => {

        navigator.geolocation.getCurrentPosition(function (pos) {

            Meteor.call('bz.initTrackedLocation', {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }, bz.help.getParamURL().trackId, function (e, r) {
                $('#modal1').modal('close');
                bz.ui.alert('Shared location, close window anytime to stop sharing!');
                $('.js-ask-to-share').hide();
                $('.js-location-shared').show();
            });

        }, function (err) {
        }, options);
    });
}