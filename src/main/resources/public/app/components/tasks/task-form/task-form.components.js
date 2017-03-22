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
var task_model_1 = require("../../../shared/task/task.model");
var task_service_1 = require("../../../shared/task/task.service");
var http_1 = require("@angular/http");
var apiurl_model_1 = require("../../../../login/apiurl.model");
var group_service_1 = require("../../../shared/group/group.service");
var TaskFormComponent = (function () {
    function TaskFormComponent(taskService, http, apiurl, groupService) {
        this.http = http;
        this.apiurl = apiurl;
        this.groupService = groupService;
        this.taskService = taskService;
        this.created = new core_1.EventEmitter();
        this.groups = [];
    }
    TaskFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupService.getGroups().subscribe(function (data) { return _this.groups = data; });
    };
    TaskFormComponent.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    TaskFormComponent.prototype.creat = function (title, text, date, groupId) {
        if (title && date) {
            var task = new task_model_1.Task(title, date, text, groupId);
            this.created.emit(task);
            this.message = 'Task created!';
        }
        if (!date) {
            this.message = 'Date is required!';
        }
        if (!title) {
            this.message = 'Title is required!';
        }
    };
    TaskFormComponent.prototype.fileAdded = function (fileInput) {
        this.taskService.filesToUpload = fileInput.target.files[0];
    };
    Object.defineProperty(TaskFormComponent.prototype, "sortedGroups", {
        get: function () {
            return this.groups
                .map(function (group) { return group; })
                .sort(function (a, b) {
                if (a.name > b.name)
                    return 1;
                else if (a.name < b.name)
                    return -1;
                else
                    return 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TaskFormComponent.prototype, "created", void 0);
    TaskFormComponent = __decorate([
        core_1.Component({
            selector: 'task-add',
            templateUrl: './app/components/tasks/task-form/task-form.component.html',
            styleUrls: ['./app/components/tasks/task-form/task-form.component.css']
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService, http_1.Http, apiurl_model_1.ApiUrl, group_service_1.GroupService])
    ], TaskFormComponent);
    return TaskFormComponent;
}());
exports.TaskFormComponent = TaskFormComponent;
//# sourceMappingURL=task-form.components.js.map