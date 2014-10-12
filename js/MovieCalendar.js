/**
 * @file calendar file that creates an object with constructor
 * @param display and date so that the current date
 * can be passed in for updated draw - and display with boolean value
 * in order to draw either a month or week view display
 * @author Susan Taylor
 * @requires date.js to get days of week/delimited dates and CalendarApp.js to draw main portion of calendar that is
 * common to both week and month view (i.e. container), also requires DataManager.js to create a DataManager object
 * and use DataManager functions to manage retrieval of json data from json files
 * in order to append data to HTML elements.
 * @version 1.2
 */
"use strict";
/**
 *
 * @param {Date} date
 * @constructor
 */
function MovieCalendar(date){
    this._date = date;
    this._dataManager = new DataManager();
    this._dataManager.getData("data/" + this._date.getXDelimDate()+ ".json");
    this._showsList = this._dataManager.showsList;
}

/*function to draw calendar with if/else loop for boolean value - true will draw month view and append
html elements for month view - false will draw week view and append html elements for weekview*/

MovieCalendar.prototype.draw = function() {

    var calendarDiv = document.getElementById("calendarDiv");
    this.clearCalendar();
    var subheaderDiv = document.createElement("div");
    subheaderDiv.className = "subheader";
    calendarDiv.appendChild(subheaderDiv);
    subheaderDiv.appendChild(document.createTextNode(this._date.getMonthWord() + " " + this._date.getFullYear()));
    var sidebarDiv = document.createElement("div");
    sidebarDiv.className = "sidebar";
    sidebarDiv.id = "sidebar";
    calendarDiv.appendChild(sidebarDiv);
    var movieDate = document.createTextNode(this._date.getDayWord() + " " + this._date.getMonthWord()
        + " " + this._date.getDate()+ ", " + this._date.getFullYear());
    sidebarDiv.appendChild(movieDate);

    if (viewMonth) {
        calendarDiv.appendChild(this.makeHeaderWeek());
        calendarDiv.appendChild(this.makeMonth());
    }
    else {
        calendarDiv.appendChild(this.makeHeaderWeek());
        calendarDiv.appendChild(this.makeWeek(this._date));
    }
};
//function to navigate forward by month or week

MovieCalendar.prototype.navigateNext = function() {

    if (viewMonth) {
        this._date.incrementByMonth();
       }
        else {
            this._date.incrementByWeek();
        }
    this._dataManager.getData("data/" + this._date.getXDelimDate()+ ".json");
    this._showsList = this._dataManager.showsList;
    this.draw();
};

//function to navigate backward by month or week

MovieCalendar.prototype.navigatePrevious = function() {
    if (viewMonth) {
        this._date.decrementByMonth();
    }
    else {
        this._date.decrementByWeek();
    }
    this._dataManager.getData("data/" + this._date.getXDelimDate()+ ".json");
    this._showsList = this._dataManager.showsList;
    this.draw();
};

//function to make header with days of week

MovieCalendar.prototype.makeHeaderWeek = function () {
    var weekDiv = document.createElement("div");
    weekDiv.className = "headerweek";
    weekDiv.id = "w" + this._date.getDelimDate();

    for (var i = this._date.getWeekStart(); i <= this._date.getWeekEnd(); i.incrementByDay()) {
        var dayDiv = document.createElement("div");
        dayDiv.className = "headerday";
        dayDiv.id = "d" + i.getDelimDate();
        dayDiv.appendChild(document.createTextNode(i.getDayWord()));
        weekDiv.appendChild(dayDiv);
    }
    return weekDiv;
};

//function to create month div with nested week divs and nested day divs

MovieCalendar.prototype.makeMonth = function () {
    var monthDiv = document.createElement("div");
    monthDiv.className = "month";
    monthDiv.id = "m" + this._date.getDelimDate();

    for (var i = this._date.getMonthStart().getWeekStart(); i <= this._date.getMonthEnd().getWeekEnd(); i.incrementByWeek()){
       var weekDiv = this.makeWeek(i);
       monthDiv.appendChild(weekDiv);
    }
    return monthDiv;
};

//function to create week divs with nested day divs for week view

MovieCalendar.prototype.makeWeek = function (focusDate) {
    var weekDiv = document.createElement("div");
    weekDiv.className = "week";
    weekDiv.id = "w" + this._date.getDelimDate();

    for (var i = focusDate.getWeekStart(); i <= focusDate.getWeekEnd(); i.incrementByDay()) {
        var dayDiv = document.createElement("div");
        dayDiv.className = "day";
        var delimDate = i.getDelimDate();
        dayDiv.id = "d"+ delimDate;
        dayDiv.appendChild(document.createTextNode(" " + i.getDate()));
        if(delimDate == this._date.getDelimDate()){
            dayDiv.classList.toggle("dayactive");
        }
        dayDiv.addEventListener("click",this.storeDay.bind(this),true);

/*the below creates a new div called moviediv inside each day div to append movie titles and movie duration for each
day to each day div.*/

        for (var show in this._showsList[delimDate]){
            var movieDiv = document.createElement("div");
            movieDiv.className = "moviediv";
            movieDiv.id = show;
            movieDiv.classList.toggle("active");

           var movietime = this._showsList [delimDate] [show].date.getHours() + ":"
               + this._showsList [delimDate] [show].date.getMinutes();

            var title = this._showsList[delimDate][show].title;
            var duration = this._showsList[delimDate][show].dur;

            movieDiv.appendChild(document.createTextNode(movietime + "  "));

            movieDiv.appendChild(document.createTextNode(title));

            movieDiv.appendChild(document.createTextNode(" " + duration + " min. "));
            movieDiv.addEventListener("click",this.getDetails.bind(this), false);
            dayDiv.appendChild(movieDiv);
        }
        weekDiv.appendChild(dayDiv);
    }
    return weekDiv;
};

