// PURE JS FIREBASE API CALL
let dataset;
let searchstring = "";

window.onload = function() {
    get();

    const search = document.querySelector('#search');
    search.addEventListener('input', () => {
        searchstring = search.value;
        render();
        // console.log('input changed to: ', search.value);
    });

};

function get(){
    const url = 'https://staticbasetest.firebaseio.com/.json';
    fetch(url).then((response) => {
        response.json().then((data) => {
            dataset = data;
            render();
        });
    });
}

function render(){
    const countries = document.querySelector('.countries');
    countries.innerHTML = "";
    for(let key in dataset){
        if(!searchstring || dataset[key].toLowerCase().includes(searchstring.toLowerCase())){
            let li = document.createElement('li');
            li.innerHTML = `
                <img
                    src="https://lipis.github.io/flag-icon-css/flags/4x3/${key.toLowerCase()}.svg"
                    alt="${dataset[key]}"
                />

                <h2>${dataset[key]}</h2>
            `;
            countries.append(li);
        }
    }
}