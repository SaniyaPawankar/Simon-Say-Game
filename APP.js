let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () { /* To track the key pressed on entire html document */
    if (started == false) {
        console.log("game is started"); /* this will allow the game to start only at once */
        started = true;

        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash"); /* btn- color = white*/
    setTimeout(function () {
        btn.classList.remove("flash"); /* btn- color = original */
    }, 200);
}

function userflash(btn) {
    btn.classList.add("userflash"); /* btn- color = white*/
    setTimeout(function () {
        btn.classList.remove("userflash"); /* btn- color = original */
    }, 200);
}

function levelUp() {
    userSeq = []; /* restart the sequence again */
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];/* choose the color from the index*/
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn);
}


function checkAns(idx) {
    // console.log("curr level: ", level);/* curr level == userSeq == gameSeq*/
    // }
    if(level>= highScore){
        highScore = level;
        let hs = document.querySelector(".hs");
        hs.innerHTML = `High Score: ${highScore}`;
    }
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Your high score for the current session is ${highScore}</br><br>Press any key to start</br>`;
        // document.querySelector("body").style.backgroundcolor ="red";
        // setTimeout(function(){
        //     document.querySelector("body").style.backgroundColor ="white";
        // }, 150);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}





function btnPress() {

    let btn = this;
    userflash(btn);
 highScore =0;
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    highScore = 0;

}