//function to clear calendar of appended divs before calendar is re-drawn

MovieCalendar.prototype.clearCalendar = function() {
    var calendarDiv = document.getElementById("calendarDiv");

    while (calendarDiv.firstChild) {
        calendarDiv.removeChild(calendarDiv.firstChild);
    }
};
//function to draw fields to enter date to go to when go to button is clicked

MovieCalendar.prototype.goToDate = function() {

    var calendarDiv = document.getElementById("calendarDiv");
    this.clearCalendar();

    var inputYear = document.createElement("input");
    inputYear.id = "Year";
    calendarDiv.appendChild(inputYear);
    var inputYearName = document.createTextNode("Year");
    calendarDiv.appendChild(inputYearName);

    var inputMonth = document.createElement("input");
    inputMonth.id = "Month";
    calendarDiv.appendChild(inputMonth);
    var inputMonthName = document.createTextNode("Month");
    calendarDiv.appendChild(inputMonthName);

    var inputDay = document.createElement("input");
    inputDay.id = "Day";
    calendarDiv.appendChild(inputDay);
    var inputDayName = document.createTextNode("Day");
    calendarDiv.appendChild(inputDayName);

    var submitDate = document.createElement("button");
    submitDate.id="submit";
    calendarDiv.appendChild(submitDate);
    var submitDateName = document.createTextNode("Submit");
    submitDate.appendChild(submitDateName);
    document.getElementById("submit").addEventListener("click", this.goToNewDate.bind(this), false);

};
/*
function to take dates entered into text fields, parse numbers entered, set the new date
to the entered date and redraw calendar for that date redrawing it to either weekview or monthview
in accordance with whichever view type is displayed before a new date is entered
*/

MovieCalendar.prototype.goToNewDate = function() {

    this._date = new Date(parseInt(document.getElementById("Year").value),
        parseInt(document.getElementById("Month").value)-1,
        parseInt(document.getElementById("Day").value));

    this._dataManager.getData("data/" + this._date.getXDelimDate()+ ".json");
    this._showsList = this._dataManager.showsList;
    this.draw();

};

/*function to store day to set active day on click - the click is the event which is the
parameter for the function*/

MovieCalendar.prototype.storeDay = function (event){
    var dateParts = event.currentTarget.id.split("_");
    console.log(dateParts[0].slice(1) + " " + dateParts[1] + " " + dateParts[2]);

/*the date constructor assumes a zero indexed month below this sets the active date
by taking the numbers in the array and converting the month parameter to a zero index*/

    this._date = new Date(dateParts[0].slice(1), parseInt(dateParts[1]) - 1, dateParts[2]);
};

/*function to clear shows list on click event so that show details do not append to the pane
and only show details for one movie*/

MovieCalendar.prototype.clearShowsList = function() {
    var sidebarDiv = document.getElementById("sidebar");

    while (sidebarDiv.firstChild) {
        sidebarDiv.removeChild(sidebarDiv.firstChild);
    }
    var movieDate = document.createTextNode(this._date.getDayWord() + " " + this._date.getMonthWord()
        + " " + this._date.getDate()+ ", " + this._date.getFullYear());
    sidebarDiv.appendChild(movieDate);
};

/*function to get show description by passing in the delimDate and accessing the array
of movie details, creating a div for details inside sidebar, creating text nodes for movie description
and movie duration*/

MovieCalendar.prototype.getDetails = function(event){
     var sidebarDiv;
     this.clearShowsList();
     var movieId = event.currentTarget.id;
     var delimDate = this._date.getDelimDate();

    for (var show in this._showsList[delimDate]){

        if (show==movieId){
            var details = this._showsList[delimDate][show].descr;
            sidebarDiv=document.getElementById("sidebar");
            var movieDetailsDiv = document.createElement("div");
            movieDetailsDiv.id = "moviedetailsdiv";
            sidebarDiv.appendChild(movieDetailsDiv);
            movieDetailsDiv = document.getElementById("moviedetailsdiv");
            movieDetailsDiv.appendChild(document.createTextNode(" " + details));
            details.className="details";
            var time = this._showsList[delimDate][show].dur;
            sidebarDiv.appendChild(document.createTextNode(" " + time + " minutes."));
            break;
        }
    }
};