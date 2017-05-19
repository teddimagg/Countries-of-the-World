//Global vars
let dataset;
let searchstring = "";
let highlight = 0;

//Initiating dataset, event listeners and calling initial render call.
window.onload = function() {
    get();

    //Event listener for input changes in search bar for "reactive" response.
    const search = document.querySelector('#search');
    search.addEventListener('input', () => {
        searchstring = search.value;
        highlight = 0;
        render();
    });
    
    //Event listener for the arrowkeys, only whilst search is selected.
    search.onkeydown = (e) => {
        const countries = document.querySelectorAll('.countries li');
        // Iterates the highlight variable in accordance to the arrow pressed
        // and prevents default to avoid caret placement functionality by arrow pressing.
        ((e.keyCode == 38) && (highlight > 0 && highlight-- && e.preventDefault()));
        ((e.keyCode == 40) && (highlight < countries.length && highlight++ && e.preventDefault()));
        
        //Rerendering if highlight is any
        renderHighlight();
    };

    //Event listener for a simple click, expands the selected country details.
    const countries = document.querySelector(".countries");
    countries.addEventListener("click", (e) => expandCountry(e.target), false);

};

// Fetches data from firebase server via ES6 fetch()
function get(){
    const url = 'https://countries-9721c.firebaseio.com/.json';
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

function renderHighlight(){
    let country = document.querySelectorAll('.countries > li')[highlight - 1];
    //TODO: REFACTOR

    //Remove all current highlights and close expansion
    document.querySelectorAll('.highlight').forEach((h) => {
        h.classList.remove('highlight');
        expandCountry(h);
    });
        
    //Highlight selected country
    if(country){
        country.classList.add('highlight');
        expandCountry(country);
    }

    //TODO: Scroll to selected country
    
}

//Expand details on certain country
function expandCountry(country){
    //Check if pressed element is li otherwise choose parent
    (country.nodeName != "LI") && (country = country.parentElement);

    //Find dataset for selected country element
    let select = dataset.find((element) => {
        return element.countryCode == country.getAttribute('code');
    });

    //HTML injection
    if(country.getAttribute('active') === 'false'){
        //If the selected country is not already active
        country.setAttribute('active', 'true');
        country.style.height = "150px";

        //Appending details window
        let details = document.createElement('div');
        details.classList.add('details');

        details.innerHTML =`
            <p>Population: <b>${numberFormat(select.population, '.')}</b></p>
            <p>Continent:  <b>${select.continent}</b></p>
            <p>Capital:    <b>${select.capital}</b></p>
        `;
        country.append(details);
    } else {
        //If the selected country is already active, disable it.
        country.setAttribute('active', 'false');
        country.style.height = "60px";

        //Removing details window, with timeout for css transition purposes.
        setTimeout(() => {
            country.querySelector('.details').remove();
        }, 200);
    }
}

// SCRAPED HELPERS - no credit taken
function numberFormat(_number, _sep){
    _number = typeof _number != "undefined" && _number > 0 ? _number : "";
    _number = _number.replace(new RegExp("^(\\d{" + (_number.length%3? _number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
    if(typeof _sep != "undefined" && _sep != " ") {
        _number = _number.replace(/\s/g, _sep);
    }
    return _number;
}