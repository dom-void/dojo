document.addEventListener('DOMContentLoaded', function () {

    // taking seconds in actual 24h period from .getTime()
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var halfDays = hours * 12;
    var days = 2 * halfDays;

    var canvas = document.getElementById("clock");
    var context = canvas.getContext("2d");

    var switcher = true;

    function Time() {
        this.actualHours;
        this.actualMinutes;
        this.actualSeconds;
    }
    Time.prototype.timeGet = function () {
        var date = new Date();
        var timeZoneOffset = date.getTimezoneOffset() * minutes;
        var actualTime = date.getTime() - timeZoneOffset; // counting from 1 Jan 1970
        return actualTime;
    }
    Time.prototype.setTimeParameters = function () {
        var actualTime = this.timeGet();
        var fullDaysInActualTime = Math.floor(actualTime / halfDays) * halfDays;
        var daylySeconds = actualTime - fullDaysInActualTime;
        this.actualHours = (daylySeconds / hours).toFixed(2);
        this.actualMinutes = ((daylySeconds - Math.floor(this.actualHours) * hours) / minutes).toFixed(2);
        this.actualSeconds = ((daylySeconds - ((Math.floor(this.actualHours) * hours) + Math.floor(this.actualMinutes) * minutes)) / seconds).toFixed(2);
    }
    var time = new Time();

    var angleStart = -.5 * Math.PI;

    function Dial(innerRad, outerRad, color) {
        this.centerX = 150;
        this.centerY = 150;
        this.innerRadius = innerRad;
        this.outerRadius = outerRad;
        this.angleOffset = -.5 * Math.PI;
        this.angleStart = Math.PI; // (function () { return this.angleOffset; })();
        this.angleEnd = 0;
        this.color = color;
    }
    Dial.prototype.draw = function (angleStart, angleEnd) {
        this.angleStart = angleStart;
        this.angleEnd = angleEnd;
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.innerRadius, angleStart, angleEnd, false);
        context.arc(this.centerX, this.centerY, this.outerRadius, angleEnd, angleStart, true);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    var hoursColor = 'rgba(255,0,0,.7)';
    var minutesColor = 'rgba(0,0,255,.5)';
    var secondsColor = 'rgba(255,255,0,.5)';

    var hoursDial = new Dial(60, 140, hoursColor);
    var minutesDial = new Dial(40, 120, minutesColor);
    var secondsDial = new Dial(20, 100, secondsColor);


    // window.requestAnimationFrame = function (callback) {
    //     window.setTimeout(callback, 1000 / 1);
    // };
    document.getElementById('button3').addEventListener('click', function () {
        console.log('działa');
        
        if (switcher) {
            switcher = false;
        } else {
            switcher = true;
        }
        window.requestAnimationFrame(drawLoop);
        return switcher;
    })

    window.requestAnimationFrame = (function () {
        if (switcher) {
            return function (callback) {
                window.setTimeout(callback, 1000 / 1);
            }
        } else {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }
    })();


    document.getElementById('button1').addEventListener('click', function () {
        angleStart = -.5 * Math.PI;
        hoursDial.angleStart = hoursDial.angleOffset;
    })
    document.getElementById('button2').addEventListener('click', function () {
        hoursDial.angleStart = Math.PI;
    })
    

    window.addEventListener('load', function () {
        window.requestAnimationFrame(drawLoop);
    }, false);

    function drawLoop() {
        time.setTimeParameters();

        var secondsAngleEnd = secondsDial.angleStart + time.actualSeconds * (2 * Math.PI / 60);
        var minutesAngleEnd = minutesDial.angleStart + time.actualMinutes * (2 * Math.PI / 60);
        var hoursAngleEnd = minutesDial.angleStart + time.actualHours * (2 * Math.PI / 12);
        context.clearRect(0, 0, canvas.width, canvas.height);
        hoursDial.draw(hoursDial.angleStart, hoursAngleEnd);
        minutesDial.draw(angleStart, minutesAngleEnd);
        secondsDial.draw(angleStart, secondsAngleEnd);
        window.requestAnimationFrame(drawLoop);
    }
})