// import { HTTP } from 'meteor/http';
import {Email} from 'meteor/email';

Meteor.startup(function () {

});
const INCOGNITO_USERNAME = ' Инкогнито ';
const MESSAGE_TEMPLATE_SHORT = function (data={}) {
    data.username = data.username || INCOGNITO_USERNAME;
    return `Пользователь ${ data.username } запрашивает вашу локацию: `;
}
const MESSAGE_TEMPLATE = function (data={}) {
    data.username = data.username || INCOGNITO_USERNAME;
    return `Пользователь <i>${ data.username }</i> запрашивает вашу локацию <br/>
     <!--<button text="разрешить" onClick="javascript: alert('requestLocationHere')">Разрешить</button>, -->
     закройте окно, чтобы перестать отсылать положение
    `;
}
Meteor.methods({
    'bz.generateMessageForSharingLocation': function (requesterUserId) {
        var requesterUser = Meteor.users.findOne(requesterUserId), link = '';
        if (requesterUser) {
            link = MESSAGE_TEMPLATE(requesterUser);
        } else if (requesterUserId) {
            requesterUser = { username: decodeURI(requesterUserId) };
            link = MESSAGE_TEMPLATE(requesterUser);
        } else {
            throw 'no toAddress or requesterUserId defined'
        }
        return link;
    },
    'bz.generateNotificationLink': function (userId, trackId) {
        userId = userId || Meteor.userId();
        if (userId) {
            var link = `${ Meteor.absoluteUrl() }locator/share-location?requesterUserId=${ userId }&trackId=${ trackId }`;
            // var link = `https://shiners.mobi/shasre-location?requesterUserId=${ userId }`;
        } else {
            throw 'no userId defined'
        }
        return {
            link: link,
            user: Meteor.users.findOne(userId)
        };
    },
    'bz.sendNotificationLink': function (options = {}) {
        var toAddress = options.to, trackId = options.trackId, text = options.msg || '';
        if (!toAddress) {
            throw 'Адрес не указан'
        } else {
            var user = options.userName || Meteor.userId && Meteor.userId() || 'Инкогнито';
            var res = Meteor.call('bz.generateNotificationLink', user, trackId);
            var requestMessage = MESSAGE_TEMPLATE_SHORT(res.user);
            var emailResult = Email.send({
                to: toAddress,
                from: 'info@shiners.ru',
                subject: 'Ваш друг запросил ваше положение',
                text: text + '  ' + requestMessage + res.link
            });
            return emailResult;
        }
    },
    'bz.initTrackedLocation': function (pos, trackId) {
        var ret;
        if (trackId) {
            bz.cols.locationTrackings.remove({
                trackId: trackId
            });
            ret = bz.cols.locationTrackings.insert({
                coords: pos,
                status: 'started',
                trackId: trackId
            })
        }
        return ret;
    },
    'bz.updateTrackedLocation': function (pos, trackId) {
        var ret;
        if (pos && trackId) {
            ret = bz.cols.locationTrackings.update({ trackId: trackId }, { $set: {
                coords: pos,
                status: 'updated',
                target: null // stab for future (requester's loc to check if they are close)
                // trackId: trackId
            }})
        }
        return ret && pos;
    }
});
