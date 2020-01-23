//this files displays everything in the database to the front end

// global bootbox
$(document).ready(function(){
    //setting a reference to the article container div where all the dynamic content will go
    //adding event listeners to any dynamically generated save article"
    //and scrape new article buttons
    var articleContainer = $(".article-container"); 
    $(document).on("click", ".btn.save", handleArticleSave); 
    $(document).on("click", ".scrape_new", handleArticleScrape);

    //Once the page is ready, run the initPage function to kick things off
    initPage();

    function initPage() {
        //Empty the article container, run an AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data){
            //if we have headlines, render them to the page
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                //otherwise render a message explaining we have no articles
                renderEmpty();
            }
        });
    }
    function renderArticles(articles){
        //This function handles appending HTML containing our articles data to the page
        //We are passed an array of JSON containing all available articles in our database
        var articlePanels = [];
        //we pass each article JSON object to the createPanel function which returns a bootstrap panel with our article data inside
        for (var i =0; i< articleContainer.length; i++) {
            articlePanels.push(createPanel(article[i]));
        }
        //once we have all of the html for the articles stored in our arcile Panels array, 
    }
})