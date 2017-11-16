
document.addEventListener("DOMContentLoaded" , () => {
    const app = document.getElementById("app");
    const quote = document.createElement("p");
    const quoteText = document.createTextNode("ahsd");
    const tweetButton = document.createElement("span")

    app.appendChild(quote);
    app.classList.add("paragraph_container")
    quote.appendChild(quoteText);
    quote.classList.add("quote");

    $.ajax({
        cache: false,
        type: "GET",
        data: "somedatehere",
        url: "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        success:function(response){
            console.log(response);
        }
    });
});

