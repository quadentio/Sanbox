﻿//#sourceURL=JavaScript.js

var SANBOX = {
    init: function () {
        SANBOX.sb1.register();
        SANBOX.sb2.register();
        SANBOX.sb3.register();
    },

    sb1: {
        register: function() {
            $('.sb1 button').unbind('click').on('click', SANBOX.sb1.eventClick);
        },

        eventClick: function() {
            $('.sb1 h2').html("After click button");
        }
    },

    sb2: {
        register: function () {
            $('.sb2 button').unbind('click').on('click', SANBOX.sb2.eventClick);
        },

        eventClick: function () {
            let target = $('.sb2 h2');
            let options = ["SANBOX-2", "After click"];
            if (target.text() == options[0]) {
                target.html(options[1]);
            } else {
                target.html(options[0]);
            }
        }
    },

    sb3: {
        register: function () {
            $('.sb3 .getButton').unbind('click').on('click', SANBOX.sb3.eventClickGet);
            $('.sb3 .collButton').unbind('click').on('click', SANBOX.sb3.eventClickCollapse);
        },

        eventClickGet: function () {
            let endpoint = "/api/WeatherForecast";

            // Ajax parameter
            let ajaxParam = $.extend({}, AJAX_PARAM_DEFAULT);
            ajaxParam[AJAX_PARAM_NAME.URL] = endpoint;
            ajaxParam[AJAX_PARAM_NAME.REQUEST_TYPE] = AJAX_REQUEST_TYPE.GET;
            ajaxParam[AJAX_PARAM_NAME.DATA_TYPE] = AJAX_DATA_TYPE.JSON;
            ajaxParam[AJAX_PARAM_NAME.CONTENT_TYPE] = AJAX_CONTENT_TYPE.JSON;
            ajaxParam[AJAX_PARAM_NAME.CALLBACK_SUCCESS] = function (response, textStatus, jqXHR) {
                // TODO: process after call api success
                $('.sb3 .sb_body .response').html("<pre>" + JSON.stringify(response, null, 2) + "</pre>");
            };

            ajaxParam[AJAX_PARAM_NAME.CALLBACK_ERROR] = function (jqXHR, textStatus, errorThrown) {
                var errorMessage = jqXHR.statusText || "Unknown error";
                $('.sb3 .sb_body .response').html("<div class='error'>" + errorMessage + "</div>");
            };

            doAjax(ajaxParam);
        },

        eventClickCollapse: function () {
            // Collapse reponse result of api call
            $('.sb3 .sb_body .response pre').remove();
            $('.sb3 .sb_body .response .error').remove();
        },
    },
};

$(document).ready(function() {
    SANBOX.init();
});