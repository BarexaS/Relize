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
var TodoListComponent = (function () {
    function TodoListComponent() {
        this.toggled = new core_1.EventEmitter();
        this.deleted = new core_1.EventEmitter();
    }
    Object.defineProperty(TodoListComponent.prototype, "sortedTodos", {
        get: function () {
            return this.todos
                .map(function (todo) { return todo; })
                .sort(function (a, b) {
                if (a.title > b.title)
                    return 1;
                else if (a.title < b.title)
                    return -1;
                else
                    return 0;
            })
                .sort(function (a, b) {
                if (a.done && !b.done)
                    return 1;
                else if (!a.done && b.done)
                    return -1;
                else
                    return 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    TodoListComponent.prototype.onTodoDeleted = function (todo) {
        this.deleted.emit(todo);
    };
    TodoListComponent.prototype.onTodoToggled = function (todo) {
        this.toggled.emit(todo);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TodoListComponent.prototype, "todos", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TodoListComponent.prototype, "toggled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TodoListComponent.prototype, "deleted", void 0);
    TodoListComponent = __decorate([
        core_1.Component({
            selector: 'todo-list',
            templateUrl: './app/components/todos/todo-list/todo-list.component.html',
            styleUrls: ['./app/components/todos/todo-list/todo-list.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TodoListComponent);
    return TodoListComponent;
}());
exports.TodoListComponent = TodoListComponent;
//# sourceMappingURL=todo-list.component.js.map