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
var task_service_1 = require("../../shared/task.service");
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        var _this = this;
        this.tasks = [];
        this.weeks = [[], [], [], [], []];
        this.taskService = taskService;
        taskService.onAdded$.subscribe(function (task) {
            _this.taskService.addTask(task)
                .subscribe(function (data) { return _this.addTask(data); });
        });
    }
    TasksComponent.prototype.taskToggled = function (task) {
        this.taskService.saveTask(task).subscribe(function (data) {
        });
    };
    TasksComponent.prototype.taskDeleted = function (task) {
        this.taskService.deleteTask(task).subscribe(function (data) {
        });
        this.deleteTask(task);
    };
    TasksComponent.prototype.deleteTask = function (task) {
        var index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    };
    TasksComponent.prototype.tasksForDay = function (day) {
        var tasksForDay = [];
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].date.split('-')[2] == day) {
                tasksForDay.push(this.tasks[i]);
            }
        }
        return tasksForDay;
    };
    TasksComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.calendarInit(date);
    };
    TasksComponent.prototype.calendarInit = function (date) {
        this.month = date.getMonth() + 1;
        this.year = date.getFullYear();
        this.date = new Date(this.year, this.month, 0);
        this.daysNumd = new Date(this.year, this.month, 0).getDate();
        this.loadMonth();
        this.constructMonth();
    };
    TasksComponent.prototype.loadMonth = function () {
        var _this = this;
        if ((this.month / 10) < 1) {
            this.taskService.getTaskData(this.year + '-0' + this.month).subscribe(function (data) { return _this.tasks = data; });
        }
        else {
            this.taskService.getTaskData(this.year + '-' + this.month).subscribe(function (data) { return _this.tasks = data; });
        }
    };
    TasksComponent.prototype.constructMonth = function () {
        this.weeks = [[], [], [], [], []];
        var k = 0;
        for (var i = 0; i < this.weeks.length; i++) {
            for (var j = 0; j < 7; j++) {
                k++;
                if (k > this.daysNumd)
                    break;
                this.weeks[i][j] = k;
            }
        }
    };
    TasksComponent.prototype.addTask = function (task) {
        this.tasks.push(task);
    };
    TasksComponent.prototype.nextMonth = function () {
        this.month = this.month + 1;
        this.date = new Date(this.year, this.month, 0);
        this.calendarInit(this.date);
    };
    TasksComponent.prototype.previousMonth = function () {
        this.month = this.month - 1;
        this.date = new Date(this.year, this.month, 0);
        this.calendarInit(this.date);
    };
    TasksComponent = __decorate([
        core_1.Component({
            selector: 'tasks',
            templateUrl: './app/components/tasks/tasks.component.html',
            styleUrls: ['./app/components/tasks/tasks.component.css']
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map