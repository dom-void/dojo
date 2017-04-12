document.addEventListener('DOMContentLoaded', function () {

    // taking seconds in 24h period from .getTime()
    var dayOffset = 1000*60*60*24;
    var actualTime = new Date().getTime();
    var daysInActualTime = Math.floor(actualTime/(dayOffset))*dayOffset;
    var daySeconds = actualTime - daysInActualTime;
    console.log(actualTime, dayOffset, daysInActualTime, daySeconds);

    // TODO: hours circle run

    // TODO: minutes circle run

    // TODO: seconds circle run

    // TODO: put it inside time interval

    // TODO: try to build clock in class


})