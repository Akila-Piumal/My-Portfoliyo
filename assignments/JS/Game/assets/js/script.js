var idleImgNum = 0;
let idleInterval = 0;

// function for character idle
function idleCharacter() {
    idleImgNum++;

    if (idleImgNum == 10) {
        idleImgNum = 1;
    }

    $('#character').attr('src', "assets/images/character/Idle__00" + idleImgNum + ".png");
}

// start Idle Animation
function startIdleAnimation() {
    idleInterval = setInterval(idleCharacter, 100);
}

///////////////////////////////////////////////////////////////////////////

var runImgNum = 0;
let runningInterval=0;

// function for character run
function runningCharacter() {
    runImgNum++;

    if (runImgNum==10){
        runImgNum=1;
    }

    $('#character').attr('src', "assets/images/character/Run__00" + runImgNum + ".png");
}

// start Run Animation
function startRunning(){
    clearInterval(idleInterval);
    runningInterval = setInterval(runningCharacter,100);
}

///////////////////////////////////////////////////////////////

var jumpImgNum=0;
let jumpingInterval=0;
var marginTop=400;

// function for character jump
function jumpCharacter(){
    jumpImgNum++;

    if (jumpImgNum <= 5){
        marginTop=marginTop-55;
        $('#character').css('marginTop',marginTop+"px");
        // var character = document.getElementById("character");
        // var currentMargin = getComputedStyle(character).marginLeft;//get the margin of barrier
        // var newMargin=(currentMargin+300)+"px";
        // $('#character').css({marginLeft:newMargin});//works
    }

    if (jumpImgNum>=6){
        marginTop=marginTop+55;
        $('#character').css('marginTop',marginTop+"px");
    }

    if (jumpImgNum==10){
        jumpImgNum=0;
        clearInterval(jumpingInterval);
        jumpingInterval=0;
        runImgNum=0;
        startRunning();
    }
    $('#character').attr('src',"assets/images/character/Jump__00"+jumpImgNum+".png");
}

// start jump Animation
function startJumping(){
    // stop breathing
    clearInterval(idleInterval);
    runImgNum=0;
    clearInterval(runningInterval);
    jumpingInterval = setInterval(jumpCharacter,100);
}

////////////////////////////////////////////////////////////////////////

// keyPress functions
$(document).on("keypress", function (e) {
    if (e.which==13){
        if (runningInterval==0){
            startRunning();
        }

        if (moveForwardInterval==0){
            moveForwardInterval = setInterval(moveForward,100);
        }
        if (barrierInterval==0){
            barrierInterval=setInterval(moveBarriers,100);
        }
    }


    // for the second level
    let score1 = parseInt($('#scoreBoard').text());

    if (score1<400){
        if (e.which==32){
            console.log("PAarana eka");
            if (jumpingInterval==0){
                startJumping();
            }

            if (moveForwardInterval==0){
                moveForwardInterval = setInterval(moveForward,100);
            }

            if (barrierInterval==0){
                barrierInterval=setInterval(moveBarriers,100);
            }
        }
    }

});

//////////////////////////////////////////////////////////////////

var backgroundPosX=0;
var moveForwardInterval=0;
var score=0;

function moveForward(){
    backgroundPosX=backgroundPosX-20;

    $('#background').css('backgroundPositionX',backgroundPosX+"px");

    score++;

    $('#scoreBoard').text(score);

    if ($('#scoreBoard').text()=="400"){
        var imageUrl="assets/images/background/ninjaBackground.jpg"
        $("#background").css("background-image", "url(" + imageUrl + ")");

        // backgroundPosX=backgroundPosX-50;
        //
        // $('#background').css('backgroundPositionX',backgroundPosX+"px");

        clearInterval(moveForwardInterval);
        moveForwardInterval = setInterval(moveForwardFast,100);

        clearInterval(barrierInterval);
        barrierInterval=setInterval(moveBarriersWithNewSpeed,100);

        changeTheCharacter();

        runningCharacter2();

        jumpImgNum=0;
        jumpingInterval=0;
        marginTop=400;

        $(document).on("keypress", function (e) {
            if (e.which==32){

                if (jumpingInterval==0){
                    // start jump Animation
                    // stop breathing
                    clearInterval(idleInterval);
                    runImgNum=0;
                    clearInterval(runningInterval);
                    jumpingInterval = setInterval(jumpingCharacter2,100);
                }
            }
        });

    }
}

