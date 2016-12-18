/**
 * Created by c_aarutyunyan on 12/5/16.
 */
Template.locquestionLocation.onRendered(function () {
    $('#modalWait').modal();

})

Template.locquestionLocation.events({
    'click .js-use-current': function () {
        // bz.bus.shareLocation();
        $('#modalWait').modal('open');
        _.defer(() => {
            navigator.geolocation.getCurrentPosition(function (pos) {
                $('#modalWait').modal('close');
                $('.js-use-current').addClass('disabled');
            }, function (err) {
                $('#modalWait').modal('close');
                bz.ui.alert('Ошибка запроса локации');
                // bz.ui.alert( );
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
    }
})
Template.locquestionLocation.helpers({})