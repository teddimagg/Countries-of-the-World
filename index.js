// PURE JS FIREBASE API CALL
window.onload = function() {
    const url = 'https://staticbasetest.firebaseio.com/.json';
    const countries = document.querySelector('.countries');
    fetch(url).then((response) => {
        response.json().then((data) => {
            //data => json object fetches from url.
            for(let key in data){
                let li = document.createElement('li');
                li.innerHTML = `
                    <img
                        src="https://lipis.github.io/flag-icon-css/flags/4x3/${key.toLowerCase()}.svg"
                        alt="${data[key]}"
                    />

                    <h2> ${key} ${data[key]}</h2>
                `;
                countries.append(li);
            }
        });
    });
};


