//#sourceURL=JavaScript.js

var SANBOX = {
    init: function () {
        SANBOX.sb1.register();
        SANBOX.sb2.register();
        SANBOX.sb3.register();
        SANBOX.sb4.register();
        SANBOX.sb5.register();
    },

    sb1: {
        register: function () {
            $('.sb1 button').unbind('click').on('click', SANBOX.sb1.eventClick);
        },

        eventClick: function () {
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
            $('.sb4 .collButton').unbind('click').on('click', SANBOX.sb4.eventClickCollapse);
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

            let table = $("<table>", { class: "cm-table-style", border: 1 });
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

        eventClickCollapse: function () {
            // Remove previous table
            $('.sb4 .response table').remove();
        }
    },

    sb5: {

        register: function () {
            $('.sb5 .getButton').unbind('click').on('click', SANBOX.sb5.eventClickGet);
            $('.sb5 .collButton').unbind('click').on('click', SANBOX.sb5.eventClickCollapse);
        },

        eventClickGet: function () {

            let headerOrder = SANBOX.sb5.shuffleArray(["class2", "class4", "class3", "class1", "class5"]);
            let roomOrder = SANBOX.sb5.shuffleArray(["room2", "room1", "room3"]);

            let Objects = [

                room = {
                    id: 1,
                    content: {
                        class1: "This is class1 of room1",
                        class2: "This is class2 of room1",
                        class3: "This is class3 of room1",
                        class4: "This is class4 of room1",
                        class5: "This is class5 of room1",
                    },
                },
                room = {
                    id: 2,
                    content: {
                        class1: "This is class1 of room2",
                        class2: "This is class2 of room2",
                        class3: "This is class3 of room2",
                        class4: "This is class4 of room2",
                        class5: "This is class5 of room2",
                    },
                }, 
                room = {
                    id: 3,
                    content: {
                        class1: "This is class1 of room3",
                        class2: "This is class2 of room3",
                        class3: "This is class3 of room3",
                        class4: "This is class4 of room3",
                        class5: "This is class5 of room3",
                    },
                }, 
            ];

            let table = $("<table>", { class: "cm-table-style", border: 1 });
            let thead = $("<thead>");
            let tbody = $("<tbody>");

            // Create column header for table
            let header = SANBOX.sb5.createColHeader(Objects[0], headerOrder);
            thead.append(header);

            // Create body part of table
            // 4 loops :"> not break
            // for (let j = 0; j < roomOrder.length; j++) {
            //     let roomId = roomOrder[j];
            //     Objects.forEach(function (item, index) {
            //         if (roomId == "room" + item.id) {
            //             let tr = $("<tr>").html($("<th>").text(roomId));
            //             // With order
            //             for (let i = 0; i < headerOrder.length; i++) {
            //                 let key = headerOrder[i];
            //                 let roomKeys = Object.keys(Objects[0].content);
            //                 roomKeys.forEach(function (roomKey) {
            //                     if (key == roomKey) {
            //                         let td = $("<td>").text(item.content[key]);
            //                         tr.append(td);
            //                         // For performace
            //                         return;
            //                     }
            //                 });
            //             }
            //             tbody.append(tr);
            //             // For performace
            //             return;
            //         }
            //     });
            // }

            // Create body part of table
            // 4 loops :"> break
            for (let j = 0; j < roomOrder.length; j++) {
                let roomId = roomOrder[j];
                for (let item of Objects) {
                    if (roomId == "room" + item.id) {
                        let tr = $("<tr>").html($("<th>").text(roomId));
                        // With order
                        for (let i = 0; i < headerOrder.length; i++) {
                            let key = headerOrder[i];
                            let roomKeys = Object.keys(Objects[0].content);
                            for (let roomKey of roomKeys) {
                                if (key == roomKey) {
                                    let td = $("<td>").text(item.content[key]);
                                    tr.append(td);
                                    // for performace
                                    break;
                                }
                            }
                        }
                        tbody.append(tr);
                        // for performace
                        break;
                    }
                }
            }
            
            // Objects.forEach(function (item, index) {
            //     let tr = $("<tr>").html($("<th>").text("room" + item.id));
            //     // Use the same loop method with column header to make sure the order of class is right
            //     // => not good for my opinion
            //     // let roomKeys = Object.keys(Objects[0].content);
            //     // roomKeys.forEach(function (key, index) {
            //     //     let td = $("<td>").text(item.content[key]);
            //     //     tr.append(td);
            //     // });

            //     // With order
            //     for (let i = 0; i < headerOrder.length; i++) {
                    
            //         let key = headerOrder[i];
            //         let roomKeys = Object.keys(Objects[0].content);
            //         roomKeys.forEach(function (roomKey) {
            //             if (key == roomKey) {
            //                 let td = $("<td>").text(item.content[key]);
            //                 tr.append(td);
            //                 // This is for faster performance
            //                 // break;
            //             }
            //         });
                    
            //     }

            //     tbody.append(tr);
            // });

            table.append(thead);
            table.append(tbody);

            // Remove previous table
            $('.sb5 .response table').remove();
            // Add table to reponse
            $('.sb5 .response').append(table);
        },

        createColHeader: function (room, headerOrder) {
            let thSample = "<th>CONTENT</th>";
            let header = thSample.replace("CONTENT", "");

            // Without order
            // let roomKeys = Object.keys(room.content);
            // roomKeys.forEach(function (item, index) {
            //     let th = "<th>CONTENT</th>".replace("CONTENT", item);
            //     header += th;
            // });
            
            // With order
            for (let i = 0; i < headerOrder.length; i++) {
                let key = headerOrder[i];
                let roomKeys = Object.keys(room.content);
                for (let item of roomKeys) {
                    if (item == key) {
                        header += thSample.replace("CONTENT", key);
                        break;
                    }
                }
            }

            return header;
        },

        // Shuffle array
        // CHAT GPT
        shuffleArray: function(array) {
            let shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                // Generate random number between 0 ... i
              const j = Math.floor(Math.random() * (i + 1));
                // Swap element in javascript
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            return shuffled;
        },

        eventClickCollapse: function () {
            // Remove previous table
            $('.sb5 .response table').remove();
        }
    },
};

$(document).ready(function() {
    SANBOX.init();
});