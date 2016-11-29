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
require("rxjs/Rx");
var Rx_1 = require("rxjs/Rx");
var apiurl_model_1 = require("../../login/apiurl.model");
var TodoService = (function () {
    function TodoService(http, apiurl) {
        this.http = http;
        this.onAdded$ = new core_1.EventEmitter();
        this.apiUrl = apiurl.apiUrl + '/api/todos';
    }
    TodoService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    TodoService.prototype.todoCreated = function (todo) {
        this.onAdded$.emit(todo);
    };
    TodoService.prototype.getTodoData = function () {
        return this.http.get(this.apiUrl)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            console.error(error);
            return Rx_1.Observable.throw(error.json());
        });
    };
    TodoService.prototype.addTodo = function (todo) {
        var body = JSON.stringify(todo);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl, body, options)
            .map(this.extractData)
            .catch(function (error) {
            console.error(error);
            return Rx_1.Observable.throw(error.json());
        });
    };
    TodoService.prototype.saveTodo = function (todo) {
        var body = JSON.stringify(todo);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.apiUrl + "/" + todo.id;
        return this.http.put(url, body, options)
            .map(this.extractData)
            .catch(function (error) {
            console.error(error);
            return Rx_1.Observable.throw(error.json());
        });
    };
    TodoService.prototype.deleteTodo = function (todo) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.apiUrl + "/" + todo.id;
        return this.http.delete(url, options)
            .map(this.extractData)
            .catch(function (error) {
            console.error(error);
            return Rx_1.Observable.throw(error.json());
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TodoService.prototype, "onAdded$", void 0);
    TodoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, apiurl_model_1.ApiUrl])
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map