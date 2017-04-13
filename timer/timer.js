document.addEventListener('DOMContentLoaded', function () {

    // taking seconds in actual 24h period from .getTime()
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;




    var dial = {
        centerX: 150,
        centerY: 150,
        innerRadius: 50,
        outerRadius: 100,
        angleOffset: -.5 * Math.PI,
        angleStart: this.angleOffset,
        canvas: document.getElementById("clock"),
        context: this.canvas.getContext("2d"),
        // angleEnd: this.angleStart,

        draw: function (angle) {
            this.angleEnd = angle;
            this.context.beginPath();
            this.context.arc(this.centerX, this.centerY, this.innerRadius, this.angleStart, angle, false);
            this.context.arc(this.centerX, this.centerY, this.outerRadius, angle, this.angleStart, true);
            this.context.fillStyle = 'rgba(255,255,0,.5)';
            this.context.fill();
            this.context.closePath();
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
    //     context.clearRect(0, 0, canvas.width, canvas.height);
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