function sum() {
    var nums = [undefined, undefined, undefined, undefined, undefined];
    setNum = function(i, n) {nums[i] = n;};
    function getsum() {
        return nums[0] + nums[1] + nums[2] + nums[3] + nums[4];
    }
    resetsum = function() {nums[0] = nums[1] = nums[2] = nums[3] = nums[4] = undefined;};
    return getsum;
}

var res = sum();

window.onload = function() {
    $('#button').mouseleave(resetAll);
    $('.apb').click(automania);
}

function resetAll(event) {
    $('#info-bar').addClass('inactive');
    $('.button').removeClass('inactive');
    $('.unread').addClass('hidden');
    $('#info-bar .info').html('');
    resetsum();
}

function aClick() {
    if ($('.mask').hasClass('inactive')) return;

    $('.mask .unread').html('...');
    $('.mask .unread').removeClass('hidden');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = aHandler;
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    
    xhttp.send();
}

function aHandler() {
    if (this.readyState == 4 && this.status == 200) {
        $('.mask .unread').html(this.responseText);
        $('.mask').addClass('inactive');
        //var res = sum();
        setNum(0, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
            setTimeout(bubbleClick, 1000, [res()]);
        }
    }
}

function bClick() {
    if ($('.history').hasClass('inactive')) return;

    $('.history .unread').html('...');
    $('.history .unread').removeClass('hidden');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = bHandler;
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    
    xhttp.send();
}

function bHandler() {
    if (this.readyState == 4 && this.status == 200) {
        $('.history .unread').html(this.responseText);
        $('.history').addClass('inactive');
        //var res = sum();
        setNum(1, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
            setTimeout(bubbleClick, 1000, [res()]);
        }
    }
}

function cClick() {
    if ($('.message').hasClass('inactive')) return;

    $('.message .unread').html('...');
    $('.message .unread').removeClass('hidden');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = cHandler;
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    
    xhttp.send();
}

function cHandler() {
    if (this.readyState == 4 && this.status == 200) {
        $('.message .unread').html(this.responseText);
        $('.message').addClass('inactive');
        //var res = sum();
        setNum(2, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
            setTimeout(bubbleClick, 1000, [res()]);
        }
    }
}

function dClick() {
    if ($('.setting').hasClass('inactive')) return;

    $('.setting .unread').html('...');
    $('.setting .unread').removeClass('hidden');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = dHandler;
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    
    xhttp.send();
}

function dHandler() {
    if (this.readyState == 4 && this.status == 200) {
        $('.setting .unread').html(this.responseText);
        $('.setting').addClass('inactive');
        //var res = sum();
        setNum(3, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
            setTimeout(bubbleClick, 1000, [res()]);
        }
    }
}

function eClick() {
    if ($('.sign').hasClass('inactive')) return;

    $('.sign .unread').html('...');
    $('.sign .unread').removeClass('hidden');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = eHandler;
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    
    xhttp.send();
}

function eHandler() {
    if (this.readyState == 4 && this.status == 200) {
        $('.sign .unread').html(this.responseText);
        $('.sign').addClass('inactive');
        //var res = sum();
        setNum(4, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
            setTimeout(bubbleClick, 1000, [res()]);
        }
    }
}

function bubbleClick() {
    if ($('#info-bar').hasClass('inactive')) return;
    $('#info-bar .info').html(res().toString());
    $('#info-bar').addClass('inactive');
}

function automania(event) {
    aClick();
    bClick();
    cClick();
    dClick();
    eClick(); 
}