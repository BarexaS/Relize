import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {TodoService} from "./shared/todo.service";
import {TodosComponent} from "./components/todos/todos.component";
import {TodoFormComponent} from "./components/todos/todo-form/todo-form.component";
import {TodoItem} from "./components/todos/todo-item/todo-item.component";
import {TodoListComponent} from "./components/todos/todo-list/todo-list.component";
import {HttpModule} from "@angular/http";
import {TaskService} from "./shared/task.service";
import {TaskFormComponent} from "./components/tasks/task-form/task-form.components";
import {TasksComponent} from "./components/tasks/tasks.component";
import {DayComponent} from "./components/tasks/day/day.component";
import {ApiUrl} from "../login/apiurl.model";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        // routing
    ],
    declarations: [
        AppComponent,
        TodosComponent,
        TaskFormComponent,
        TasksComponent,
        DayComponent,
        TodoFormComponent,
        TodoItem,
        TodoListComponent
    ],
    providers: [
        ApiUrl,
        TodoService,
        TaskService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}