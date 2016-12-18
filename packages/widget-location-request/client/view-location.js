/**
 * Created by c_aarutyunyan on 12/5/16.
 */
const MAP_ZOOM = 15;
Meteor.startup(() => {
    GoogleMaps.ready('map', function (map) {
        showAndUpdateMarker(map);
    });
});

Template.requestLocation.onRendered(function () {

})

Template.requestLocation.helpers({})

bz.bus.stopPollingLocation = function () {
    bz.cols.locationTrackings.remove(bz.help.getParamURL().trackId);
}

function showAndUpdateMarker(map) {
    var curMarker;

    setMarker(bz.cols.locationTrackings.findOne({
        trackId: bz.help.getParamURL().trackId
    }).coords);

    Tracker.autorun(() => {
        bz.cols.locationTrackings.find({
            trackId: bz.help.getParamURL().trackId
        });
        setMarker(bz.cols.locationTrackings.findOne({
            trackId: bz.help.getParamURL().trackId
        }).coords);
    });
    function setMarker(coords) {
        var latLng = coords;
        if (!curMarker) {
            curMarker = new google.maps.Marker({
                position: new google.maps.LatLng(latLng.lat, latLng.lng),
                map: map.instance
            });
        } else {
            curMarker.setPosition(new google.maps.LatLng(latLng.lat, latLng.lng))
        }
        map.instance.setCenter(curMarker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
    }
}