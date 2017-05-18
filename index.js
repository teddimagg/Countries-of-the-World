// PURE JS FIREBASE API CALL
const url = 'https://staticbasetest.firebaseio.com/.json';
fetch(url).then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});