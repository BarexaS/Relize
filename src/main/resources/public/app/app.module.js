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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var todo_service_1 = require("./shared/todo/todo.service");
var todos_component_1 = require("./components/todos/todos.component");
var todo_form_component_1 = require("./components/todos/todo-form/todo-form.component");
var todo_item_component_1 = require("./components/todos/todo-item/todo-item.component");
var todo_list_component_1 = require("./components/todos/todo-list/todo-list.component");
var http_1 = require("@angular/http");
var task_service_1 = require("./shared/task/task.service");
var task_form_components_1 = require("./components/tasks/task-form/task-form.components");
var tasks_component_1 = require("./components/tasks/tasks.component");
var day_component_1 = require("./components/tasks/day/day.component");
var apiurl_model_1 = require("../login/apiurl.model");
var groups_component_1 = require("./components/groups/groups.component");
var group_service_1 = require("./shared/group/group.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                todos_component_1.TodosComponent,
                task_form_components_1.TaskFormComponent,
                tasks_component_1.TasksComponent,
                day_component_1.DayComponent,
                todo_form_component_1.TodoFormComponent,
                todo_item_component_1.TodoItem,
                todo_list_component_1.TodoListComponent,
                groups_component_1.GroupsComponent
            ],
            providers: [
                apiurl_model_1.ApiUrl,
                todo_service_1.TodoService,
                task_service_1.TaskService,
                group_service_1.GroupService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map