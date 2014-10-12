JavaScript project - Dynamic Calendar 
Author:  Susan Taylor

Required files:

DataManager.js - author: Tom Lane - this file is used to create a DataManager object and functions from this file 
are used to manage retrieval of data from json files.  The inform observer statements of functions in this file
are commented out as data is retrieved synchronously.

date.js - author: Tom Lane

MovieCalendar.js - author: Susan Taylor - calendar file that creates MovieCalendar object with constructor.

CalendarApp.js - author: Susan Taylor - main calendar app file that writes the html to the browser page on load to create 
elements of calendar that are common to both week and month views of calendar page.

calApp.css - author: Susan Taylor - css file used to style html elements

2014_10.json, 2013_12.json, 2014_01.json, 2014_02.json - json files containing data including movie details, show times,
titles, durations and dates

Calendar.html - html file used to view calendar in browser which contains links to all required JavaScript and css files 

Current unresolved issues - (a) cannot properly format header showing the days of the week for the weekview;
(b) active day is not highlighted with a border on the day.  I originally had this functioning properly but once
I retrieved data, I could not get the active day to highlight - it is the divs inside the day which contain
movie details that are set
to active.