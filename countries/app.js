function loadData(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then((res) => {
            //then też zwraca nam obietnicę
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Http error: ${res.status}`);
            }
        });
}

async function renderData(value) {
    loadData(value)
        .then((res) => {
            console.log(res[0].name);
            document.querySelector('#app').insertAdjacentHTML("afterbegin", `<img src=${res[0].flag} width=200 style="border: 1px solid gray;">`);
        })
        .catch((err) => {
            console.error(err);
        });
}

const search = document.querySelector('#search');
search.addEventListener('input', function (val) {
    console.log(this.value.length);
    if (this.value.length > 2) {
        renderData(this.value);
    }
});