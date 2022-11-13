var idleImgNum = 0;
var idleInterval=0;

// function for character idle
function idleCharacter() {
    idleImgNum++;

    if (idleImgNum == 10) {
        idleImgNum = 1;
    }

    $('#character').attr('src', "assets/images/character/Idle__00" + idleImgNum + ".png");
}

function startIdleAnimation(){
    idleInterval = setInterval(idleCharacter, 100);
}