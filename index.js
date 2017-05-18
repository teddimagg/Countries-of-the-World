// PURE JS FIREBASE API CALL
const url = 'https://randomuser.me/api/';
fetch(url).then((response) => {
    response.json().then((data) => {
        const results = data.results[0];
        console.table(results);
    });
});