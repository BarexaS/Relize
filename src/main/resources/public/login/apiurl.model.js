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
var ApiUrl = (function () {
    function ApiUrl() {
        this.apiUrl = 'http://localhost:8080';
        // if (!ApiUrl.isCreating) {
        //     throw new Error("You can't call new in instances! Call getInstance() instead.");
        // }
    }
    ApiUrl.getInstance = function () {
        if (ApiUrl.instance == null) {
            ApiUrl.isCreating = true;
            ApiUrl.instance = new ApiUrl();
            ApiUrl.isCreating = false;
        }
        return ApiUrl.instance;
    };
    ApiUrl.prototype.setToken = function (tok) {
        ApiUrl.token = tok;
    };
    ApiUrl.prototype.getToken = function () {
        return ApiUrl.token;
    };
    ApiUrl.prototype.setUrl = function (url) {
        this.apiUrl = url;
    };
    ApiUrl.prototype.getUrl = function () {
        return this.apiUrl;
    };
    // apiUrl = 'http://organizeme.tk';
    ApiUrl.token = '';
    ApiUrl.isCreating = false;
    ApiUrl = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ApiUrl);
    return ApiUrl;
}());
exports.ApiUrl = ApiUrl;
//# sourceMappingURL=apiurl.model.js.map