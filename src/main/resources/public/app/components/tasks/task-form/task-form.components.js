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
var task_model_1 = require("../../../shared/task.model");
var task_service_1 = require("../../../shared/task.service");
var TaskFormComponent = (function () {
    function TaskFormComponent(taskService) {
        this.taskService = taskService;
        this.created = new core_1.EventEmitter();
    }
    TaskFormComponent.prototype.creat = function (title, text, date, files) {
        var file = [];
        for (var i = 0; i < files.length; i++) {
            file.push(files[i]);
        }
        if (title && date) {
            var task = new task_model_1.Task(title, date, text, file);
            // this.taskService.filesToUpload = ;
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
        // this.filesToUpload = <Array<File>> fileInput.target.files;
        // var reader = new FileReader();
        // var resultSet = [];
        // var self = this;
        // reader.onloadend = function () {
        //     console.log("DONE!");
        //     self.taskService.filesToUpload.push(reader.result);
        // }
        //
        // for(var i = 0; i < this.filesToUpload.length; i++) {
        //     console.log(i);
        //     reader.readAsBinaryString(this.filesToUpload[i]);
        //     // this.taskService.filesToUpload.push(this.filesToUpload[i]);
        // }
        console.log(fileInput.target.files[0]);
        this.taskService.filesToUpload = fileInput.target.files[0];
    };
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
        __metadata('design:paramtypes', [task_service_1.TaskService])
    ], TaskFormComponent);
    return TaskFormComponent;
}());
exports.TaskFormComponent = TaskFormComponent;
//# sourceMappingURL=task-form.components.js.map