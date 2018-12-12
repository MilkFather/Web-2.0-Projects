window.onload = function() {
    $('#button').mouseleave(resetAll);
    $('.apb').click(automania);
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

function resetAll(event) {
    $('#info-bar').addClass('inactive');
    $('.button').removeClass('inactive');
    $('.unread').addClass('hidden');
    $('#info-bar .info').html('');
    $('#status').html('等待操作');
}

function bubbleClick(num) {
    if ($('#info-bar').hasClass('inactive')) return;
    $('#info-bar .info').html(num.toString());
    $('#info-bar').addClass('inactive');
}

function manager(returned, order, currentsum, success) {
    if (returned != undefined) {
        // during one process
        if (success) {
            // is the final one?
            if (order.indexOf(returned) >= 4) {
                // trigger bubble
                $('#info-bar').removeClass('inactive');
                setTimeout(bubbleClick, 1000, [currentsum]);
            } else {
                // make next function
                if (order[order.indexOf(returned) + 1].hasClass('mask')) aHandler(order[order.indexOf(returned) + 1], currentsum, order);
                if (order[order.indexOf(returned) + 1].hasClass('history')) bHandler(order[order.indexOf(returned) + 1], currentsum, order);
                if (order[order.indexOf(returned) + 1].hasClass('message')) cHandler(order[order.indexOf(returned) + 1], currentsum, order);
                if (order[order.indexOf(returned) + 1].hasClass('setting')) dHandler(order[order.indexOf(returned) + 1], currentsum, order);
                if (order[order.indexOf(returned) + 1].hasClass('sign')) eHandler(order[order.indexOf(returned) + 1], currentsum, order);
            }
        } else {
            // show error message and retry
            if (order[order.indexOf(returned)].hasClass('mask')) aHandler(order[order.indexOf(returned)], currentsum, order);
            if (order[order.indexOf(returned)].hasClass('history')) bHandler(order[order.indexOf(returned)], currentsum, order);
            if (order[order.indexOf(returned)].hasClass('message')) cHandler(order[order.indexOf(returned)], currentsum, order);
            if (order[order.indexOf(returned)].hasClass('setting')) dHandler(order[order.indexOf(returned)], currentsum, order);
            if (order[order.indexOf(returned)].hasClass('sign')) eHandler(order[order.indexOf(returned)], currentsum, order);
        }
    } else {
        // initial startup
        order = shuffle(order);
        msg = "顺序:";
        for (var i = 0; i < 5; i++) {
            if (order[i].hasClass('mask')) msg += " A";
            if (order[i].hasClass('history')) msg += " B";
            if (order[i].hasClass('message')) msg += " C";
            if (order[i].hasClass('setting')) msg += " D";
            if (order[i].hasClass('sign')) msg += " E";
        }
        $('#status').html(msg);
        if (order[0].hasClass('mask')) aHandler(order[0], currentsum, order);
        if (order[0].hasClass('history')) bHandler(order[0], currentsum, order);
        if (order[0].hasClass('message')) cHandler(order[0], currentsum, order);
        if (order[0].hasClass('setting')) dHandler(order[0], currentsum, order);
        if (order[0].hasClass('sign')) eHandler(order[0], currentsum, order);
    }
}

function automania(event) {
    manager(undefined, [$('.mask'), $('.history'), $('.message'), $('.setting'), $('.sign')], 0, undefined);
}

function aHandler(target, currentsum, order) {
    if (target.hasClass('inactive')) return;
    target.children('.unread').html('...');
    target.children('.unread').removeClass('hidden');
    $('.history').addClass('inactive'); $('.message').addClass('inactive'); $('.setting').addClass('inactive'); $('.sign').addClass('inactive');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (function(target, currentsum, order) {
        return function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    target.children('.unread').html(this.responseText);
                    if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
                    if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
                    if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
                    if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
                    if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
            
                    currentsum += parseInt(this.responseText);
                    manager(target, order, currentsum, true);
                } else {
                    // error method
                    manager(target, order, currentsum, false);
                }
            }
        }
    })(target, currentsum, order);
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    xhttp.send();
}

function bHandler(target, currentsum, order) {
    if (target.hasClass('inactive')) return;
    target.children('.unread').html('...');
    target.children('.unread').removeClass('hidden');
    $('.mask').addClass('inactive'); $('.message').addClass('inactive'); $('.setting').addClass('inactive'); $('.sign').addClass('inactive');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (function(target, currentsum, order) {
        return function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    target.children('.unread').html(this.responseText);
                    if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
                    if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
                    if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
                    if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
                    if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
            
                    currentsum += parseInt(this.responseText);
                    manager(target, order, currentsum, true);
                } else {
                    // error method
                    manager(target, order, currentsum, false);
                }
            }
        }
    })(target, currentsum, order);
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    xhttp.send();
}

function cHandler(target, currentsum, order) {
    if (target.hasClass('inactive')) return;
    target.children('.unread').html('...');
    target.children('.unread').removeClass('hidden');
    $('.mask').addClass('inactive'); $('.history').addClass('inactive'); $('.setting').addClass('inactive'); $('.sign').addClass('inactive');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (function(target, currentsum, order) {
        return function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    target.children('.unread').html(this.responseText);
                    if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
                    if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
                    if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
                    if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
                    if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
            
                    currentsum += parseInt(this.responseText);
                    manager(target, order, currentsum, true);
                } else {
                    // error method
                    manager(target, order, currentsum, false);
                }
            }
        }
    })(target, currentsum, order);
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    xhttp.send();
}

function dHandler(target, currentsum, order) {
    if (target.hasClass('inactive')) return;
    target.children('.unread').html('...');
    target.children('.unread').removeClass('hidden');
    $('.mask').addClass('inactive'); $('.history').addClass('inactive'); $('.message').addClass('inactive'); $('.sign').addClass('inactive');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (function(target, currentsum, order) {
        return function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    target.children('.unread').html(this.responseText);
                    if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
                    if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
                    if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
                    if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
                    if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
            
                    currentsum += parseInt(this.responseText);
                    manager(target, order, currentsum, true);
                } else {
                    // error method
                    manager(target, order, currentsum, false);
                }
            }
        }
    })(target, currentsum, order);
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    xhttp.send();
}

function eHandler(target, currentsum, order) {
    if (target.hasClass('inactive')) return;
    target.children('.unread').html('...');
    target.children('.unread').removeClass('hidden');
    $('.mask').addClass('inactive'); $('.history').addClass('inactive'); $('.message').addClass('inactive'); $('.setting').addClass('inactive');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (function(target, currentsum, order) {
        return function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    target.children('.unread').html(this.responseText);
                    if ($('.mask .unread').hasClass('hidden')) $('.mask').removeClass('inactive'); else $('.mask').addClass('inactive');
                    if ($('.history .unread').hasClass('hidden')) $('.history').removeClass('inactive'); else $('.history').addClass('inactive');
                    if ($('.message .unread').hasClass('hidden')) $('.message').removeClass('inactive'); else $('.message').addClass('inactive');
                    if ($('.setting .unread').hasClass('hidden')) $('.setting').removeClass('inactive'); else $('.setting').addClass('inactive');
                    if ($('.sign .unread').hasClass('hidden')) $('.sign').removeClass('inactive'); else $('.sign').addClass('inactive');
            
                    currentsum += parseInt(this.responseText);
                    manager(target, order, currentsum, true);
                } else {
                    // error method
                    manager(target, order, currentsum, false);
                }
            }
        }
    })(target, currentsum, order);
    xhttp.open("GET", "/num?reqid=" + Math.round(Math.random() * 100000), true);
    xhttp.send();
}