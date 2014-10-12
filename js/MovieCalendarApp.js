/**
 * @file movie calendar app file that creates an object with methods
 * with parameters of view type and date so that the current date
 * can be passed in for updated draw - and view type with boolean value
 * in order to draw either a month or week view
 * @author Susan Taylor
 * @requires date.js to get days of week/delimited dates and monthview.js to draw main portion of calendar that is
 * common to both week and month view (i.e. container)
 * @version 1.2
 */
"use strict";


function MovieCalendar(element, date){
    this._container = element;
    this.date = date;
}

MovieCalendar.prototype._drawCalendar = function(){

    this._container.appendChild(this.makeHeaderWeek);
    this._container.appendChild(this.makeMonth);

};

MovieCalendar.prototype.makeHeaderWeek = function (day) {
    var weekDiv = document.createElement("div");
    weekDiv.className = "headerweek";
    weekDiv.id = "w" + day.getDelimDate();

    for (var i = day.getWeekStart(); i <= day.getWeekEnd(); i.incrementByDay()) {
        var dayDiv = document.createElement("div");
        dayDiv.className = "headerday";
        dayDiv.id = "d"+ i.getDelimDate();
        dayDiv.appendChild(document.createTextNode(i.getDayWord()));
        weekDiv.appendChild(dayDiv);
    }
    return weekDiv;

};

MovieCalendar.prototype.makeMonth = function (day) {
    var monthDiv = document.createElement("div");
    monthDiv.className = "month";
    monthDiv.id = "m" + day.getDelimDate();

    for (var i = day.getMonthStart().getWeekStart(); i <= day.getMonthEnd().getWeekEnd(); i.incrementByWeek()){
        var weekDiv = makeWeek(i);
        monthDiv.appendChild(weekDiv);
    }
    return monthDiv;
};

