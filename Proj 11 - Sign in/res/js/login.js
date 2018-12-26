function loginattempt(e) {
    e.preventDefault();
    var dataString = "name=" + $("#n").val() + "&pwd=" + $("#pa").val();
    $.ajax({
        type: "POST",
        url: $(location).attr("href"),
        data: dataString,
        success: function(data, textStatus, jqXHR) {
            if (data == "0") {
                // login success, a session should be returned
                window.location.replace("/?username=" + $("#n").val())
            } else {
                // login fail, display a message
                $(".e").html("错误的用户名或者密码");
                $("input").addClass("err");
            }
        }
    });
}

window.onload = function() {
    $("#sub").click(loginattempt);
    $("#reg").click(function(){window.location.href = "/regist"});
}