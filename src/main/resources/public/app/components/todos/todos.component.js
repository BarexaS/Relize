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
var todo_service_1 = require("../../shared/todo.service");
var task_service_1 = require("../../shared/task.service");
var TodosComponent = (function () {
    function TodosComponent(todoService, taskService) {
        var _this = this;
        this.todos = [];
        this.todoService = todoService;
        this.taskService = taskService;
        todoService.onAdded$.subscribe(function (todo) {
            _this.todoService.addTodo(todo)
                .subscribe(function (data) { return _this.addTodo(data); });
        });
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todoService.getTodoData().subscribe(function (data) { return _this.todos = data; });
    };
    TodosComponent.prototype.onTodoToggled = function (todo) {
        this.todoService.saveTodo(todo).subscribe(function (data) { });
    };
    TodosComponent.prototype.onTodoDeleted = function (todo) {
        this.todoService.deleteTodo(todo).subscribe();
        this.deleteTodo(todo);
    };
    TodosComponent.prototype.addTodo = function (todo) {
        this.todos.push(todo);
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    };
    TodosComponent = __decorate([
        core_1.Component({
            selector: 'todos',
            templateUrl: './app/components/todos/todos.component.html',
            styleUrls: ['./app/components/todos/todos.components.css']
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService, task_service_1.TaskService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map