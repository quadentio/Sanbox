//#sourceURL=JavaScript.js

var SANBOX = {
    init: function () {
        SANBOX.sb1.eventRegister();
    },

    sb1: {
        eventRegister: function() {
            $('.sb1 button').unbind('click').on('click', SANBOX.sb1.eventClick);
        },

        eventClick: function() {
            $('.sb1 h2').html("After click button");
        }
    },
};

$(document).ready(function() {
    SANBOX.init();
});