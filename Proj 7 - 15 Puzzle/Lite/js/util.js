function stdls() {
    l = [];
    for (var i = 0; i < level * level; i++) {
        l.push(i);
    }
    return l;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function checkSolvability() {
    var inversions = 0;
    for (var i = 0; i < level * level - 1; i++) {
        for (var j = i + 1; j < level * level; j++) {
            if (pos[i] > pos[j] && pos[i] != level * level - 1 && pos[j] != level * level - 1)
                inversions++;
        }
    }
    var drow = level - Math.floor(pos.indexOf(level * level - 1) / level);

    if (level % 2 == 1) {
        return inversions % 2 == 0;
    } else {
        return (inversions + drow) % 2 == 1;
    }
}

function eq(a, b) {
    if (a.length != b.length)
        return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] != b[i])
            return false;
    }
    return true;
}

function reset() {
    // delete
    for (var i = panelList.length - 1; i >= 0; i--) {
        document.getElementById('playground').removeChild(panelList[i]);
    }
    panelList = [];
    pos = [];
    // create
    panelwidth = 600 / level;
    panelheight = 600 / level;
    for (var i = 0; i < level * level; i++) {
        var x = document.createElement('div');
        var l = i % level;
        var t = Math.floor(i / level);
        x.classList.add('panel', 'p_' + i, 'r_' + t, 'c_' + l);
        x.tag = i;
        pos.push(i);
        panelList.push(x);
        $('#playground').append($(x));
        moves = 0;
        $("h5").html(moves + ' move(s)');
    }
}

function update() {
    for (var i = 0; i < panelList.length; i++) {
        panelList[i].classList.remove('c_0', 'c_1', 'c_2', 'c_3', 'r_0', 'r_1', 'r_2', 'r_3');
        var x = pos.indexOf(panelList[i].tag) % level;
        var y = Math.floor(pos.indexOf(panelList[i].tag) / level);
        panelList[i].classList.add('c_' + x, 'r_' + y);
    }
}

function startPuzzle(reshuffle) {
    panelList[level * level - 1].classList.add('spare');
    var origpos = pos.slice();
    do {
        pos = shuffle(pos);
    } while(!checkSolvability(pos) || eq(pos, stdls()) || eq(pos, origpos));
    
    if (!reshuffle) {
        window.setTimeout(function(){update()}, 300);
    } else {
        update();
    }
}

function endPuzzle() {
    window.setTimeout(
        function(){
            panelList[level * level - 1].classList.remove('spare');
        }, 
        300);
}
