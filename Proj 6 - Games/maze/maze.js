cooldown = false;
gaming = false;
cheating = false;
time = 0.0;
var timer;

function GameStart() {
    if (cooldown == false) {
        if (gaming == false) {
            gaming = true;
            var walls = document.getElementsByClassName('wall');
            for (var i = 0; i < walls.length; i++) {
                walls[i].classList.remove('hit');
            }
            time = 0.0;
            timer = window.setInterval(timing, 100);
        }
    }
}

function GameEnd() {
    if (cooldown == false) {
        if (gaming == true) {
            gaming = false;
            window.clearInterval(timer);
            if (cheating == false) {
                document.getElementById("status").innerHTML += " second(s)."
            }
            cheating = false;
        }
    }
}

function mouseOver(event) {
    if (cooldown == false) {
        if (gaming == true && event.target.className == "wall") {
            GameEnd();
            event.target.classList.add('hit');
            document.getElementById("status").innerHTML = "Game over. Leave the maze and try again.";
            cooldown = true;
        }
    }
}

function timing(event) {
    if (cooldown == false) {
        time += 0.1;
        document.getElementById("status").innerHTML = (Math.round(time * 10) / 10).toFixed(1);
    }
}

function startgame(event) {
    if (cooldown == false) {
        GameStart();
        cheating = false;
    }
}

function endgame(event) {
    if (cooldown == false) {
        if (gaming == true) {
            if (cheating == true) {
                document.getElementById("status").innerHTML = "Don't cheat, you should start from 'S' and move to the 'E' inside the maze!";
            }
            GameEnd();
        } else {
            document.getElementById("status").innerHTML = "Don't cheat, you should start from 'S' and move to the 'E' inside the maze!";
        }
    }
}

function mouseOut(event) {
    if (cooldown == false) {
        if (gaming == true) {
            cheating = true;
        }
    } else {
        cooldown = false;
        var walls = document.getElementsByClassName('wall');
        for (var i = 0; i < walls.length; i++) {
            walls[i].classList.remove('hit');
        }
        document.getElementById("status").innerHTML = "Hover over the \"S\" to begin";
    }
}

function rightClick(event) {
    if (cooldown == false) {
        if (gaming == true)
            event.preventDefault();
    }
}

window.onload = function() {
    //alert("hello");
    document.getElementById('maze').addEventListener("mouseover", mouseOver);
    document.getElementById('maze').addEventListener("contextmenu", rightClick);
    document.getElementById('maze').addEventListener("mouseleave", mouseOut);
    document.getElementById('start').addEventListener("mouseenter", startgame);
    document.getElementById('end').addEventListener("mouseenter", endgame);
};
