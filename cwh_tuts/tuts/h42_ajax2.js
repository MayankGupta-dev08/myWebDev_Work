console.log("this is working");
const showBtn = document.getElementById("showBtn");
const feedCard = document.getElementById("feed");

showBtn.addEventListener("click", function showCountries() {
    console.log("clicked show countries button!");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://restcountries.com/v3.1/all', true);
    xhr.onload = function () {
        if (this.status === 200) {
            console.log('Success');
            let countries = JSON.parse(this.response);
            console.log(countries);
            countries.forEach(function (country) {
                const countryCard = document.createElement('div');
                const countryCardImage = document.createElement('img');
                countryCard.innerHTML = country.name.common;
                countryCardImage.src = country.flag;
                countryCard.appendChild(countryCardImage);
                feedCard.appendChild(countryCard);
            })
        } else {
            console.log("status not ok");
        }
    }
});