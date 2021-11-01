console.log("This is main.js");

// Initialising the news api parameters
const apiKey = "ba4edb5b19e04598b7f4740a0ea716f7";
const sourceCountry = 'in';
const url = `https://newsapi.org/v2/top-headlines?country=${sourceCountry}&apiKey=${apiKey}`;

const dateElem = document.getElementById('dateElem');
setInterval(() => {
    let currTime = new Date();
    currTime.toLocaleString();
    dateElem.innerHTML = currTime.toDateString() + ", " + currTime.toLocaleTimeString();
}, 1000);

// grabbing the news-accordion container
const newsAccordion = document.getElementById('news-accordion');

// creating a new XMLHttpRequest obj and using it to make an asynchronus GET request
const xhr = new XMLHttpRequest();
xhr.open('GET', url, true);

// handling the response
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let newsArticles = json.articles;
        console.log(newsArticles);
        let newsHTML = "";
        newsArticles.forEach(function (article, index) {
            let news = `<div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                    <em>Breaking News#${index + 1}</em>:&nbsp;<strong> ${article.title} </strong>
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" 
                                aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <img src=${article.urlToImage} class="rounded mx-auto d-block" width="500" alt="">
                                    <nav class="nav justify-content-center">
                                    <a class="nav-link active disabled" aria-current="page" href="#">News Description</a>
                                    <a class="nav-link disabled" href="#">${article.publishedAt}</a>
                                    <a class="nav-link disabled" href="#">${article["source"]["name"]}</a>
                                    <a class="nav-link" href="${article['url']}" target="_blank">Read more here</a>
                                    </nav>
                                    <div class="my-1">${article.content}</div>
                                </div>
                            </div>
                        </div>`
            newsHTML += news;
        });
        newsAccordion.innerHTML = newsHTML;
    } else {
        console.log("Some error occurred");
    }
}

xhr.send();
console.log("Done fetching news");