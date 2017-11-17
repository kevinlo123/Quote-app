document.addEventListener("DOMContentLoaded" , () => {
    const divChild = document.createElement("div");
    document.getElementById("app").appendChild(divChild);
    const newQuoteButton = document.createElement("button");
    const quoteButtonText = document.createTextNode("New Quote");
    newQuoteButton.appendChild(quoteButtonText);
    newQuoteButton.classList.add("quote_button"); 
    divChild.appendChild(newQuoteButton);
    const boolean = true;
    const colors = ["#1abc9c" , "#2ecc71" , "#3498db" , "#9b59b6" , "#34495e",
                    "#f1c40f" , "#e67e22" , "#e74c3c" , "#f39c12" , "#2c3e50"];

    newQuoteButton.addEventListener("click" , () => {
        if(boolean){
            $.ajax({
                cache: false,
                type: "GET",
                url: "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                success: response => {
                    document.getElementsByTagName("p")[0].innerHTML = "&ldquo;" + response["0"].content + "&rdquo;";
                    document.getElementsByTagName("span")[0].innerHTML = "-" + response["0"].title;            
                    console.log("new quote is replacing old quote as well as author");
                }
            });
        }
        backgroundAndTextColorChange();
    });

    const ajaxRequest = () => {
        $.ajax({
            cache: false,
            type: "GET",
            url: "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
            success: response => {
                console.log(response);
                const app = document.getElementById("app");
                const quote = document.createElement("p");
                const author = document.createElement("span");
                const divAuthorQuote = document.createElement("div");
    
                divAuthorQuote.appendChild(quote);
                divAuthorQuote.appendChild(author);
                app.appendChild(divAuthorQuote);
                divAuthorQuote.classList.add("div_Author_Quote")
                quote.innerHTML = "&ldquo;" + response["0"].content + "&rdquo;"; 
                author.innerHTML = "-" + response["0"].title;            
                quote.classList.add("quote_text");
                author.classList.add("author");
                backgroundAndTextColorChange();                
            }
        });
    }
    ajaxRequest();
    
    const backgroundAndTextColorChange = () => {
        let randomColor = colors[Math.floor(colors.length * Math.random())];
        document.getElementsByTagName("body")[0].style.background = randomColor;
        document.getElementsByTagName("p")[0].style.color = randomColor;
        document.getElementsByTagName("span")[0].style.color = randomColor;
        document.getElementsByClassName("quote_button")[0].style.background = randomColor        
    }
    backgroundAndTextColorChange();
});



