userLs = [];

exports.getUser = function(name) {
    for (var i = 0; i < userLs.length; i++) {
        if (userLs[i] && userLs[i].name == name) {
            return userLs[i];
        }
    }
}

exports.regUser = function(name, id, email, phone) {
    userLs.push({"name": name, "id": id, "email": email, "phone": phone});
}

exports.duplicateName = function(name) {
    for (var i = 0; i < userLs.length; i++) {
        if (userLs[i] && userLs[i].name == name) {
            return true;
        }
    }
    return false;
}

exports.duplicateId = function(id) {
    for (var i = 0; i < userLs.length; i++) {
        if (userLs[i] && userLs[i].id == id) {
            return true;
        }
    }
    return false;
}

exports.duplicateEmail = function(email) {
    for (var i = 0; i < userLs.length; i++) {
        if (userLs[i] && userLs[i].email == email) {
            return true;
        }
    }
    return false;
}

exports.duplicatePhone = function(phone) {
    for (var i = 0; i < userLs.length; i++) {
        if (userLs[i] && userLs[i].phone == phone) {
            return true;
        }
    }
    return false;
}

exports.validateName = function(name) {
    const nameRegex = /^([a-zA-Z])([a-zA-Z0-9_]{5,17})$/;
    return (name.match(nameRegex) != null);
}

exports.validateId = function(id) {
    const idRegex = /^([1-9])([0-9]{7})$/;
    return (id.match(idRegex) != null);
}

exports.validateEmail = function(email) {
    const emailRegex = /^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$$/;
    return (email.match(emailRegex) != null);
}

exports.validatePhone = function(phone) {
    const phoneRegex = /^([1-9])([0-9]{10})$/;
    return (phone.match(phoneRegex) != null);
}
