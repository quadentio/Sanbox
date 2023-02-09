/*
 * Constants name for ajax
 * */
const AJAX_PARAM_NAME = {
    URL: 'url',
    ASYNC: 'async',
    CROSS_DOMAIN: 'crossDomain',
    REQUEST_TYPE: 'requestType',
    CONTENT_TYPE: 'contentType',
    DATA_TYPE: 'dataType',
    PROCESS_DATA: 'processData',
    DATA: 'data',
    CALLBACK_BEFORE_SEND: 'beforeSendCallbackFunction',
    CALLBACK_SUCCESS: 'successCallbackFunction',
    CALLBACK_COMPLETE: 'completeCallbackFunction',
    CALLBACK_ERROR: 'errorCallBackFunction'
};

/*
 * Constants for request type
 * */
const AJAX_REQUEST_TYPE = {
    POST: 'POST',
    GET: 'GET'
};

const AJAX_CONTENT_TYPE = {
    FORM: 'application/x-www-form-urlencoded; charset=UTF-8',
    JSON: 'application/json; charset=utf-8'
};

/*
 * Constants for data type
 * */
const AJAX_DATA_TYPE = {
    JSON: 'json',
    HTML: 'html'
};

/*
 * Constants for async
 * */
const AJAX_ASYNC = {
    ASYNC: true,
    SYNC: false
};

/*
 * Constants for process data
 * */
const AJAX_PROCESS_DATA = {
    TRUE: true,
    FALSE: false
};

/*
 * Constants for cross domain
 * */
const AJAX_CROSS_DOMAIN = {
    TRUE: true,
    FALSE: false
};

/*
 * Default param for ajax
 * */
var AJAX_PARAM_DEFAULT = {
    'url': null,
    'async': true,
    'crossDomain': false,
    'requestType': "GET",
    'contentType': 'application/x-www-form-urlencoded; charset=UTF-8',
    'dataType': 'json',
    'processData': 'true',
    'data': {},
    'beforeSendCallbackFunction': null,
    'successCallbackFunction': null,
    'completeCallbackFunction': null,
    'errorCallBackFunction': null
};

/**
 * CSRF (XSRF) security
 * @param {any} data params
 * @returns {any} data
 */
function addAntiForgeryToken(data) {
    //cross-site request forgeries(CSRF) in ajax
    //1. Add __RequestVerificationToken
    //2. Change data: JSON.stringify(registerModel) → data: registerModel
    //3. Change contentType: 'application/json; charset=utf-8' → dataType: 'json'

    // If the object is undefined, create a new one.
    if (!data) {
        data = {};
    }
    // Add token
    var tokenInput = $('input[name=__RequestVerificationToken]');
    if (tokenInput.length) {
        data.__RequestVerificationToken = tokenInput.val();
    }
    return data;
}

/**
 * Do ajax common function
 * @param {any} doAjaxParams ajaxParam
 * @return {any} ajax
 */
function doAjax(doAjaxParams) {

    var url = doAjaxParams['url'];
    var async = doAjaxParams['async'];
    var crossDomain = doAjaxParams['crossDomain'];
    var requestType = doAjaxParams['requestType'];
    var contentType = doAjaxParams['contentType'];
    var dataType = doAjaxParams['dataType'];
    var processData = doAjaxParams['processData'];
    var data = doAjaxParams['data'];
    var beforeSendCallbackFunction = doAjaxParams['beforeSendCallbackFunction'];
    var successCallbackFunction = doAjaxParams['successCallbackFunction'];
    var completeCallbackFunction = doAjaxParams['completeCallbackFunction'];
    var errorCallBackFunction = doAjaxParams['errorCallBackFunction'];

    // addAntiForgeryToken(data);

    return $.ajax({
        url: url,
        crossDomain: crossDomain,
        async: async,
        type: requestType,
        contentType: contentType,
        dataType: dataType,
        processData: processData,
        data: data,
        beforeSend: function (jqXHR, settings) {
            if (typeof beforeSendCallbackFunction === "function") {
                beforeSendCallbackFunction();
            }
        },
        success: function (data, textStatus, jqXHR) {
            if (typeof successCallbackFunction === "function") {
                successCallbackFunction(data, textStatus, jqXHR);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (typeof errorCallBackFunction === "function") {
                errorCallBackFunction(errorThrown);
            } else {
                COMMON_FUNCTION.showErrorAjax(errorThrown);
            }
        },
        complete: function (jqXHR, textStatus) {
            if (typeof completeCallbackFunction === "function") {
                completeCallbackFunction();
            }
        }
    });
}

function getEmptyParam() {
    return {};
}