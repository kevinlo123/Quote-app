document.addEventListener("DOMContentLoaded" , () => {

    /**************** ELEMENTS BEING CREATED  ************/
    const divChild = document.createElement("div");
    const divAuthorQuote = document.createElement("div");    
    const newQuoteButton = document.createElement("button");
    const tweetButton = document.createElement("button");
    const quoteButtonText = document.createTextNode("New Quote");    
    const quote = document.createElement("p");
    const author = document.createElement("span");
    
    /**************** ELEMENTS BEING APPENDED  ************/
    const app = document.getElementById("app");    
    tweetButton.innerHTML = '<i class="fa fa-twitter" aria-hidden="true"></i>'; //innerHTML so that the font awesome twitter icon could render
    divChild.appendChild(tweetButton);
    app.appendChild(divChild);    
    newQuoteButton.appendChild(quoteButtonText);
    divChild.appendChild(newQuoteButton);
    divAuthorQuote.appendChild(quote);
    divAuthorQuote.appendChild(author);
    app.appendChild(divAuthorQuote);

    /**************** ADDING CLASSES TO ELEMENTS ************/
    divChild.classList.add("buttons_container");
    tweetButton.classList.add("tweet_button");
    newQuoteButton.classList.add("quote_button");
    quote.classList.add("quote_text");
    author.classList.add("author");
    divAuthorQuote.classList.add("div_Author_Quote")
    
    
    /**************** BOOLEAN VARIABLE AND COLOR ARRAY************/
    const boolean = true;
    const colors = ["#1abc9c" , "#2ecc71" , "#3498db" , "#9b59b6" , "#34495e",
                    "#f1c40f" , "#e67e22" , "#e74c3c" , "#f39c12" , "#2c3e50"];


    /**************** NEW QUOTE BUTTON EVENT HANDLER ************/
    newQuoteButton.addEventListener("click" , () => {
        if(boolean){
            $.ajax({ //request again so that when the button is clicked the new quote being recieved is replacing the old on load quote
                cache: false, //SET CACHE TO FALSE WITHOUT IT NEW QUOTE WONT APPEAR
                type: "GET",
                url: "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", 
                success: response => {
                    quote.innerHTML = "&ldquo;" + response["0"].content + "&rdquo;"; //new quote
                    author.innerHTML = "-" + response["0"].title; //new author          
                    console.log("new quote is replacing old quote as well as author");
                },
                error: function(error){
                    console.log(error);
                }  
            });
        }
        backgroundAndTextColorChange(); // function containing style changes being called
    });

    /**************** TWEET QUOTE BUTTON EVENT HANDLER ************/
    tweetButton.addEventListener("click" , () => {
        let twitterQuote = quote.innerText;
        let quoteAuthor = author.innerText;
        window.open('https://twitter.com/intent/tweet?text=' + twitterQuote + " " + quoteAuthor, '_blank');
    });

    /**************** NEW QUOTE ON LOAD ************/
    const ajaxRequest = () => {
        $.ajax({
            cache: false, //SET CACHE TO FALSE WITHOUT IT NEW QUOTE WONT APPEAR
            type: "GET",
            url: "https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
            success: response => {
                console.log(response);
                quote.innerHTML = "&ldquo;" + response["0"].content + "&rdquo;"; //response data being shown in HTML as quotes paragraph element
                author.innerHTML = "-" + response["0"].title; //author being shown through the authors span element           
                backgroundAndTextColorChange();//calling style change function                
            },
            error: function(error){
                console.log(error);
            }  
        });
    }
    ajaxRequest(); // calling function for request on load
    
    const backgroundAndTextColorChange = () => {
        let randomColor = colors[Math.floor(colors.length * Math.random())]; //RANDOMIZING COLORS FROM ARRAY

        //BASED ON THE RANDOM COLOR THAT IS RETURNED ALL ELEMENTS WILL HAVE A STYLE CHANGE
        document.getElementsByTagName("body")[0].style.background = randomColor;
        document.getElementsByClassName("quote_button")[0].style.background = randomColor;
        document.getElementsByClassName("tweet_button")[0].style.background = randomColor; 
        quote.style.color = randomColor;
        author.style.color = randomColor;     
    }
    backgroundAndTextColorChange();// Calling function for style changes on load
});



