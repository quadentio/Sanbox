/*
 * Constants for error code
 * */
const ERROR_CODE = {
    ERROR_EXCEPTION_CODE: 1,
    ERROR_TIMEOUT_CODE: 2,
    ERROR_SHOW_MESSAGE_CODE: 3,
    SHOW_NORMAL_MESSAGE_CODE: 4,
    ERROR_FORGERY_TOKEN: 5
};

/**
 * Constants for popup
 * */
const POPUP_CONST = {
    HEIGHT_130: 130,
    HEIGHT_150: 150,
    HEIGHT_160: 160,
    HEIGHT_170: 170,
    HEIGHT_180: 180,
    HEIGHT_190: 190,
    HEIGHT_205: 205,
    HEIGHT_215: 215,
    HEIGHT_260: 260,
    HEIGHT_280: 280,
    HEIGHT_300: 300,
    HEIGHT_420: 420,
    HEIGHT_450: 450,
    HEIGHT_550: 550,
    HEIGHT_555: 555,
    HEIGHT_600: 600,
    HEIGHT_615: 615,
    HEIGHT_650: 650,
    HEIGHT_680: 680,
    HEIGHT_700: 700,
    HEIGHT_750: 750,
    HEIGHT_780: 780,
    WIDTH_300: 300,
    WIDTH_360: 360,
    WIDTH_400: 400,
    WIDTH_450: 450,
    WIDTH_480: 480,
    WIDTH_500: 500,
    WIDTH_550: 550,
    WIDTH_600: 600,
    WIDTH_800: 800,
    WIDTH_854: 854,
    WIDTH_950: 950
};

/**
 * Constants for keycode
 * */
const KEYCODE = {
    ESC: 27
};

/*
 * ACTION
 */
const ACTION_RECEPTION = {
    // 予約外受付
    OPEN_RECEPTION_OUTSIDE_RESERVATION: 1,
    // 空き予約を確認
    OPEN_CONFIRM_VACANT_RESERVATION: 2,
    // 更新
    SEARCH_MAIN_GRID_RECEPTION: 3,
    // 受付取消
    OPEN_CANCEL_RECEPTION: 4
};

/**
 * Common function
 * */
