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
    Time.prototype.getTimeValue = function (name) {
        switch (name) {
            case 'seconds':
                return this.actualSeconds;
                break;
            case 'minutes':
                return this.actualMinutes;
                break;
            case 'hours':
                return this.actualHours;
                break;
            default:
                console.log('wrong setTimeParameters() param: "seconds", "minutes" or "hours"');
                break;
        }
    }
    var time = new Time();

    var angleStart = -.5 * Math.PI;

    function Dial(name, innerRad, outerRad, color) {
        this.name = name;
        this.centerX = 150;
        this.centerY = 150;
        this.innerRadius = innerRad;
        this.outerRadius = outerRad;
        this.angleOffset = -.5 * Math.PI;
        this.angleTimerStart;
        this.angleStart; // (function () { return this.angleOffset; })();
        this.angleEnd;
        this.fullDialValue = 60;
        this.color = color;
    }
    Dial.prototype.setStart = function (mode) {
        switch (mode) {
            case 'clock':
                this.angleStart = this.angleOffset;
                break;
            case 'timer':
                this.angleStart = this.angleTimerStart;
                break;
            default:
                console.log('wrong setStart() param: "clock" or "timer"');
                break;
        }
    }
    Dial.prototype.setAngle = function (side) {
        time.setTimeParameters();
        switch (side) {
            case 'start':
// FIXME: ▲▼ check why this already gives about 1h and few minutes on start or reset
                this.angleTimerStart = this.angleOffset + time.getTimeValue(this.name) * (2 * Math.PI / this.fullDialValue);
                break;
            case 'end':
                this.angleEnd = this.angleStart + time.getTimeValue(this.name) * (2 * Math.PI / this.fullDialValue);
                break;
            default:
                console.log('wrong setAngle() param: "start" or "end"');
                break;
        }
    }
    Dial.prototype.draw = function () {
        // this.angleStart = angleStart;
        // this.angleEnd = angleEnd;
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.innerRadius, this.angleStart, this.angleEnd, false);
        context.arc(this.centerX, this.centerY, this.outerRadius, this.angleEnd, this.angleStart, true);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    var hoursColor = 'rgba(255,0,0,.7)';
    var minutesColor = 'rgba(0,0,255,.5)';
    var secondsColor = 'rgba(255,255,0,.5)';

    var hoursDial = new Dial('hours', 60, 140, hoursColor);
    hoursDial.fullDialValue = 12;
    var minutesDial = new Dial('minutes', 40, 120, minutesColor);
    var secondsDial = new Dial('seconds', 20, 100, secondsColor);
// FIXME: ▼ check why it's not starting itself
    hoursDial.setAngle('start');
    minutesDial.setAngle('start');
    secondsDial.setAngle('start');


    // window.requestAnimationFrame = function (callback) {
    //     window.setTimeout(callback, 1000 / 1);
    // };

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
        // clock
        hoursDial.setStart('clock');
        minutesDial.setStart('clock');
        secondsDial.setStart('clock');
    })
    document.getElementById('button2').addEventListener('click', function () {
        // timer
        hoursDial.setStart('timer');
        minutesDial.setStart('timer');
        secondsDial.setStart('timer');
    })
    document.getElementById('button3').addEventListener('click', function () {
        // smooth
        console.log('działa');

        if (switcher) {
            switcher = false;
        } else {
            switcher = true;
        }
        window.requestAnimationFrame(drawLoop);
        return switcher;
    })
    document.getElementById('button4').addEventListener('click', function () {
        // reset timer
        hoursDial.setAngle('start');
        minutesDial.setAngle('start');
        secondsDial.setAngle('start');
    })


    window.addEventListener('load', function () {
        window.requestAnimationFrame(drawLoop);
    }, false);

    function drawLoop() {
        hoursDial.setAngle('end');
        minutesDial.setAngle('end');
        secondsDial.setAngle('end');
        context.clearRect(0, 0, canvas.width, canvas.height);
        hoursDial.draw();
        minutesDial.draw();
        secondsDial.draw();
        window.requestAnimationFrame(drawLoop);
    }
})