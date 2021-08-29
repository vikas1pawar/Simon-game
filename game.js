var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
                                                           // Any key is pressed call nextSequence()
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;

  }
});
                                                                   // user clicked colour.
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
                                                                    // Choosing Random colour.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
                                                                      // flash animaion
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}
                                                                     // sound play sound files.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
                                                                     // animate press files.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

                                                                    // current level function
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout (function(){
        nextSequence();
      },1000);

    }


  }else {

      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },500);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();

  }

}
function startOver(){
  level=0;
  gamePattern=[null];
  started=false;

}
