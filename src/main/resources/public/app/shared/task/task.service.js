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
var Rx_1 = require("rxjs/Rx");
require("rxjs/Rx");
var apiurl_model_1 = require("../../../login/apiurl.model");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.onAdded$ = new core_1.EventEmitter();
        this.apiUrl = apiurl_model_1.ApiUrl.getInstance().getUrl();
        this.apiUrl = this.apiUrl + '/api/tasks';
        this.token = localStorage.getItem('token');
    }
    TaskService.prototype.extractData = function (res) {
        var body = res.json();
        this.filesToUpload = null;
        return body || {};
    };
    TaskService.prototype.taskCreated = function (task) {
        this.onAdded$.emit(task);
    };
    TaskService.prototype.addTask = function (task) {
        var formData = new FormData();
        if (this.filesToUpload !== undefined) {
            formData.append("file", this.filesToUpload, this.filesToUpload.name);
        }
        formData.append("task", new Blob([JSON.stringify(task)], {
            type: "application/json"
        }));
        var headers = new http_1.Headers({
            'token': this.token,
        });
        this.filesToUpload = undefined;
        return this.http.post(this.apiUrl, formData, { headers: headers })
            .map(this.extractData)
            .catch(function (error) {
            console.error(error);
            return Rx_1.Observable.throw(error.json());
        });
    };
    TaskService.prototype.saveTask = function (task) {
        var body = JSON.stringify(task);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('token', this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.apiUrl + "/" + task.id;
        return this.http.put(url, body, options)
            .map(this.extractData)
            .catch(function (error) {
            console.error(error);
            return Rx_1.Observable.throw(error.json());
        });
    };
    TaskService.prototype.getTaskData = function (date) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('token', this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.apiUrl + '/' + date, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            console.error(error);
            return Rx_1.Observable.throw(error.json());
        });
    };
    TaskService.prototype.deleteTask = function (task) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('token', this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.apiUrl + "/" + task.id;
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
    ], TaskService.prototype, "onAdded$", void 0);
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map