/**
 * @author tlane
 * @version $Revision: 765 $
 * $Date: 2013-11-22 08:47:31 -0800 (Fri, 22 Nov 2013) $
 *
 * Creates a DataManager instance binding it to the button, input field, and output area of the page.
 * @classdesc A simple object type that retrieves show data using a Data Manager and updates a web page with the
 * retrieved data
 * @constructor
 */
function DataManagerApp() {
    //Associate page elements with variables and register event handlers
    this._getDataBtn = document.getElementById("getData");
    this._output = document.getElementById("output");
    this._getDataBtn.addEventListener("click",this.getData.bind(this));

    //Create a Data Manager and pass in the a bound call to the Applications printData
    //this will act as the "callback": informObserver within the Data Manager object type
    this._dm = new DataManager(this.printData.bind(this));

}

DataManagerApp.prototype.constructor = DataManagerApp;

/**
 * Outputs a string containing all of the shows held by the Data Manager in its showslist to the output area of the page
 * @param {boolean} isData
 */
DataManagerApp.prototype.printData = function(isData){
    this._output.textContent = "";
    if(isData){
        for(var day in this._dm.showsList){
            this._output.textContent += day + "\n";
            for(var show in this._dm.showsList[day]){
                this._output.textContent += "\t" + show + "\n";
                this._output.textContent += "\t\t" + this._dm.showsList[day][show].title + "\n";
                this._output.textContent += "\t\t" + this._dm.showsList[day][show].date.getTime() + "\n";
                this._output.textContent += "\t\t" + this._dm.showsList[day][show].dur + "\n";
                this._output.textContent += "\t\t" + this._dm.showsList[day][show].descr + "\n";
            }
        }
    } else {
        this._output.textContent = "Data Retrieval Error see console for details"
    }
};

/**
 * Handles the getData Button Click by passing the file name to the Data Manager for data retrieval
 */
DataManagerApp.prototype.getData = function(){
    this._dm.getData(document.getElementById("filename").value);
};

//Create a DataManagerApp when the page loads.
window.addEventListener("DOMContentLoaded", function(){var dma = new DataManagerApp();});
