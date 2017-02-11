import {Component} from "@angular/core";
import {TodoService} from "./shared/todo.service";
import {ITask} from "./shared/task.model";
import {TaskService} from "./shared/task.service";
import {ITodo} from "./shared/todo.model";
import {Headers, RequestOptions, Http} from "@angular/http";
import {ApiUrl} from "../login/apiurl.model";
declare var $: any;

@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
})
export class AppComponent {
    title: string;
    login:string;
    taskService: TaskService;
    todoService : TodoService;
    url:string;

    constructor(taskService : TaskService,todoService : TodoService, private http:Http) {
        this.todoService = todoService;
        this.taskService = taskService;
        this.title = 'OrganizeMe!';
        this.url = ApiUrl.getInstance().getUrl();
        this.getLogin();
    }


    onTaskCreated(task: ITask): void {
        this.taskService.taskCreated(task);
        $('#taskModal')
            .modal('hide')
        ;
    }

    onTodoCreated(todo: ITodo): void {
        this.todoService.todoCreated(todo);
        $('#todoModal')
            .modal('hide')
        ;
    }

    showTodoForm(){
        $('#todoModal')
            .modal('show')
        ;
    }
    showTaskForm(){
        $('#taskModal')
            .modal('show')
        ;
    }

    getLogin(){
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers});

        this.http.get(this.url + "/get-login", options)
            .subscribe(data => {
                this.login =  data.text();
            }, error => {});
    }
}