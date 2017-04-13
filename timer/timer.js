document.addEventListener('DOMContentLoaded', function () {

    // taking seconds in actual 24h period from .getTime()
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;

    var canvas = document.getElementById("clock");
    var context = canvas.getContext("2d");



    var dial = {
        centerX: 150,
        centerY: 150,
        innerRadius: 50,
        outerRadius: 100,
        angleOffset: -.5 * Math.PI,
        angleStart: this.angleOffset,
        // angleEnd: this.angleStart,

        draw: function (angle) {
            console.log(angle);
            
            this.angleEnd = angle;
            context.beginPath();
            context.arc(this.centerX, this.centerY, this.innerRadius, this.angleStart, angle, false);
            context.arc(this.centerX, this.centerY, this.outerRadius, angle, this.angleStart, true);
            context.fillStyle = 'rgba(255,255,0,.5)';
            context.fill();
            context.closePath();
        }
    }

    dial.draw(5);

    // window.requestAnimationFrame = (function () {
    //     return window.requestAnimationFrame ||
    //         window.webkitRequestAnimationFrame ||
    //         window.mozRequestAnimationFrame ||
    //         window.oRequestAnimationFrame ||
    //         window.msRequestAnimationFrame ||
    //         function (callback) {
    //             window.setTimeout(callback, 1000 / 60);
    //         };
    // })();

    // window.addEventListener('load', function () {
    //     window.requestAnimationFrame(drawLoop);
    // }, false);

    // function drawLoop() {
    //     var actualTime = new Date().getTime(); // counting from 1 Jan 1970
    //     var fullDaysInActualTime = Math.floor(actualTime / days) * days;
    //     var daylySeconds = actualTime - fullDaysInActualTime;
    //     // console.log(actualTime, days, fullDaysInActualTime, daylySeconds);

    //     var actualHours24 = daylySeconds / hours;
    //     var actualMinutes = (daylySeconds - Math.floor(actualHours24) * hours) / minutes;
    //     var actualSeconds = (daylySeconds - ((Math.floor(actualHours24) * hours) + Math.floor(actualMinutes) * minutes)) / seconds;
    //     var angle = dial.angleOffset + actualSeconds * (2 * Math.PI / 60)
    //     dial.context.clearRect(0, 0, dial.canvas.width, dial.canvas.height);
    //     // dial.centerX += 2;
    //     dial.draw(5);
    //     console.log(actualHours24.toFixed(2), actualMinutes.toFixed(2), actualSeconds.toFixed(2));
    //     window.requestAnimationFrame(drawLoop);
    // }



    // TODO: hours circle run

    // TODO: minutes circle run

    // TODO: seconds circle run

    // TODO: put it inside time interval

    // TODO: try to build clock in class


})