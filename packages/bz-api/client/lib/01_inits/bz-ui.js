/**
 * Created by arutu_000 on 12/23/2015.
 */
import { Materialize } from 'meteor/shiners:materialize'
bz.help.makeNamespace('bz.ui');

bz.ui.alert = function (message, obj) {
    obj = obj || {type: 'info'};


    if (message.indexOf(';') !== -1) {

        message = message.split(';');

        if (message.length > 1 && Array.isArray(message)) {
            checkTextErrorMessage();
        }
    } else if (Array.isArray(message)) {
        checkTextErrorMessage();
    } else {
        // sAlert.config({html: true});
    }

    function checkTextErrorMessage() {
        // sAlert.config({html: true});

        var li = '';
        message.map(function (el) {
            li += '<li>' + el + '</li>';
        });
        message = li;

        return message;
    }

    //message = message.join();
    Materialize.toast(message, 5000);
    return;

    if (obj.type == 'info') {
        return sAlert.info(message, {effect: 'no effects'});
    }

    if (obj.type == 'warning') {
        return sAlert.warning(message, {effect: 'no effects'});
    }

    if (obj.type == 'error') {
        return sAlert.error(message, {effect: 'no effects'});
    }

    if (obj.type == 'success') {
        return sAlert.success(message, {effect: 'no effects'});
    }
};
bz.ui.error = function (message, obj) {
    bz.ui.alert(message, {type: 'error'});
};

/* BZ MODAL CONFIRM WINDOW */
bz.ui.modal = function (content, onconfirm) {

    "use strict";

    var body, modal, modalConfirmTemplate, modalConfirm, id;

    if (!body) body = $('body');
    id = 'modal-' + Math.round(Math.random() * 100);
    onconfirm = $.isFunction(onconfirm) ? onconfirm : function () {
        };
    content = content || '';

    modalConfirmTemplate = '<div id="' + id + '" class="reveal-modal confirmPostModal" data-reveal aria-labelledby="modalDeleteTitle" aria-hidden="true" role="dialog"></div>';

    modalConfirm = [
        '<div class="confirmPostModal-wrapper bz-flex bz-flex-center bz-flex-column"><div class="confirmPostModal-header bz-flex bz-flex-middle"><div class="bz-warning-icon bz-flex-grow-0"><i class="fa fa-exclamation-triangle"></i></div>',
        '<div class="bz-modal-header bz-flex-grow-1"><h1 id="modalDeleteTitle" class="title">Delete this post?</h1><p class="sub-title">This action cannot be undone.</p></div></div>',
        '<div class="confirmPostModal-content"><p>' + String(content) + '</p></div>',
        '<div class="confirmPostModal-buttons bz-flex bz-flex-center bz-flex-middle"><a class="button secondary js-close-modal">Cancel</a><a class="button alert js-modal-ok">Delete</a></div></div>'
    ].join('');

    modal = $(modalConfirmTemplate).appendTo('body');
    $(modalConfirm).appendTo('.confirmPostModal');
    $(modal).foundation('reveal', 'open');

    modal.find(".js-modal-ok, .js-close-modal").on("click", function () {
        if ($(this).is('.js-modal-ok')) onconfirm();
        modal.foundation('reveal', 'close');
        modal.remove();
    });

    /*return modal;*/

};
bz.ui.modal.confirm = function (content, onconfirm) {

    "use strict";

    var body, modal, modalConfirmTemplate, modalConfirm, id, args = {};

    if (!body) body = $('body');
    id = 'modal-' + Math.round(Math.random() * 100);
    onconfirm = $.isFunction(onconfirm) ? onconfirm : function () {
        };

    (typeof content === 'object') ? args = content : content = '';

    modalConfirmTemplate = '<div id="' + id + '" class="reveal-modal confirmPostModal" data-reveal aria-labelledby="modalConfirmTitle" aria-hidden="true" role="dialog"></div>';

    modalConfirm = [
        '<div class="confirmPostModal-wrapper bz-flex bz-flex-center bz-flex-column"><div class="confirmPostModal-header bz-flex bz-flex-middle"><div class="bz-warning-icon confirm bz-flex-grow-0"><i class="fa fa-exclamation-triangle"></i></div>',
        '<div class="bz-modal-header bz-flex-grow-1"><h1 id="modalConfirmTitle" class="title">' + T9n.get('RELOAD_POST_TIME') + '</h1><p class="sub-title">' + T9n.get('RELOAD_POST_TIME_SUBTITLE') + '</p></div></div>',
        '<div class="confirmPostModal-content without"><p>' + String(T9n.get('RELOAD_POST_CONTENT', true, args)) + '</p></div>',
        '<div class="confirmPostModal-buttons confirm bz-flex bz-flex-right bz-flex-middle"><a class="button bz-small secondary js-close-modal">Cancel</a><a class="button bz-small alert js-modal-ok">OK</a></div></div>'
    ].join('');

    modal = $(modalConfirmTemplate).appendTo('body');
    $(modalConfirm).appendTo('.confirmPostModal');
    $(modal).foundation('reveal', 'open');

    modal.find(".js-modal-ok, .js-close-modal").on("click", function () {
        if ($(this).is('.js-modal-ok')) onconfirm();
        modal.foundation('reveal', 'close');
        modal.remove();
    });

    /*return modal;*/

};