const newsApi = "https://newsapi.org/v2/everything?apiKey=95dc6d667c554d0f89e067279916c1fe&q=";

window.onload = function () {
    const temp = JSON.parse(sessionStorage.getItem("data")) || "india";
    getapi(temp);
    i = JSON.parse(sessionStorage.getItem("start")) || 0;
    x = JSON.parse(sessionStorage.getItem("end")) || 9;
}

$("#home").on("click", function () {
    i = 0;
    x = 9;
    getapi("india")

})

$("#save").on("click", function abc() {
    debugger
    var input = document.getElementById("search").value.replace(/ /g, "-");
    let Final = input;
    sessionStorage.setItem("data", JSON.stringify(Final));
    getapi(input);
    i = 0;
    x = 9;
});

var i = 0;
var x = 9;

Handlebars.registerHelper('authorName', function (author, source) {
    if (author == null || author.includes("www")) {
        return (source)
    }
    else {
        return (author)
    }
});

$("#next").on("click", function () {

    i = parseInt(i + 1);
    x = parseInt(x + 10);

    console.log(i, x)
    let temp = JSON.parse(sessionStorage.getItem("data"));
    getapi(temp);
})

async function getapi(data) {
    debugger;
    const articleType = await fetch(`${newsApi}${data}`);
    var abc = await articleType.json();
    var response = abc.articles;
    let responseUpdated = [];
    let start = i;
    let end = x;
    sessionStorage.setItem("start", JSON.stringify(start));
    sessionStorage.setItem("end", JSON.stringify(end));

    for (i; i < x && x <= 100; i++) {
        responseUpdated.push(response[i]);
    }
    const productstemp = document.getElementById("products-template").innerHTML;
    const productscompile = Handlebars.compile(productstemp);
    const compileddata = productscompile({ data: responseUpdated });
    const container = document.getElementById("container")
    container.innerHTML = compileddata;


    $(".image").on("load", function () {
        const loader = document.querySelectorAll("#loading-animation");
        loader.forEach(load => {
            load.style.display = "none";
        }
        )
    })
}


$(".pages").on("click", function (e) {


    const j = Number(e.currentTarget.innerHTML);
    i = parseInt(j + "1");
    x = parseInt((j + 1) + "0");
    console.log(i, x);
    window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
    })
    let temp = JSON.parse(sessionStorage.getItem("data"));
    getapi(temp);
})

$("#pre").on("click", function () {


    i = parseInt(i - 10);
    x = parseInt(x - 1);

    console.log(i, x)
    let temp = JSON.parse(sessionStorage.getItem("data"));
    getapi(temp);
})

$(".reset").on("click", function () {

    let temp = JSON.parse(sessionStorage.getItem("data"));
    getapi(temp);
    i = 0;
    x = 9;
})


$("#search").keydown(function (event) {
    if (event.key === "Enter") {
        $("#save").click();
    }

})