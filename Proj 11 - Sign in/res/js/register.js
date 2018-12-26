var nameok = false;
var pwdok = false;
var pwdrok = false;
var idok = false;
var emailok = false;
var phoneok = false;

function beforeSubmit(e) {
    e.preventDefault();
    if ($("#sub").hasClass("disabled") || $("#sub").hasClass("success")) {
        return; // escape
    } else {
        // post
        $("#sub").addClass("disabled");
        $("#sub").html("请等待...");
        var dataString = "request=register" +
                         "&name=" + $("#n").val() +
                         "&pwd=" + $("#pa").val() +
                         "&id=" + $("#i").val() +
                         "&email=" + $("#e").val() +
                         "&phone=" + $("#ph").val();
        $.ajax({
            type: "POST",
            url: $(location).attr("href"),
            data: dataString,
            success: function(data, textStatus, jqXHR) {
                if (data == "0") {
                    // success
                    $("#sub").removeClass("disabled");
                    $("#sub").html("注册成功");
                    $("#sub").addClass("success");

                    setTimeout(function() {window.location.href = "/";}, 750);
                } else {
                    // there are error
                    $("#sub").html("注册");
                    var r = (parseInt(data)).toString(2).padStart(5, 0);
                    if (r[0] == "1") {
                        $("#ne").html("无效的用户名");
                        $("#n").addClass("err");
                        nameok = false;
                    }
                    if (r[1] == "1") {
                        $("#pae").html("无效的密码");
                        $("#pa").addClass("err");
                        pwdok = false;
                    }
                    if (r[2] == "1") {
                        $("#ie").html("无效的学号");
                        $("#i").addClass("err");
                        idok = false;
                    }
                    if (r[3] == "1") {
                        $("#ee").html("无效的邮箱地址");
                        $("#e").addClass("err");
                        emailok = false;
                    }
                    if (r[4] == "1") {
                        $("#phe").html("无效的电话号码");
                        $("#ph").addClass("err");
                        phoneok = false;
                    }
                }
            }
        });
    }
}

function nameChange(e) {
    if (!validateName($("#n").val())) {
        $("#ne").html("无效的用户名");
        $("#n").addClass("err");
        nameok = false;
    } else {
        // ajax check duplicate
        var dataString = "request=check&field=name&name=" + $("#n").val();
        $.ajax({
            type: "POST",
            url: $(location).attr("href"),
            data: dataString,
            success: function(data, textStatus, jqXHR) {
                if (data == "0") {
                    // ok
                    $("#ne").html("");
                    $("#n").removeClass("err");
                    nameok = true;
                } else {
                    // not ok
                    $("#ne").html("用户名已被使用");
                    $("#n").addClass("err");
                    nameok = false;
                }
                updateSubmitBtn();
            }
        });
    }
} 

function pwdChange(e) {
    if (!validatePassword($("#pa").val())) {
        $("#pae").html("无效的密码");
        $("#pa").addClass("err");
        pwdok = false;
    } else {
        $("#pae").html("");
        $("#pa").removeClass("err");
        pwdok = true;
        pwdrChange(undefined);
    }
    updateSubmitBtn();
}

function pwdrChange(e) {
    if ($("#pa").val() != $("#par").val()) {
        $("#pare").html("密码不正确");
        $("#par").addClass("err");
        pwdrok = false;
    } else {
        $("#pare").html("");
        $("#par").removeClass("err");
        pwdrok = true;
    }
    updateSubmitBtn();
}

function idChange(e) {
    if (!validateID($("#i").val())) {
        $("#ie").html("无效的学号");
        $("#i").addClass("err");
        idok = false;
    } else {
        // ajax check duplicate
        var dataString = "request=check&field=id&name=" + $("#i").val();
        $.ajax({
            type: "POST",
            url: $(location).attr("href"),
            data: dataString,
            success: function(data, textStatus, jqXHR) {
                if (data == "0") {
                    // ok
                    $("#ie").html("");
                    $("#i").removeClass("err");
                    idok = true;
                } else {
                    // not ok
                    $("#ie").html("学号已被使用");
                    $("#i").addClass("err");
                    idok = false;
                }
                updateSubmitBtn();
            }
        });
    }
}

function emailChange(e) {
    if (!validateEmail($("#e").val())) {
        $("#ee").html("无效的邮箱地址");
        $("#e").addClass("err");
        emailok = false;
    } else {
        // ajax check duplicate
        var dataString = "request=check&field=email&name=" + $("#e").val();
        $.ajax({
            type: "POST",
            url: $(location).attr("href"),
            data: dataString,
            success: function(data, textStatus, jqXHR) {
                if (data == "0") {
                    // ok
                    $("#ee").html("");
                    $("#e").removeClass("err");
                    emailok = true;
                } else {
                    // not ok
                    $("#ee").html("邮箱已被使用");
                    $("#e").addClass("err");
                    emailok = false;
                }
                updateSubmitBtn();
            }
        });
    }
}

function phoneChange(e) {
    if (!validatePhone($("#ph").val())) {
        $("#phe").html("无效的电话号码");
        $("#ph").addClass("err");
        phoneok = false;
    } else {
        var dataString = "request=check&field=phone&name=" + $("#ph").val();
        $.ajax({
            type: "POST",
            url: $(location).attr("href"),
            data: dataString,
            success: function(data, textStatus, jqXHR) {
                if (data == "0") {
                    // ok
                    $("#phe").html("");
                    $("#ph").removeClass("err");
                    phoneok = true;
                } else {
                    // not ok
                    $("#phe").html("电话已被使用");
                    $("#ph").addClass("err");
                    phoneok = false;
                }
                updateSubmitBtn();
            }
        });
    }
}

function clearAll(e) {
    $("#n").val(""); $("#n").removeClass("err");
    $("#pa").val(""); $("#pa").removeClass("err");
    $("#par").val(""); $("#par").removeClass("err");
    $("#i").val(""); $("#i").removeClass("err");
    $("#e").val(""); $("#e").removeClass("err");
    $("#ph").val(""); $("#ph").removeClass("err"); 

    $("#ne").html(""); nameok = false;
    $("#pae").html(""); pwdok = false;
    $("#pare").html(""); pwdrok = false;
    $("#ie").html(""); idok = false;
    $("#ee").html(""); emailok = false;
    $("#phe").html(""); phoneok = false;

    updateSubmitBtn();
}

function updateSubmitBtn() {
    if (nameok && pwdok && pwdrok && idok && emailok && phoneok) {
        $("#sub").removeClass("disabled");
    } else {
        $("#sub").addClass("disabled");
    }
}

window.onload = function() {
    $("#sub").addClass("disabled");
    $("#sub").click(beforeSubmit);

    $("#n").change(nameChange);
    $("#pa").change(pwdChange);
    $("#par").change(pwdrChange);
    $("#i").change(idChange);
    $("#e").change(emailChange);
    $("#ph").change(phoneChange);

    $("#clear").click(clearAll);
    clearAll(undefined);
}