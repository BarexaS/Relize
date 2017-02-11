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
var user_model_1 = require("../user.model");
var http_1 = require("@angular/http");
var apiurl_model_1 = require("../../apiurl.model");
var SignUpFormComponent = (function () {
    function SignUpFormComponent(http, apiurl) {
        this.http = http;
        this.confPass = 'ng-invalid';
        this.model = new user_model_1.User(null, null, null, null);
        this.loginExist = false;
        this.passwordTooShort = false;
        this.passwordMismatch = false;
        this.apiUrl = apiurl.apiUrl;
    }
    SignUpFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginExist = false;
        this.passwordTooShort = false;
        this.passwordMismatch = false;
        var body = JSON.stringify(this.model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.apiUrl + '/signup', body, options)
            .subscribe(function (data) {
            _this.takeResponse(data.text());
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    SignUpFormComponent.prototype.takeResponse = function (data) {
        switch (data) {
            case 'Passwords didn\'t match': {
                this.passwordMismatch = true;
                break;
            }
            case 'Password too short': {
                this.passwordTooShort = true;
                break;
            }
            case 'Login already exist': {
                this.loginExist = true;
                break;
            }
            case 'SUCCESS': {
                this.loggin();
                break;
            }
        }
    };
    SignUpFormComponent.prototype.loggin = function () {
        var _this = this;
        var body = 'username=' + this.model.login + '&password=' + this.model.password;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.apiUrl + "/loginOn", body, options)
            .subscribe(function (data) {
            window.location.href = _this.apiUrl + "/index.html";
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    SignUpFormComponent.prototype.repPassChanged = function (pass, confPass) {
        if (pass == confPass) {
            this.confPass = 'ng-valid';
        }
        else {
            this.confPass = 'ng-invalid';
        }
    };
    SignUpFormComponent = __decorate([
        core_1.Component({
            selector: 'signup-form',
            templateUrl: './login/signup/form/signup-form.component.html',
            styleUrls: ['./login/signup/form/signup-form.component.css'],
        }), 
        __metadata('design:paramtypes', [http_1.Http, apiurl_model_1.ApiUrl])
    ], SignUpFormComponent);
    return SignUpFormComponent;
}());
exports.SignUpFormComponent = SignUpFormComponent;
//# sourceMappingURL=signup-form.component.js.map