function moveBarriersWithNewSpeed(){
    for (let i = 0; i < 100; i++) {
        var barrier = document.getElementById("barrier"+i);
        var currentMargin = getComputedStyle(barrier).marginLeft;//get the margin of barrier
        var newMargin = parseInt(currentMargin)-35;// 25 karanna
        barrier.style.marginLeft=newMargin+"px";

        if (newMargin >= -80 && newMargin <=80){
            if (marginTop>350) {
                clearInterval(barrierInterval);

                clearInterval(runningInterval);
                runningInterval=-1;

                clearInterval(jumpingInterval);
                jumpingInterval=-1;

                clearInterval(moveForwardInterval);
                moveForwardInterval=-1;

                deadInterval = setInterval(deadCharacterNew,100);

                $('#gameOverDiv').css('display','block');
                $('#Outscore').text($('#scoreBoard').text());
            }
        }
    }
}

function deadCharacterNew(){
        deadImgNum++;

        if (deadImgNum==10){
            deadImgNum=9;
        }

        $('#character').attr('src',"assets/images/character/ninja_character/Dead__00"+deadImgNum+".png");
}

function moveForwardFast(){
    backgroundPosX=backgroundPosX-35;

    $('#background').css('backgroundPositionX',backgroundPosX+"px");

    score++;

    $('#scoreBoard').text(score);
}

function jumpingCharacter2(){
    jumpImgNum++;

    if (jumpImgNum <= 5){
        marginTop=marginTop-55;
        $('#character').css('marginTop',marginTop+"px");
        // var character = document.getElementById("character");
        // var currentMargin = getComputedStyle(character).marginLeft;//get the margin of barrier
        // var newMargin=(currentMargin+300)+"px";
        // $('#character').css({marginLeft:newMargin});//works
    }

    if (jumpImgNum>=6){
        marginTop=marginTop+55;
        $('#character').css('marginTop',marginTop+"px");
    }

    if (jumpImgNum==10){
        jumpImgNum=0;
        clearInterval(jumpingInterval);
        jumpingInterval=0;
        runImgNum=0;
        runningCharacter2();
    }
    $('#character').attr('src',"assets/images/character/ninja_character/Jump__00"+jumpImgNum+".png");
}

function runningCharacter2(){
    runImgNum = 0;
    runningInterval=0;



// start Run Animation
        clearInterval(idleInterval);
        runningInterval = setInterval(runningCharacter2inner,100);
}

// function for character run
function runningCharacter2inner() {
    runImgNum++;

    if (runImgNum==10){
        runImgNum=1;
    }

    $('#character').attr('src', "assets/images/character/ninja_character/Run__00" + runImgNum + ".png");
}

// change the character
function changeTheCharacter(){
    // clearInterval(barrierInterval);

    clearInterval(runningInterval);
    runningInterval=-1;

    clearInterval(jumpingInterval);
    jumpingInterval=-1;

    var characterImgUrl="assets/images/character/ninja_character/Run__001";
    $("#character").attr("src","assets/images/character/ninja_character/Idle__001.png");
}

///////////////////////////////////////////////////////////////////////////

var MarginLeft=1540;
function setBarriers(){

    for (let i = 0; i <= 100; i++) {
        var barrier=document.createElement("div");
        barrier.className="barrier";
        document.getElementById("background").appendChild(barrier);
        barrier.style.marginLeft = MarginLeft+"px";

        barrier.id="barrier"+i;

        // MarginLeft=MarginLeft+1000;

        if (i<5){
            MarginLeft=MarginLeft+1000;
        }

        if (i>=20){
            MarginLeft=MarginLeft+800;
        }else if (i>=12){
            MarginLeft=MarginLeft+1000;
        }else if (i>=9){
            MarginLeft=MarginLeft+1500;
        }else if (i>=5){
            MarginLeft=MarginLeft+700;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////

var barrierInterval=0;
function moveBarriers(){
    for (let i = 0; i < 100; i++) {
        var barrier = document.getElementById("barrier"+i);
        var currentMargin = getComputedStyle(barrier).marginLeft;//get the margin of barrier
        var newMargin = parseInt(currentMargin)-25;// 25 karanna
        barrier.style.marginLeft=newMargin+"px";

        if (newMargin >= -80 && newMargin <=80){
            if (marginTop>350) {
                clearInterval(barrierInterval);

                clearInterval(runningInterval);
                runningInterval=-1;

                clearInterval(jumpingInterval);
                jumpingInterval=-1;

                clearInterval(moveForwardInterval);
                moveForwardInterval=-1;

                deadInterval = setInterval(deadCharacter,100);

                $('#gameOverDiv').css('display','block');
                $('#Outscore').text($('#scoreBoard').text());
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////

var deadImgNum=1;
var deadInterval=0;

function deadCharacter(){
    deadImgNum++;

    if (deadImgNum==10){
        deadImgNum=9;
    }

    $('#character').attr('src',"assets/images/character/Dead__00"+deadImgNum+".png");
}

/////////////////////////////////////////////////////////////////




