
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function playSound(name){
  var aud = new Audio("sounds/"+name+".mp3");
  aud.play();
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  animatePress(userChosenColor);
  // console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

  userClickedPattern = [];

  level++;
  $("h1").text("Level "+level);

  var randomnumber = Math.floor((Math.random())*4) ;
  var randomChosenColor = buttonColors[randomnumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  // console.log(gamePattern);
  // checkAnswer(level);
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
  {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    console.log("false");
    var a = new Audio("sounds/wrong.mp3");
    a.play();
    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key To Restart!")

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  started = false;
  level=0;
  gamePattern=[];
}
