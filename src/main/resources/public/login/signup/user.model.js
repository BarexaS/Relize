"use strict";
var User = (function () {
    function User(login, password, repPassword, secretWord) {
        this.login = login;
        this.password = password;
        this.repPassword = repPassword;
        this.secretWord = secretWord;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map