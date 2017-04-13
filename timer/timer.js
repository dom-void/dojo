document.addEventListener('DOMContentLoaded', function () {

    // taking seconds in actual 24h period from .getTime()
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;

    var actualTime = new Date().getTime(); // counting from 1 Jan 1970
    var fullDaysInActualTime = Math.floor(actualTime/days)*days;
    var daylySeconds = actualTime - fullDaysInActualTime;
    console.log(actualTime, days, fullDaysInActualTime, daylySeconds);

    var actualHours24 = daylySeconds / hours;
    var actualMinutes = (daylySeconds - Math.floor(actualHours24)*hours) / minutes;
    var actualSeconds = (daylySeconds - ((Math.floor(actualHours24)*hours) + Math.floor(actualMinutes)*minutes)) / seconds;

    var c = document.getElementById("clock");
    var ctx = c.getContext("2d");

    var centerPoint = {
        x: 150,
        y: 150
    };
    var angleOffset = -.5*Math.PI;
    var angleStart = angleOffset;
    var angleEnd = angleOffset+actualMinutes*(2*Math.PI/60);

    ctx.beginPath();
    ctx.arc(centerPoint.x,centerPoint.y,100,angleStart,angleEnd,false);
    ctx.arc(centerPoint.x,centerPoint.y,50,angleEnd,angleStart,true);
    ctx.fillStyle = 'rgba(255,255,0,.5)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerPoint.x,centerPoint.y,90,-0.5*Math.PI,.7*Math.PI,false);
    ctx.arc(centerPoint.x,centerPoint.y,40,.7*Math.PI,-0.5*Math.PI,true);
    ctx.fillStyle = 'rgba(255,0,255,.5)';
    ctx.fill();
    ctx.closePath();

    console.log(actualHours24.toFixed(2), actualMinutes.toFixed(2), actualSeconds.toFixed(2), angleEnd.toFixed(2));
    

    // TODO: hours circle run

    // TODO: minutes circle run

    // TODO: seconds circle run

    // TODO: put it inside time interval

    // TODO: try to build clock in class


})