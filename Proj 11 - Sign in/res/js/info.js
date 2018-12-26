function logout(e) {
    // expire current section, immediately
    $.ajax({
        type: "POST",
        url: "/logout",
        success: function() {
            window.location.replace("/");
        }
    })
}

window.onload = function() {
    $("#logout").click(logout);
    if ($(".err-msg").html() != "")
        window.setTimeout(function() {window.location.replace("/?username=" + $("#username").html())}, 3000)
}