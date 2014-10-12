/**
 * @author tlane
 * @version $Revision: 765 $
 * $Date: 2013-11-22 08:47:31 -0800 (Fri, 22 Nov 2013) $
 *
 * Create DataManager instance initializing a XMLHTTPRequest and registering the informObserver "callback"
 * @classdesc Encapsulates remote data retrieval via XMLHTTPRequest, and parsing of data into an internal collection
 * showsList
 * @param {function}informObserver - this is invoked when the DataManager data is updated either as a result of
 * the processing of a response or a request timeout
 * @constructor
 */
function DataManager() {
    this._request = new XMLHttpRequest();
    this._request.addEventListener("readystatechange", this._responseHandler.bind(this));
    this._timeoutID = null;
    this.showsList = null;
   // this._informObserver = informObserver;
}
DataManager.prototype.constructor = DataManager;

/**
 * Issues XMLHTTPRequest based on passed filename string
 * @param {string}fileName
 */
DataManager.prototype.getData = function (fileName) {
    this._request.open("GET", fileName, false);
    this._timeoutID = window.setTimeout(this._timeoutHandler.bind(this), 5000);
    this._request.send(null);
};

/**
 * Processes any timeouts of the XMLHTTPRequest.  Issues a call to informObserver to update them on the status of the
 * data request
 * @private
 */
DataManager.prototype._timeoutHandler = function () {
    this._request.abort();
    console.error("Request Timed Out");
 //   this._informObserver(false);
};

/**
 * Processes the XMLHTTPRequest response.  Issues a call to informObserver to update them on the status of the
 * data request
 * @private
 */
DataManager.prototype._responseHandler = function () {
    if (this._request.readyState === 4) {
        if (this._request.status === 200) {
            window.clearTimeout(this._timeoutID);
            try {
                this.showsList = JSON.parse(this._request.responseText, this._showsReviver);
         //       this._informObserver(true);
            }
            catch (error) {
                this.showsList = null;
                console.error("Parsing Failed :" + error.name + " " + error.message);
      //          this._informObserver(false);
            }
        } else if (this._request.status !== 0) {
            window.clearTimeout(this._timeoutID);
            console.error("Error: " + request.status + ": " + request.statusText);
            this.showsList = null;
         //   this._informObserver(false);
        }
    }
};


/**
 * Converts shows JSON into objects. In particular creates a date object based on a JSON string for the "date" property
 * of an individual show.
 * @param{string} key - the name in the name value pair of the JSON string
 * being converted into an object
 * @param{string} value - the string that is to be converted into a javascript object
 */
DataManager.prototype._showsReviver = function (key, value) {
    if (key === "date") {
        value = new Date(value);
    }
    return value;
};


