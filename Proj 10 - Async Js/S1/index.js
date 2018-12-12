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
    $('.mask').click(aClick);
    $('.history').click(bClick);
    $('.message').click(cClick);
    $('.setting').click(dClick);
    $('.sign').click(eClick);
    $('#info-bar').click(bubbleClick);
}

function resetAll(event) {
    $('#info-bar').addClass('inactive');
    $('.button').removeClass('inactive');
    $('.unread').addClass('hidden');
    $('#info-bar .info').html('');
    resetsum();
}

function aClick(event) {
    if ($('.mask').hasClass('inactive')) return;
    $('.history').addClass('inactive');
    $('.message').addClass('inactive');
    $('.setting').addClass('inactive');
    $('.sign').addClass('inactive');

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
        if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
        if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
        if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
        if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
        if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
        setNum(0, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
        }
    }
}

function bClick(event) {
    if ($('.history').hasClass('inactive')) return;
    $('.mask').addClass('inactive');
    $('.message').addClass('inactive');
    $('.setting').addClass('inactive');
    $('.sign').addClass('inactive');

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
        if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
        if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
        if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
        if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
        if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
        //var res = sum();
        setNum(1, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
        }
    }
}

function cClick(event) {
    if ($('.message').hasClass('inactive')) return;
    $('.history').addClass('inactive');
    $('.mask').addClass('inactive');
    $('.setting').addClass('inactive');
    $('.sign').addClass('inactive');

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
        if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
        if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
        if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
        if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
        if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
        //var res = sum();
        setNum(2, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
        }
    }
}

function dClick(event) {
    if ($('.setting').hasClass('inactive')) return;
    $('.history').addClass('inactive');
    $('.message').addClass('inactive');
    $('.mask').addClass('inactive');
    $('.sign').addClass('inactive');

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
        if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
        if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
        if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
        if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
        if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
        //var res = sum();
        setNum(3, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
        }
    }
}

function eClick(event) {
    if ($('.sign').hasClass('inactive')) return;
    $('.history').addClass('inactive');
    $('.message').addClass('inactive');
    $('.setting').addClass('inactive');
    $('.mask').addClass('inactive');

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
        if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
        if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
        if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
        if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
        if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
        //var res = sum();
        setNum(4, parseInt(this.responseText));
        if (!isNaN(res())) {
            $('#info-bar').removeClass('inactive');
        }
    }
}

function bubbleClick(event) {
    if ($('#info-bar').hasClass('inactive')) return;
    $('#info-bar .info').html(res().toString());
    $('#info-bar').addClass('inactive');
}