//#sourceURL=JavaScript.js

var SANBOX = {
    init: function () {
        SANBOX.sb1.register();
        SANBOX.sb2.register();
        SANBOX.sb3.register();
        SANBOX.sb4.register();
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

    sb4: {
        register: function () {
            $('.sb4 .getButton').unbind('click').on('click', SANBOX.sb4.eventClickGet);
        },

        eventClickGet: function () {
            let objectHeader = {
                header1: "ID",
                header2: "Name",
                header3: "Age",
                header4: "Location",
                header5: "Sex"
            };

            let Objects = [
                {
                    ID: "1A1C",
                    Name: "Matsumoto",
                    Age: 26,
                    Location: "VN",
                    Sex: 1
                },
                {
                    ID: "1A1A",
                    Name: "Sato",
                    Age: 28,
                    Location: "JP",
                    Sex: 1
                },
                {
                    ID: "1A1B",
                    Name: "Kobayashi",
                    Age: 30,
                    Location: "USA",
                    Sex: 0
                },
            ];

            let objectHeaderValues = Object.values(objectHeader);

            let table = $("<table>", { class: "my-table" });
            let tHead = $("<thead>");
            let tBody = $("<tbody>");
            
            // Create Header
            let tr = $("<tr>");
            for (var i = 0; i < Object.keys(objectHeader).length; i++) {
                let th = $("<th>")
                th.text(objectHeaderValues[i]);
                tr.append(th);
            }
            tHead.append(tr);
            table.append(tHead);

            // Create body
            Objects.forEach(function (item) {
                let tr = $("<tr>");
                for (var i = 0; i < Object.keys(objectHeader).length; i++) {
                    let td = $("<td>");
                    td.text(item[objectHeaderValues[i]]);
                    tr.append(td);
                }
                tBody.append(tr);
            });
            table.append(tBody);

            // Remove previous table
            $('.sb4 .response table').remove();
            // Add table to reponse
            $('.sb4 .response').append(table);
        },
    },
};

$(document).ready(function() {
    SANBOX.init();
});