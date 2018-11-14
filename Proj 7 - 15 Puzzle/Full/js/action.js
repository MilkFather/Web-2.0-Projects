function move(event) {
    // the basic inferring
    var id = event.target.tag;
    var x = pos.indexOf(id) % level;
    var y = Math.floor(pos.indexOf(id) / level);
    // check whether we can move it, utilizing the shorthand feature
    if (x != 0 && pos[y * level + x - 1] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[y * level + x - 1] = id;

        event.target.style.left = ((x - 1.05) * panelwidth) + 'px';;
        panelList[level * level - 1].style.left = ((x - 0.05) * panelwidth) + 'px';
        moves++;
    }
    if (x != level - 1 && pos[y * level + x + 1] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[y * level + x + 1] = id;

        event.target.style.left = ((x + 0.95) * panelwidth) + 'px';;
        panelList[level * level - 1].style.left = ((x - 0.05) * panelwidth) + 'px';
        moves++;
    }
    if (y != 0 && pos[(y - 1) * level + x] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[(y - 1) * level + x] = id;

        event.target.style.top = ((y - 1.05) * panelheight) + 'px';
        panelList[level * level - 1].style.top = ((y - 0.05) * panelheight) + 'px';
        moves++;
    }
    if (y != level - 1 && pos[(y + 1) * level + x] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[(y + 1) * level + x] = id;

        event.target.style.top = ((y + 0.95) * panelheight) + 'px';;
        panelList[level * level - 1].style.top = ((y - 0.05) * panelheight) + 'px';
        moves++;
    }

    // finally, if we finished it...
    if (eq(pos, stdls())) {
        endPuzzle();
        $('#start').html("start");
        $(".panel").off("click");
    }

    $("h5").html(moves + ' move(s)');
}

function over(event) {
    var target = $(event.target);
    var id = event.target.tag;
    var x = pos.indexOf(id) % level;
    var y = Math.floor(pos.indexOf(id) / level);
    var tagx = id % level;
    var tagy = Math.floor(id / level);
    target.css({"width" : (panelwidth * 1.1) + 'px',
                "height" : (panelheight * 1.1) + 'px',
                "left" : (x * panelwidth - panelwidth * 0.05) + 'px',
                "top" : (y * panelheight - panelheight * 0.05) + 'px'});
}

function leave(event) {
    var target = $(event.target);
    var id = event.target.tag;
    var x = pos.indexOf(id) % level;
    var y = Math.floor(pos.indexOf(id) / level);
    var tagx = id % level;
    var tagy = Math.floor(id / level);
    target.css({"width" : panelwidth + 'px',
                "height" : panelheight + 'px',
                "left" : (x * panelwidth) + 'px',
                "top" : (y * panelheight) + 'px'});
}

function startGame(event) {
    if ($('#start').html() == "start") {
        startPuzzle(false);
    } else {
        startPuzzle(true);
    }
    $(".panel").off("click");
    $('#start').html("reshuffle");
    $(".panel").on("click", move);
    moves = 0;
    $("h5").html(moves + ' move(s)');
}

function settingOn(event) {
    $(".main").addClass("blurred");
    $(".overlay").css({"display" : "block"});
    $("#imgsel").on("click", changeImage);
    $("input[type=file]").on("change", handleImage);
    $(".numminus").on("click", lvldn);
    $(".numplus").on("click", lvlup);
    $("#lvltxt").html("Level: " + level);
}

function lvlup(event) {
    if (level < 6)
        level = level + 1;
    $("#lvltxt").html("Level: " + level);
}

function lvldn(event) {
    if (level > 3)
        level = level - 1;
    $("#lvltxt").html("Level: " + level);
}

function changeImage(event) {
    $("input[type=file]").trigger("click");
}

function handleImage(e){
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onloadend = function(event){
        $(".panel").css("background-image" , "url(" + event.target.result + ")" );
        dataurl = event.target.result;
        $("#ref")[0].src = dataurl;
    }
    if (file && file.type.match('image.*'))
        reader.readAsDataURL(e.target.files[0]);
}

function settingOff(event) {
    $(".main").removeClass("blurred");
    $(".overlay").css({"display" : "none"});
    $("#imgsel").off("click");
    $("input[type=file]").off("change");
    $(".numminus").off("click");
    $(".numplus").off("click");
    reset();
    $("#start").html("start");

    document.title = "The " + (level * level - 1).toString() + " Puzzle";
    $("h1").html("The " + (level * level - 1).toString() + " Puzzle");
}

window.onload = function() {
    reset();
    $("#ref")[0].src = dataurl;
    $('#start').click(startGame);
    $('#setting').click(settingOn);
    $('#save').click(settingOff);
}
