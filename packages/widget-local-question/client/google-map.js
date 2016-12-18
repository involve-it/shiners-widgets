/**
 * Created by c_aarutyunyan on 12/17/16.
 */
var MAP_ZOOM = 15;

Meteor.startup(function() {

    GoogleMaps.load({ key: 'AIzaSyD04-_S8LvYF4ywYD6FLc4cwPCQp48MCGI' });
    // GoogleMaps.load({key: 'AIzaSyCE5a0IeEGQLptVSSW-5swNFNaRUXKEWss', libraries: 'geometry,places', v: '3'})
    // GoogleMaps.load();
});
Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
        var latLng = Geolocation.latLng();

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
        });
    });
});
Template.map.helpers({
    geolocationError: function() {
        var error = Geolocation.error();
        return error && error.message;
    },
    mapOptions: function() {
        var latLng = Geolocation.latLng();
        // Initialize the map once we have the latLng.
        if (GoogleMaps.loaded() && latLng) {
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: MAP_ZOOM
            };
        }
    }
});