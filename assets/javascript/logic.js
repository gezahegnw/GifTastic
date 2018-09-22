     
     
$(document).ready(function(){

     // Initial array of giphys
     var topics = ["Jason Statham", "Sylvester Stallone", "Dolph Lundgren", "Brad Pitt", "Jean-Claude Van Damme", "Steven Seagal","Jet Li", "Matt Damon", "Steve Austin", " Dwayne Johnson", "John Cusack", "Nicolas Cage", "Keanu Reeves","Tom Cruise", "Robert De Niro", " Mel Gibson","Gary Daniels", "Dominic Purcell", "Wesley Snipes", "Mark Wahlberg"];
      var numOfImgDisaplay = 10;
    
      function showImg() {
     $("#gifImage-view").empty();//this clrear out the page every whenever new button clicked
     // var actorsGif = $(this).val().trim();
     //$("#buttons-view").empty();
     var actorsGif = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         actorsGif + "&api_key=9HK85IyG19Q4BG1ecYP4dW7GCDsPvaKd&limit=" + numOfImgDisaplay ;

    $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(queryURL);
    console.log(response);

  
     for(var j = 0; j < numOfImgDisaplay; j++) {    
      


        var gifdisplayDiv = $("<div>");
        gifdisplayDiv.addClass("image-div");
        var img = $("<img>");  // For each iteration, we will create an imageCrystals
        img.attr("src", response.data[j].images.original_still.url);// This data attribute will be set equal to the array value.
        img.attr("data-still", response.data[j].images.original_still.url);
        img.attr("data-animate", response.data[j].images.original.url);
        img.attr("data-state", "still");
        img.attr("class", "gif");
        img.attr("height", "200", "width", "200"); //this modify the crystal images based on the value passed here.
        gifdisplayDiv.append(img);


        $("#gifImage-view").append(gifdisplayDiv);
      var rating = response.data[j].rating;
      console.log(response);
      var p = $("<p>").text("Rating: " + rating);//this creats p tag that holds the image rating
      gifdisplayDiv.prepend(p);

    }
    });
 }


  
    function getButton(){ 

     $("#buttons-view").empty();//prefect place
      for (var i = 0; i < topics.length; i++){

          var newButton = $("<button>"); //this creats new button
          newButton.attr("class", "btn btn-default");//this adds class to new button
          newButton.attr("id", "inputButton");  
          newButton.attr("data-name", topics[i]); 
          newButton.text(topics[i]); 
          $("#buttons-view").append(newButton); //append new button to button view
      }
    
      
  }

       function changeimageState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state === "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state === "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }
  
   

    $("#add-gifImage").on("click", function(event){
      event.preventDefault();

      var actorsGif = $("#gif-input").val().trim();
        topics.push(actorsGif);
        
        getButton();

       return false;
    
  });
   getButton();

   $(document).on("click", "#inputButton", showImg);
   $(document).on("click", ".gif", changeimageState);


});
