"use strict";

let counter = {
    _state: 0,
    add() {
        this._state += 1;
    },
    reset() {
        this._state = 0;
    },
    get state() {
        return this._state;
    },
    render() {
        return `${this._state}`;
    }
};

let app = document.getElementById("app");
let button = document.getElementById("button");
let reset = document.getElementById("reset");

button.addEventListener("click", () => {
    counter.add();
    app.innerHTML = counter.render();
});

reset.addEventListener("click", () => {
    counter.reset();
    app.innerHTML = counter.render();
})

app.innerHTML = `${counter.state}`;