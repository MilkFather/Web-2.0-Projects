function beforeSubmit(e) {
    var flag = true;
    e.preventDefault();
    document.getElementById("error").innerHTML = "Error.";
    if (!validateName(document.getElementById("n").value)) {
        document.getElementById("error").innerHTML += " Invalid name."
        document.getElementById("n").classList.add("err");
        flag = false;
    } else {
        document.getElementById("n").classList.remove("err");
    }
    if (!validateId(document.getElementById("pa").value)) {
        document.getElementById("error").innerHTML += " Invalid ID.";
        document.getElementById("pa").classList.add("err");
        flag = false;
    } else {
        document.getElementById("pa").classList.remove("err");
    }
    if (!validateEmail(document.getElementById("e").value)) {
        document.getElementById("error").innerHTML += " Invalid email.";
        document.getElementById("e").classList.add("err");
        flag = false;
    } else {
        document.getElementById("e").classList.remove("err");
    }
    if (!validatePhone(document.getElementById("ph").value)) {
        document.getElementById("error").innerHTML += " Invalid phone number.";
        document.getElementById("ph").classList.add("err");
        flag = false;
    } else {
        document.getElementById("ph").classList.remove("err");
    }

    if (flag) {
        document.getElementById("error").innerHTML = "";
        document.getElementById("f").submit();
    }
}

function clearall(e) {
    document.getElementById("error").innerHTML = "";
    document.getElementById("n").value = "";
    document.getElementById("pa").value = "";
    document.getElementById("e").value = "";
    document.getElementById("ph").value = "";
}

window.onload = function(e) {
    document.getElementById("sub").onclick = beforeSubmit;
    document.getElementById("clear").onclick = clearall;
}