/**
 * @file file for week view that writes the html to the browser page on load
 * @author Susan Taylor
 * @requires date.js to get days of week/delimited dates
 * @version 1.0
 */

"use strict";


function main(){

    var calendarDiv = document.createElement("div");
    calendarDiv.className = "calendar";
    var headerDiv = document.createElement("div");
    headerDiv.className = "header";
    var footerDiv = document.createElement("div");
    footerDiv.className = "footer";
    var sidebarDiv = document.createElement("div");
    sidebarDiv.className = "sidebar";


    document.body.appendChild(headerDiv);
    document.body.appendChild(calendarDiv);
    document.body.appendChild(footerDiv);
    calendarDiv.appendChild(sidebarDiv);

    var showDetails = document.createTextNode("Show Details");
    sidebarDiv.appendChild(showDetails);


    //this appends weeks to the calendar using the make week function to create the html week divs for current month

    calendarDiv.appendChild(makeWeekview(new Date()));


    var cinemaName = document.createTextNode("Hollywood Theatre Showings");
    headerDiv.appendChild(cinemaName);

    var previousButton = document.createElement("button");
    previousButton.className = "previous";
    footerDiv.appendChild(previousButton);
    var previousButtonName = document.createTextNode("<< Previous ");
    previousButton.appendChild(previousButtonName);

    var monthweekButton = document.createElement("button");
    monthweekButton.className = "monthweek";
    footerDiv.appendChild(monthweekButton);
    var monthweekButtonName = document.createTextNode ("Month/Week");
    monthweekButton.appendChild(monthweekButtonName);

    var gotoButton = document.createElement("button");
    gotoButton.className = "goto";
    footerDiv.appendChild(gotoButton);
    var gotoButtonName = document.createTextNode("Go To");
    gotoButton.appendChild(gotoButtonName);


    var nextButton = document.createElement("button");
    nextButton.className = "next";
    footerDiv.appendChild(nextButton);
    var nextButtonName = document.createTextNode(" Next >> ");
    nextButton.appendChild(nextButtonName);

    document.getElementById("addEventListener").addEventListener("click",clicked,false);
    document.getElementById("button").onclick = clicked;
    document.body.addEventListener("click", clicked, true);


}
//Register the main function to run on window loading
window.addEventListener("load",main,false);

/** function to create week divs for an entire month
 @param (day), parameter is day
 function uses date.js file to get week start and end in order to increment by day and loop through days to
 create week divs for an entire month.  also appends text nodes to the divs to display the current date
 */

var makeWeekview = function (day) {
    var weekDiv = document.createElement("div");
    weekDiv.className = "week";
    weekDiv.id = "w" + day.getDelimDate();

    for (var i = day.getWeekStart(); i <= day.getWeekEnd(); i.incrementByDay()) {
        var dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.id = "d"+ i.getDelimDate();
        dayDiv.appendChild(document.createTextNode(i.getDayWord()));
        dayDiv.appendChild(document.createTextNode(" " + i.getDate()));
        weekDiv.appendChild(dayDiv);

    }
    return weekDiv;
};