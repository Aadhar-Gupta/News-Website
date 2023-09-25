const NEWS_API = "https://newsapi.org/v2/everything?apiKey=95dc6d667c554d0f89e067279916c1fe&q=";
const DEFAULT_SEARCH_TERM = "india";
const ARTICLES_PER_PAGE = 10;

let start = 0;
let end = 9;

window.onload = function () {
    const savedData = JSON.parse(sessionStorage.getItem("data")) || DEFAULT_SEARCH_TERM;
    i = JSON.parse(sessionStorage.getItem("start")) || start;
    x = JSON.parse(sessionStorage.getItem("end")) || end;
    getArticles(savedData, i, x);
}

$("#home").on("click", function () {
    start = 0;
    end = ARTICLES_PER_PAGE - 1;
    getArticles(DEFAULT_SEARCH_TERM, start, end);
});

$("#save").on("click", function () {
    const searchTerm = document.getElementById("search").value.replace(/ /g, "-");
    sessionStorage.setItem("data", JSON.stringify(searchTerm));
    start = 0;
    end = ARTICLES_PER_PAGE - 1;
    getArticles(searchTerm, start, end);
});

$("#next").on("click", function () {
    start += ARTICLES_PER_PAGE;
    end += ARTICLES_PER_PAGE;
    getArticles(JSON.parse(sessionStorage.getItem("data")), start, end);
});

$(".pages").on("click", function (e) {
    const pageNumber = Number(e.currentTarget.innerHTML);
    start = (pageNumber - 1) * ARTICLES_PER_PAGE;
    end = pageNumber * ARTICLES_PER_PAGE - 1;
    getArticles(JSON.parse(sessionStorage.getItem("data")), start, end);
});

$("#pre").on("click", function () {
    start -= ARTICLES_PER_PAGE;
    end -= ARTICLES_PER_PAGE;
    getArticles(JSON.parse(sessionStorage.getItem("data")), start, end);
});

$(".reset").on("click", function () {
    start = 0;
    end = ARTICLES_PER_PAGE - 1;
    getArticles(JSON.parse(sessionStorage.getItem("data")), start, end);
});

$("#search").keydown(function (event) {
    if (event.key === "Enter") {
        $("#save").click();
    }
});

function getArticles(data, start, end) {
    const queryUrl = `${NEWS_API}${data}`;
    fetch(queryUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(abc => {
            const response = abc.articles.slice(start, end + 1);
            displayArticles(response);
        })
        .catch(error => console.error('Error fetching articles:', error));
}

function displayArticles(articles) {
    const productstemp = document.getElementById("products-template").innerHTML;
    const productscompile = Handlebars.compile(productstemp);
    const compileddata = productscompile({ data: articles });
    const container = document.getElementById("container");
    container.innerHTML = compileddata;

    $(".image").on("load", function () {
        const loader = document.querySelectorAll("#loading-animation");
        loader.forEach(load => {
            load.style.display = "none";
        });
    });

    window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
    });
}
