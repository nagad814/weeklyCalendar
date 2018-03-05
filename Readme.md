# Project Title

Week View Calendar Challenge

## Challenge Description

Create a week view calendar for mobile devices. The view should show a 5-day week on portrait, and 7-day week on landscape orientation. Only client side code is necessary. Add at least two events to the calendar. The calendar should be able to read data asynchronously (e.g. XHR, WebSQL, etc.)

Constraints 
Allowed technologies

Any or a mix of: React Native, JavaScript, HTML5, CSS3, Objective C, media queries

## Thought process

1) Create a something similar to excel.
2) Since it should scroll vertically, and hide extra columns. Use rows!
3) Lets make each row, represent 1 hr.
4) Create a row with cells, that can take in child components.
5) Create tasks as child compoents at Row level and pass that into cells that require it.
6) Can we used Virtualizedlist here. Yes.. however did not use it. Read Learnings to know more.

## Tests that ran

I ran, manual test. Since thats what i know.

1) By changing startDay, to see if calendar is working as expected.
2) Adding events that over lap, to see if all events are displayed. 
3) If an event is created, with end time before start time. It is not displayed.
4) If an event is added to hiden date, it will be shown on rotation

### Test that failed

1) If event is less than 1 hr. it does not display
2) When startDay is set to 0, vertical view does not show sunday. 

## Learnings
There were lots of learings

1) Not to use multiple flatlist inside a single component.
2) Creating muliple cells layout using virtualized list, can create similar results. However i feel that,
    1) This leads to a more complex code. 
    2) Can trigger more updates, while during rotation. Had issues with the same.
3) Write lots of comments discribing each helper function.
4) Make code readable.

## What i would like improve

1) Move all of the in line styles to css.
2) Write test.
3) My writing skills.


## Built With
```
"moment": "^2.21.0",
"react": "16.2.0",
"react-native": "0.53.3"
```
Moment.js was used, this was to make handling time easier.


## Authors

* **Naga durga prasad E** - *Initial work* - [WeeklyCalendar](https://github.com/nagad814/weeklyCalendar)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
    randCol 
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript


* Inspiration
    Apple calendar Apps week view.