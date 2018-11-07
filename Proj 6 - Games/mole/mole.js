radios = [];
score = 0;
time = 30;
gaming = false;
highscore = 0;
thistarget = -1;

function countdown(event) {
    if (time > 0) {
        time -= 1;
    } else {
        // stop
        stopGame();
    }
    document.getElementById("time").value = time;
}

function startGame() {
    // reset field
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
        radios[i].disabled = false;
    }
    // set timer
    time = 30;
    timer = window.setInterval(countdown, 1000);
    document.getElementById("time").value = time;
    // reset score
    score = 0;
    document.getElementById("score").value = score;
    // set flag
    chooseOne();
    document.getElementById("status").value = "Game Ongoing";
    gaming = true;
}

function stopGame() {
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
        radios[i].disabled = true;
    }
    // stop timer
    window.clearInterval(timer);
    // set flag
    document.getElementById("status").value = "Game Over";
    gaming = false;

    if (score > highscore) {
        highscore = score;
        document.getElementById("hi").innerHTML = highscore;
    }
}

function triggerGame(event) {
    if (gaming == false) {
        startGame();
    } else {
        stopGame();
    }
}

function chooseOne() {
    do {
        var newtarget = Math.floor(Math.random() * radios.length);
    } while (newtarget == thistarget);

    if (thistarget >= 0) {
        radios[thistarget].checked = false;
    }
    thistarget = newtarget;
    radios[thistarget].checked = true;
}

function radioClick(event) {
    var idx = radios.indexOf(event.target);
    if (idx >= 0) {
        // we are clicking on a radio button
        if (idx == thistarget) {
            score += 1;
            chooseOne();
        } else {
            event.target.checked = false;
            score -= 1;
        }
        document.getElementById("score").value = score;
    }
}

window.onload = function() {
    fld = document.getElementById("field");
    // create 60 radio buttons, 10 in a row as a div
    for (var i = 0; i < 6; i++) {
        var radiorow = document.createElement("DIV");
        for (var j = 0; j < 10; j++) {
            var radio = document.createElement("INPUT");
            radio.setAttribute("type", "radio");
            radio.disabled = true;
            radiorow.appendChild(radio);
            radios.push(radio);
        }
        fld.appendChild(radiorow);
    }

    // event listeners
    document.getElementById("time").value = "0";
    document.getElementById("score").value = "0";
    document.getElementById("status").value = "Game Ready";
    fld.addEventListener("click", radioClick);
    document.getElementById("gamebtn").addEventListener("click", triggerGame);
}
