function move(event) {
    // the basic inferring
    var id = event.target.tag;
    var x = pos.indexOf(id) % level;
    var y = Math.floor(pos.indexOf(id) / level);
    // check whether we can move it, utilizing the shorthand feature
    if (x != 0 && pos[y * level + x - 1] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[y * level + x - 1] = id;
        moves++;
    }
    if (x != level - 1 && pos[y * level + x + 1] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[y * level + x + 1] = id;
        moves++;
    }
    if (y != 0 && pos[(y - 1) * level + x] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[(y - 1) * level + x] = id;
        moves++;
    }
    if (y != level - 1 && pos[(y + 1) * level + x] == level * level - 1) {
        pos[y * level + x] = level * level - 1;
        pos[(y + 1) * level + x] = id;
        moves++;
    }
    update();
    // finally, if we finished it...
    if (eq(pos, stdls())) {
        endPuzzle();
        $('#start').html("start");
        $(".panel").off("click");
    }

    $("h5").html(moves + ' move(s)');
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

window.onload = function() {
    reset();
    $('#start').click(startGame);
}
