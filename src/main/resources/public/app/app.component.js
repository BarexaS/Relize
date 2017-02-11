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
var todo_service_1 = require("./shared/todo.service");
var task_service_1 = require("./shared/task.service");
var http_1 = require("@angular/http");
var apiurl_model_1 = require("../login/apiurl.model");
var AppComponent = (function () {
    function AppComponent(taskService, todoService, http) {
        this.http = http;
        this.todoService = todoService;
        this.taskService = taskService;
        this.title = 'OrganizeMe!';
        this.url = apiurl_model_1.ApiUrl.getInstance().getUrl();
        this.getLogin();
    }
    AppComponent.prototype.onTaskCreated = function (task) {
        this.taskService.taskCreated(task);
        $('#taskModal')
            .modal('hide');
    };
    AppComponent.prototype.onTodoCreated = function (todo) {
        this.todoService.todoCreated(todo);
        $('#todoModal')
            .modal('hide');
    };
    AppComponent.prototype.showTodoForm = function () {
        $('#todoModal')
            .modal('show');
    };
    AppComponent.prototype.showTaskForm = function () {
        $('#taskModal')
            .modal('show');
    };
    AppComponent.prototype.getLogin = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.get(this.url + "/get-login", options)
            .subscribe(function (data) {
            _this.login = data.text();
        }, function (error) { });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './app/app.component.html',
            styleUrls: ['./app/app.component.css'],
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService, todo_service_1.TodoService, http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map