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
                runLocationSharing(r);
                $('#modal1').modal('close');
                bz.ui.alert('Shared location, close window anytime to stop sharing!');
                $('.js-ask-to-share').hide();
                $('.js-location-shared').show();

            });

        }, function (err) {
        }, options);
    });
}

function runLocationSharing(id) {
    console.log('runLocationSharing, id', id);
    var res, crd, trackId = bz.help.getParamURL().trackId;
    if (trackId && id) {
        function success(pos) {
            crd = pos.coords;
            /*if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
             console.log('Congratulations, you reached the target');
             navigator.geolocation.clearWatch(id);
             }*/
            bz.cols.locationTrackings.update(id, { $set: {
                coords: {
                    lat: crd.latitude,
                    lng: crd.longitude
                },
                status: 'updated'
            }})
            /*Meteor.call('bz.updateTrackedLocation', {
             lat: crd.latitude,
             lng: crd.longitude
             }, bz.help.getParamURL().trackId, function (e, r) {
             console.log(e, r);
             });*/
        }

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        res = navigator.geolocation.watchPosition(success, error, options);
    } else {
        throw '';
    }
}