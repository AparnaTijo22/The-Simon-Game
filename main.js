var boxes = ["A", "B", "C", "D"];
var sounds = ["sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3", "sounds/blue.mp3", "sounds/wrong.mp3"]
var userClickTrack = [];
var gameTrack = [];
var level = 0;


$("body").keydown(function (e) { 
    if(e.key == "a"){
        generateNum(); 
    }
});

function restartGame(){
    gameTrack = [];
    userClickTrack = [];
    level = 0;
    $("h1").text("Press A to start");
    console.log("Hey i am inside");
    console.log(gameTrack);
    console.log(userClickTrack);
}

function generateNum(){
    var number = Math.floor(Math.random() * 4);
    gameTrack.push(boxes[number]);
    console.log(gameTrack);
    $("#" + boxes[number]).addClass("glow");
    setTimeout(function(){$("#" + boxes[number]).removeClass("glow");}, 1000);
    var audio = new Audio(sounds[number]);
    audio.play()
}

function gameOver(){
    $("h1").text("Game Over");
    $("body").css("background-color", "red");    
    setTimeout(function(){$("body").css("background-color", "#011F3F");}, 500);
    var audio = new Audio(sounds[4]);
    audio.play();
    restartGame();
}


function checkRight(){
    for(var i=0; i<userClickTrack.length; i++){
        if(userClickTrack[i] != gameTrack[i]){
            gameOver();
            return;
        }
    }
    if(JSON.stringify(userClickTrack) === JSON.stringify(gameTrack)){
        userClickTrack = [];
        setTimeout(function(){generateNum();}, 1000);
        level++;
        $("h1").text("Level " + level);
    }
}

//todo: MAIN PART

$(".btn").click(function (e) { 
    var key = e.target.id;
    userClickTrack.push(key);
    $("#" + key).addClass("glow");
    setTimeout(function(){$("#" + key).removeClass("glow");}, 500);
    var audio = new Audio(sounds[boxes.indexOf(key)]);
    audio.play()
    checkRight();
});
