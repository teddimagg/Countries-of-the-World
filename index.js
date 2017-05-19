// PURE JS FIREBASE API CALL
let dataset;
let searchstring = "";

window.onload = function() {
    get();

    //SEARCH EVENT LISTENER
    const search = document.querySelector('#search');
    search.addEventListener('input', () => {
        searchstring = search.value;
        render();
    });

    //COUNTRY DETAILS LISTENER
    const countries = document.querySelector(".countries");
    countries.addEventListener("click", (e) => expandCountry(e.target), false);
};

// Fetches data from firebase server via ES6 fetch()
function get(){
    const url = 'https://staticbasetest.firebaseio.com/.json';
    fetch(url).then((response) => {
        response.json().then((data) => {
            dataset = data.countries.country;
            render();
        });
    });
}

// Render function for dataset with regards to search
function render(){
    const countries = document.querySelector('.countries');
    countries.innerHTML = "";
    for(let key in dataset){
        if(!searchstring || dataset[key].countryName.toLowerCase().includes(searchstring.toLowerCase())){
            let li = document.createElement('li');
            li.setAttribute('code', dataset[key].countryCode);
            li.setAttribute('active', 'false');
            li.innerHTML = `
                <img
                    src="https://lipis.github.io/flag-icon-css/flags/4x3/${dataset[key].countryCode.toLowerCase()}.svg"
                    alt="${dataset[key].countryName}"
                />

                <h2>${dataset[key].countryName}</h2>
            `;
            countries.append(li);
        }
    }
}

//Expand details on certain country
function expandCountry(country){
    let select = dataset.find((element) => {
        return element.countryCode == country.getAttribute('code');
    });

    if(country.getAttribute('active') === 'false'){
        country.setAttribute('active', 'true');
        country.style.height = "150px";

        //appending details window
        let details = document.createElement('div');
        details.classList.add('details');

        details.innerHTML =`
            <p>Population: <b>${numberFormat(select.population)}</b></p>
            <p>Continent: <b>${select.continent}</b></p>
            <p>Population: <b>${select.capital}</b></p>
        `;
        country.append(details);

    } else {
        country.setAttribute('active', 'false');
        country.style.height = "60px";

        //removing details window
        setTimeout(() => {
            country.querySelector('.details').remove();
        }, 200);
    }
}

// HELPERS
function numberFormat(_number, _sep){
    _number = typeof _number != "undefined" && _number > 0 ? _number : "";
    _number = _number.replace(new RegExp("^(\\d{" + (_number.length%3? _number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
    if(typeof _sep != "undefined" && _sep != " ") {
        _number = _number.replace(/\s/g, _sep);
    }
    return _number;
}