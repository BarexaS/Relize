"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var apiurl_model_1 = require("./apiurl.model");
var LoginComponent = (function () {
    function LoginComponent(http) {
        this.http = http;
        this.wrongCredentials = false;
        this.wrongInput = false;
        this.url = apiurl_model_1.ApiUrl.getInstance().getUrl();
    }
    LoginComponent.prototype.signIn = function (login, pass) {
        var _this = this;
        this.wrongInput = false;
        this.wrongCredentials = false;
        if (login == null || login == "" || pass == null || pass == "") {
            this.wrongInputs();
            return;
        }
        var body = 'username=' + login + '&password=' + pass;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.url + "/loginOn", body, options)
            .subscribe(function (data) {
            _this.getToken(login, pass);
            // window.location.href = this.apiUrl + "/index.html";
        }, function (error) {
            if ((JSON.stringify(error.json().status)) == "203") {
                _this.wrongCredent();
            }
        });
    };
    LoginComponent.prototype.wrongCredent = function () {
        this.wrongCredentials = true;
        $('.ui.red.message')
            .transition('slide left');
    };
    LoginComponent.prototype.wrongInputs = function () {
        this.wrongInput = true;
        $('.ui.blue.message')
            .transition('slide left');
    };
    LoginComponent.prototype.signUp = function () {
        $('#singUpModal')
            .modal('show');
    };
    LoginComponent.prototype.facebookLogIn = function () {
        var form = $('<form action="/signin/facebook" method="post"><input type="submit" hidden/></form>');
        $(document.body).append(form);
        $('input[type="submit"]', form).click();
    };
    LoginComponent.prototype.getToken = function (login, pass) {
        var _this = this;
        var body = 'login=' + login + '&password=' + pass;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.url + "/get-token", body, options)
            .subscribe(function (data) {
            _this.setToken(data.text());
            window.location.href = _this.url + "/index.html";
        }, function (error) { });
    };
    LoginComponent.prototype.setToken = function (token) {
        localStorage.setItem('token', token);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login/login.component.html',
            styleUrls: ['./login/login.component.css'],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map