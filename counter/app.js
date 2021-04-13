let counter = {
    _state: 0,
    set add(x) {
        this._state += x;
    },
    get state() {
        return this._state;
    }
};

let app = document.getElementById("app");
let button = document.getElementById("button");
button.addEventListener("click", () => {
    counter.add = 1;
    return (app.innerHTML = `${counter.state}`);
});

app.innerHTML = `${counter.state}`;
