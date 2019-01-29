$(document).ready(function() {
  // An array of topics, new topics entered in box will be pushed into this
  var topics = [
    "Soul Eater Excalibur",
    "Balut Food",
    "Adventure Time Jake",
    "Biffed it Fall",
    "Pickle Rick",
    "Eating Contest Gone Bad",
    "Aaron Homoki Skateboarder",
    "Turfing Dance",
    "Krunk",
    "Puppies",
    "Shimmy Shimmy Ya",
    "Eric Andre",
    "Free Solo Climb"
  ];

  // Function that shows all topic buttons
  function showButtons() {
    // reset (empty) div so that each giphtron is different
    $("#buttonsView").empty();
    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.addClass("topic");
      button.addClass("btn btn-primary");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#buttonsView").append(button);
    }
  }
  // Function to add a new topic button
  function addButton() {
    $("#addGif").on("click", function() {
      var topic = $("#topic-input")
        .val()
        .trim();
      if (topic == "") {
        // Return False to prevent submission of blank button
        return false;
      }
      topics.push(topic);

      showButtons();
      return false;
    });
  }
  // Function to remove last topic button (resets page..still need to figure out)
  function removeLastButton() {
    $("removeGif").on("click", function() {
      topics.pop(topic);
      showButtons();
      return false;
    });
  }
  // Function that shows all of the gifs
  function Gifs() {
    var topic = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
      var results = response.data; //shows results of gifs
      if (results == "") {
        alert("There isn't a gif for this button");
      }
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>"); //div for the gifs to go inside
        gifDiv.addClass("gifDiv");
        // pulling gif
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
        gifImage.attr(
          "data-still",
          results[i].images.fixed_height_small_still.url
        ); // still image
        gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
        gifImage.attr("data-state", "still"); // set the image state
        gifImage.addClass("image");
        gifDiv.append(gifImage);
        // pulling rating of gif
        var gifRating = $("<p>").text("Rating: " + results[i].rating);
        gifDiv.append(gifRating);
        // pulling still image of gif
        // adding div of gifs to gifsView div
        $("#gifsView").prepend(gifDiv);
      }
    });
  }
  // Calling Functions & Methods
  showButtons(); // show list of topics already created
  addButton();
  removeLastButton();
  // Document Event Listeners
  $(document).on("click", ".topic", Gifs);
  $(document).on("click", ".image", function() {
    var state = $(this).attr("data-state");
    if (state == "still") {
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });
});
