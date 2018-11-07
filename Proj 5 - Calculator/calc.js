query = "";
queryShow = "";

function justop() {
    if (query.length == 0)
        return false;
    else {
        var c = query.slice(-1);
        return c == '/' || c == '*' || c == "-" || c == "+";
    }
}

function inputopbtnclick() {
    var btn = event.target;

    if (resField.value != "") {
        // there is an answer already in buffer
        query = resField.value;
        queryShow = resField.value;
    }

    if (btn.id == "btn_div" && !justop()) {
        query += "/";
        queryShow += "÷";
    }
    else if (btn.id == "btn_mul" && !justop()) {
        query += "*";
        queryShow += "×";
    }
    else if (btn.id == "btn_minus" && !justop()) {
        query += "-";
        queryShow += "-";
    }
    else if (btn.id == "btn_plus" && !justop()) {
        query += "+";
        queryShow += "+";
    }

    exprField.value = queryShow;
    resField.value = "";
}

function inputnumbtnclick() {
    var btn = event.target;

    if (resField.value != "") {
        // there is an answer already in buffer
        query = "";
        queryShow = "";
    }
    query += btn.value;
    queryShow += btn.value;

    exprField.value = queryShow;
    resField.value = "";
}

function backspacebtnclick() {
    query = query.slice(0, -1);
    queryShow = queryShow.slice(0, -1);
    exprField.value = queryShow;
    resField.value = "";
}

function clearbtnclick() {
    query = "";
    queryShow = ""
    exprField.value = queryShow;
    resField.value = "";
}

function calcbtnclick() {
    if (query == "") return;
    try {
        var valu = eval(query);
        if (isFinite(valu)) {
            resField.value = valu.toString();
        } else {
            throw "evaluation error";
        }
    } catch(exception) {
        if (exception == "evaluation error") {
            alert("表达式计算出现错误，请检查表达式。");
        } else {
            alert("这个表达式不合法，请修改");
        }
    }
}

window.onload =
function () {
    const ls = document.getElementsByClassName("btn")
    var i;
    for (i = 0; i < ls.length; i++) {
        if (ls[i].id == "btn_backspace") {
            ls[i].onclick = backspacebtnclick;
        } else if (ls[i].id == "btn_ce") {
            ls[i].onclick = clearbtnclick;
        } else if (ls[i].id == "btn_equal") {
            ls[i].onclick = calcbtnclick;
        } else if (ls[i].id == "btn_div" || ls[i].id == "btn_mul" || ls[i].id == "btn_minus" || ls[i].id == "btn_plus") {
            ls[i].onclick = inputopbtnclick;
        } else {
            ls[i].onclick = inputnumbtnclick;
        }
    }
    exprField = document.getElementById("exprWindow");
    resField = document.getElementById("resultWindow");

    resField.value = "";
};