var COMMON_FUNCTION = {
    /**
     * Check response return from ajax
     * @param {any} result Object
     * @returns {any} Object
     */
    checkResponse: function (result) {
        /**
         * Handle error (Exception, Timeout)
         * @param {ErrorViewModel} objResult - Model.ErrorModel
         */
        var handleError = function (objResult) {
            /**
             * Back to Login Page
             */
            var backToLoginPage = function () {
                // Move to page Login
                window.location.href = urlLoginPage;
            };

            if (objResult.Error.ErrorCode == ERROR_CODE.ERROR_TIMEOUT_CODE) {
                // Time out
                backToLoginPage();
            } else if (objResult.Error.ErrorCode == ERROR_CODE.ERROR_EXCEPTION_CODE) {
                // Exception
                alert(objResult.Error.ErrorMessage);
            } else if (objResult.Error.ErrorCode == ERROR_CODE.ERROR_FORGERY_TOKEN) {
                // Refresh page
                window.location.reload(true);
            }
        };

        if (result !== null) {
            var objResult = JSON.parse(result);

            if (objResult) {
                if (objResult.Error.ErrorCode === 0) {
                    // Success
                    return objResult;
                } else if (objResult.Error.ErrorCode === ERROR_CODE.ERROR_SHOW_MESSAGE_CODE
                    ||
                    objResult.Error.ErrorCode === ERROR_CODE.SHOW_NORMAL_MESSAGE_CODE) {
                    // Success - but show error message
                    return objResult;
                } else {
                    // Error
                    handleError(objResult);
                    return null;
                }
            } else {
                // Result null
                return null;
            }
        } else {
            // Result null
            return null;
        }
    },

    checkResponseHtml: function (result) {
        if (result.getResponseHeader('content-type').indexOf('text/html') >= 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Check response return from ajax (but silent, not alert)
     * @param {any} result Object
     * @returns {any} Object
     */
    checkResponseSilent: function (result) {
        /**
         * Handle error (Exception, Timeout)
         * @param {ErrorViewModel} objResult - Model.ErrorModel
         */
        var handleError = function (objResult) {
            /**
             * Back to Login Page
             */
            var backToLoginPage = function () {
                // Move to page Login
                window.location.href = urlLoginPage;
            };

            /**
             * Back to Login Page With URL
             */
            var backToLoginPageWithUrl = function (redirectUrl) {
                // Move to page Login
                window.location.href = urlLoginPage + "?returnUrl=" + redirectUrl;
            };

            if (objResult.Error.ErrorCode == ERROR_CODE.ERROR_TIMEOUT_CODE) {
                // Time out
                if (objResult.RedirectUrl != "" && objResult.RedirectUrl.length > 0) {
                    backToLoginPageWithUrl(objResult.RedirectUrl);
                } else {
                    backToLoginPage();
                }

            } else if (objResult.Error.ErrorCode == ERROR_CODE.ERROR_EXCEPTION_CODE) {
                // Exception
                //alert(objResult.Error.ErrorMessage);
            } else if (objResult.Error.ErrorCode == ERROR_CODE.ERROR_FORGERY_TOKEN) {
                // Refresh page
                window.location.reload(true);
            }
        };

        if (result !== null) {
            var objResult = JSON.parse(result);
            if (objResult) {
                if (objResult.Error.ErrorCode === 0) {
                    // Success
                    return objResult;
                } else if (objResult.Error.ErrorCode === ERROR_CODE.ERROR_SHOW_MESSAGE_CODE
                    ||
                    objResult.Error.ErrorCode === ERROR_CODE.SHOW_NORMAL_MESSAGE_CODE) {
                    // Success - but show error message
                    return objResult;
                } else {
                    // Error
                    handleError(objResult);
                    return null;
                }
            } else {
                // Result null
                return null;
            }
        } else {
            // Result null
            return null;
        }
    },

    showErrorAjax: function (result) {
        if (result != '') {
            alert(result);
        }
    },

    checkValueIsValid: function (lstParam) {
        // Create an object:
        var resultObj = {
            isValid: true,
            message: ""
        };
        // Create format common
        var format = /[`*+{};':"|,<>~]/;
        $.each(lstParam, function (key, value) {

            if (format.test(value) == true) {
                // is not valid
                resultObj.isValid = false;
                resultObj.message = "テキストコンテンツに無効な文字が含まれています。";
                // return and break loop
                return resultObj;
            }
        });
        // is valid
        return resultObj;
    },

    showMessageInvalidInput: function (objError) {
        if (objError.divParent && objError.divParent != "") {
            $(objError.divParent).show();
        }
        $(objError.idValidateMessage).text('');
        if (objError.isValid == false) {
            $(objError.idValidateMessage).append(objError.message);
            $(objError.idValidateMessage).append($('<br>'));
            $(objError.idValidateMessage).append($('<br>'));
        }
    },

    hideMessageInvalidInput: function (objError) {
        if (objError.divParent && objError.divParent != "") {
            $(objError.divParent).hide();
        }
        $(objError.idValidateMessage).text('');
    },

    refreshAntiForgeryToken: function () {
        // AJAX get token and update __RequestVerificationToken
        let ajaxParams = $.extend({}, AJAX_PARAM_DEFAULT);
        ajaxParams[AJAX_PARAM_NAME.URL] = urlRefreshToken;
        ajaxParams[AJAX_PARAM_NAME.DATA_TYPE] = AJAX_DATA_TYPE.HTML;
        ajaxParams[AJAX_PARAM_NAME.REQUEST_TYPE] = AJAX_REQUEST_TYPE.POST;
        ajaxParams[AJAX_PARAM_NAME.CALLBACK_SUCCESS] = function (result, textStatus, jqXHR) {
            if (result !== null && result !== '') {
                // Check result including HTML or Json
                if (COMMON_FUNCTION.checkResponseHtml(jqXHR)) {

                    var tokenValue = $('<div>').html(result).find('input[type="hidden"]').val();
                    $('input[name=__RequestVerificationToken]').val(tokenValue);

                } else {
                    // Ajax not return HTML (Timeout Error)
                    let objParsedData = checkResponse(result);
                    if (objParsedData === null) return;
                }
            } else {
                // Response null (DO NOTHING)
                return;
            }
        };
        return doAjax(ajaxParams);
    },

    removeElement: function (id) {
        $(id).remove();
    },

    hideElement: function (id) {
        $(id).addClass("hidden");
    },

    showElement: function (id) {
        $(id).removeClass("hidden");
    },

    disableElement: function (id) {
        $(id).attr('disabled', 'disabled');
    },

    enableElement: function (id) {
        $(id).removeAttr('disabled');
    },

    lockAlwayElement: function (id) {
        $(id).addClass('LOCKED');
    },

    checkLockElement: function (id) {
        return $(id).hasClass('LOCKED');
    },

    convertNewLineToBrTag: function (strVal) {
        if (strVal != null) {
            return strVal.replace(/\n/g, "<br />");
        }
        return null;
    },

    scrollIntoViewIfNeeded: function (targetItem, elementList) {
        if (targetItem.getBoundingClientRect().bottom > elementList.innerHeight) {
            // Scroll To Top
            targetItem.scrollIntoView(true);
        }

        if (targetItem.getBoundingClientRect().top < 0) {
            targetItem.scrollIntoView(true);
        }
    }
};

/**
 * Common SignalR
 * */
var COMMON_SIGNALR = {
    // Start listening from server signalR
    startConnection: function () {
        // Start SignalR
        $.connection.hub.start()
            .done(function () {
                // Success started
                console.log(new Date().toLocaleString() + ": SignalR started successfully");
            })
            .fail(function (reason) {
                // Fail to start signalR
                console.log(new Date().toLocaleString() + ": SignalR connection failed: " + reason);
            });

        // Event disconnect signal r
        $.connection.hub.disconnected(function () {
            // The disconnected event is called when the client is disconnected and SignalR can't automatically reconnect
            console.log(new Date().toLocaleString() + ": SignalR disconnected");
            setTimeout(function () {
                // Restart connection after 3s
                // You might want to wait a period of time before calling Start in order to avoid doing this too frequently when the server or the physical connection are unavailable.
                // A potential problem to be aware of in mobile clients is that continuous reconnection attempts when the server or physical connection isn't available could cause unnecessary battery drain.
                $.connection.hub.start()
                    .done(function () {
                        // Success started
                        console.log(new Date().toLocaleString() + ": SignalR restarted successfully");
                    })
                    .fail(function (reason) {
                        // Fail to start signalR
                        console.log(new Date().toLocaleString() + ": SignalR restart failed: " + reason);
                    });
            }, 3000);
        });
    },

    startListeningRequestToClientPushServer: function (callback) {
        // Call function callback when data received from server
        $.connection.login.client.pingRequestToClientPushServer = function () {
            callback();
        };
    }
};

/**
 * Format function
 * */
var FORMAT_FUNCTION = {
    inputConvertNumberFullSizeToHalfSize: function () {
        $(this).val(convertNumberFullSizeToHalfSize($.trim($(this).val())));
        $(this).val($(this).val().replace(/\D/g, ''));
    },

    onlyAllowInputNumberHalfSize: function (e) {
        // Only number key is allowed
        if (!/[0-9]/.test(String.fromCharCode(e.which))) {
            e.preventDefault();
        }
    },

    inputConvertNumberFullSizeToHalfSizeMonthDay: function () {
        $(this).val(convertNumberFullSizeToHalfSize($.trim($(this).val())));
        $(this).val($(this).val().replace(/\D/g, ''));
        $(this).val(addZeroToNumber($(this).val(), 2));
    },

    formatDateDashToDateDot: function (date) {
        var originalDate = date;
        var d, month, day, year;

        d = new Date(date);
        month = '' + (d.getMonth() + 1);
        day = '' + d.getDate();
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        if ((year || month || day) === 'NaN')
            return originalDate;

        return [year, month, day].join('.');
    },

    formatDateDashToDateJapanese: function (date) {
        var originalDate = date;
        var d, month, day, year;

        d = new Date(date);
        month = '' + (d.getMonth() + 1);
        day = '' + d.getDate();
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        if ((year || month || day) === 'NaN')
            return originalDate;

        return year + '年' + month + '月' + day + '日';
    },

    formatDateDashToDateMonthSlash: function (date) {
        var originalDate = date;
        var d, month, day, year;

        d = new Date(date);
        month = '' + (d.getMonth() + 1);
        day = '' + d.getDate();
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        if ((year || month || day) === 'NaN')
            return originalDate;

        return month + '/' + day;
    },

    convertFullsizeNumberToHalfsizeNumber: function ($input) {
        $input.val(convertNumberFullSizeToHalfSize($.trim($input.val())));
        $input.val($input.val().replace(/\D/g, ''));
    },

    /**
    * Adding extra zeros in front of a number
    * @param {any} str: Original String
    * @param {int} max: Max length
    * @returns {string} - Number
    */
    addZeroToNumber: function (str, max) {
        if (isNaN(str))
            return str;
        if (str === "")
            return str;
        str = str.toString();
        return str.length < max ? addZeroToNumber("0" + str, max) : str;
    }
};

var DATE_FUNCTION = {
    /**
     * Get current date
     * @returns {string} - Date
     */
    getCurrentDate: function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = d.getFullYear() + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        return parseISO8601(output);
    },

    /**
    * Get current date in format yyyy-MM-dd
    * @returns {Date} - yyyy-MM-dd
    * */
    getCurrentDateDash: function () {
        return DATE_FUNCTION.parseDateObjectToDateWithSplitChar(new Date(), '-');
    },

    /**
     * Get current date in format yyyy.MM.dd
     * @returns {Date} - yyyy.MM.dd
     * */
    getCurrentDateDot: function () {
        return DATE_FUNCTION.parseDateObjectToDateWithSplitChar(new Date(), '.');
    },

    /**
     * Get current time in format HH:mm
     * @returns {Date} - HH:mm
     * */
    getCurrentTimeHHMM: function () {
        let currentDate = new Date();
        let currentHour = currentDate.getHours();
        let currentMinute = currentDate.getMinutes();
        let displayTime = String(currentHour).padStart(2, '0') + ":" + String(currentMinute).padStart(2, '0');
        return displayTime;
    },

    /**
     * Parse string date from yyyy-MM-dd to string format yyyy{0}MM{0}dd
     * @param {string} date - yyyy-MM-dd
     * @param {string} splitChar - {-}, {/}, {.}
     * @returns {Date} - DateString
     */
    parseDateStringToDateWithSplitChar: function (date, splitChar) {
        var originalDate = date;
        var d, month, day, year;

        d = new Date(date);
        month = '' + (d.getMonth() + 1);
        day = '' + (d.getDate());
        year = (d.getFullYear());

        month = String(month).padStart(2, '0');
        day = String(day).padStart(2, '0');

        if ((year || month || day) === 'NaN')
            return originalDate;

        return [year, month, day].join(splitChar);
    },

    /**
     * Parse date object to string format yyyy{0}MM{0}dd
     * @param {string} d - DateObject
     * @param {string} splitChar - {-}, {/}, {.}
     * @returns {Date} - DateString
     */
    parseDateObjectToDateWithSplitChar: function (d, splitChar) {
        var month, day, year;

        month = '' + (d.getMonth() + 1);
        day = '' + (d.getDate());
        year = (d.getFullYear());

        month = String(month).padStart(2, '0');
        day = String(day).padStart(2, '0');

        if ((year || month || day) === 'NaN')
            return '';

        return [year, month, day].join(splitChar);
    },

    getDayOfWeek: function (date) {
        switch (date.getDay()) {
            case 0:
                return "日";
            case 1:
                return "月";
            case 2:
                return "火";
            case 3:
                return "水";
            case 4:
                return "木";
            case 5:
                return "金";
            case 6:
                return "土";
        }
        return null;
    }
};

var POPUP_RESULT_FUNCTION = {
    initPopup: function (width, height) {
        // Init popup
        $('#dialog-notification').attr('fixed-height', height);
        $('#dialog-notification').attr('fixed-width', width);

        let dialogParams = $.extend({}, DIALOG_PARAM_DEFAULT);
        dialogParams[DIALOG_PARAM_NAME.ID] = "dialog-notification";
        dialogParams[DIALOG_PARAM_NAME.IS_KEEP_HTML] = true;
        dialogParams[DIALOG_PARAM_NAME.HEIGHT] = height;
        dialogParams[DIALOG_PARAM_NAME.WIDTH] = width;
        dialogParams[DIALOG_PARAM_NAME.CALLBACK_OPEN] = function (event, ui) {
            POPUP_FUNCTION.makeFocusPopup('#' + dialogParams[DIALOG_PARAM_NAME.ID]);
        };

        popupResult = doInitDialog(dialogParams);
    },

    showPopup: function (callbackOK, message, popupWidth) {
        // Show popup
        $('#dialog-notification #dialogContent').html(message);

        // Set event close dialog
        $('#dialog-notification #btnPopupOk').unbind('click').on('click', function () {
            doCloseDialog(popupResult);
        });

        popupResult.dialog({
            beforeClose: function (event, ui) {
                // Callback No called from here to make sure callback executed after click OK/press ESC
                if (typeof callbackOK === "function") {
                    callbackOK();
                }
            }
        });

        doOpenDialog(popupResult);
        // Resize after show (jquery auto add new line at bottom popup)
        popupResult.dialog("option", "height", $('#dialog-notification').attr('fixed-height'));
        if (popupWidth && popupWidth > 0) {
            popupResult.dialog("option", "width", popupWidth);
        } else {
            popupResult.dialog("option", "width", $('#dialog-notification').attr('fixed-width'));
        }

        // Focus button OK
        $('#dialog-notification #btnPopupOk').get(0).focus();
    }
};

var POPUP_CONFIRM_FUNCTION = {
    initPopup: function (width, height) {
        // Init popup
        $('#dialog-confirm').attr('fixed-height', height);

        let dialogParams = $.extend({}, DIALOG_PARAM_DEFAULT);
        dialogParams[DIALOG_PARAM_NAME.ID] = "dialog-confirm";
        dialogParams[DIALOG_PARAM_NAME.IS_KEEP_HTML] = true;
        dialogParams[DIALOG_PARAM_NAME.HEIGHT] = height;
        dialogParams[DIALOG_PARAM_NAME.WIDTH] = width;
        dialogParams[DIALOG_PARAM_NAME.CALLBACK_OPEN] = function (event, ui) {
            POPUP_FUNCTION.makeFocusPopup('#' + dialogParams[DIALOG_PARAM_NAME.ID]);
        };

        popupConfirm = doInitDialog(dialogParams);
    },

    showPopup: function (callbackYes, callbackNo, message) {
        // Show popup
        $('#dialog-confirm #dialogContent').html(message);
        popupConfirm.data('confirm-by-yes', 'false');

        $('#dialog-confirm #yesConfirm').unbind('click').on('click', function () {
            // Prevent Callback No called from [beforeClose] event
            popupConfirm.data('confirm-by-yes', 'true');
            doCloseDialog(popupConfirm);
            if (typeof callbackYes === "function") {
                callbackYes();
            }
        });

        $('#dialog-confirm #noConfirm').unbind('click').on('click', function () {
            // Allow Callback No called from [beforeClose] event
            popupConfirm.data('confirm-by-yes', 'false');
            doCloseDialog(popupConfirm);
        });

        popupConfirm.dialog({
            beforeClose: function (event, ui) {
                // Callback called from here to make sure callback executed after click OK/press ESC
                if (typeof callbackOK === "function" && $(this).data('confirm-by-yes') == 'false') {
                    callbackNo();
                }
            }
        });

        doOpenDialog(popupConfirm);
        // Resize after show (jquery auto add new line at bottom popup)
        popupConfirm.dialog("option", "height", $('#dialog-confirm').attr('fixed-height'));
    }
};

var GUID_FUNCTION = {
    createGuid: function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }
};

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};