/**
 * @file main calendar app file that writes the html to the browser page on load to create elements
 * of calendar that are common to both week and month views of calendar page
 * @author Susan Taylor
 * @requires date.js to get days of week/delimited dates and MovieCalendar.js to access
 * functions of object MovieCalendar and to create objects using MovieCalendar prototype
 * @version 1.2
 */

"use strict";
var viewMonth=true;

/** main function that draws common parts of calendar*/

function main(){

    var calendarDiv = document.createElement("div");
    calendarDiv.className = "calendar";
    calendarDiv.id = "calendarDiv";
    var headerDiv = document.createElement("div");
    headerDiv.className = "header";
    headerDiv.id = "header";
    var footerDiv = document.createElement("div");
    footerDiv.className = "footer";

    document.body.appendChild(headerDiv);
    document.body.appendChild(calendarDiv);
    document.body.appendChild(footerDiv);

    var cinemaName = document.createTextNode("Hollywood Theatre Showings");
    cinemaName.id = "cinemaName";
    headerDiv.appendChild(cinemaName);

    var previousButton = document.createElement("button");
    previousButton.id = "previous";
    footerDiv.appendChild(previousButton);
    var previousButtonName = document.createTextNode("<< Previous ");
    previousButton.appendChild(previousButtonName);

    var monthweekButton = document.createElement("button");
    monthweekButton.id = "monthweek";
    footerDiv.appendChild(monthweekButton);
    var monthweekButtonName = document.createTextNode("Week");
    monthweekButton.appendChild(monthweekButtonName);

    var gotoButton = document.createElement("button");
    gotoButton.id = "goto";
    footerDiv.appendChild(gotoButton);
    var gotoButtonName = document.createTextNode("Go To");
    gotoButton.appendChild(gotoButtonName);

    var nextButton = document.createElement("button");
    nextButton.id = "next";
    footerDiv.appendChild(nextButton);
    var nextButtonName = document.createTextNode(" Next >> ");
    nextButton.appendChild(nextButtonName);

    document.getElementById("monthweek").addEventListener("click", changeView, false);
    document.getElementById("next").addEventListener("click", forwardTime, false);
    document.getElementById("previous").addEventListener("click", reverseTime, false);
    document.getElementById("goto").addEventListener("click", goToTime, false);

    var movieCalendar = new MovieCalendar(new Date());
    movieCalendar.draw();

/*this function uses boolean values and an if else statement to switch between month and week views
- the function is called by the monthweek button by adding an event listener and telling it to
switch the view by calling changeView function on click.
 */

function changeView() {
        if (viewMonth) {
            viewMonth=false;
            document.getElementById("monthweek").textContent="Month";
        }
        else {
            viewMonth=true;
            document.getElementById("monthweek").textContent="Week";
        }
        var movieCalendar = new MovieCalendar(new Date());
        movieCalendar.draw();
    }

/*function to go to next month on click of next button by calling navigateNext function of
MovieCalendar prototype*/

function forwardTime() {
     movieCalendar.navigateNext();
  }
/*function to go to previous month on click of next button by calling navigatePrevious
function of MovieCalendar prototype*/

function reverseTime() {
     movieCalendar.navigatePrevious();
 }
/*function to select any date and display for that date by calling goToDate function
     of MovieCalendar prototype*/

function goToTime() {
     movieCalendar.goToDate();
 }
}

//Register the main function to run on window loading
window.addEventListener("load",main,false);















