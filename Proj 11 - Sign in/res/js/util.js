function validateName(name) {
    const nameRegex = /^([a-zA-Z])([a-zA-Z0-9_]{5,17})$/;
    return (name.match(nameRegex) != null);
}

function validatePassword(password) {
    const passwordRegex = /^[0-9a-zA-Z_\-]{6,12}$/;
    return (password.match(passwordRegex) != null);
}

function validateID(id) {
    const idRegex = /^([1-9])([0-9]{7})$/;
    return (id.match(idRegex) != null);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/;
    return (email.match(emailRegex) != null);
}

function validatePhone(phone) {
    const phoneRegex = /^([1-9])([0-9]{10})$/;
    return (phone.match(phoneRegex) != null);
}
