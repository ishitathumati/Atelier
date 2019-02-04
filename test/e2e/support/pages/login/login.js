'use strict';

module.exports = function Login() {
    return {
        url: "login",
        getButtonByName: function (buttonName) {
            var mapping = {
                "Login": ".btn"
            };

            return mapping[buttonName];
        },
        getFieldByName: function (name) {
            var mapping = {
                "email": 'input[ng-model="login.mail"]',
                "password": 'input[ng-model="login.password"]',
            };

            return mapping[name];
        }
    };
}();