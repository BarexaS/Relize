import {Component} from "@angular/core";
import {TodoService} from "./shared/todo.service";
import {ITask} from "./shared/task.model";
import {TaskService} from "./shared/task.service";
import {ITodo} from "./shared/todo.model";
declare var $: any;

@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
})
export class AppComponent {
    title: string;
    taskService: TaskService;
    todoService : TodoService;

    constructor(taskService : TaskService,todoService : TodoService) {
        this.todoService = todoService;
        this.taskService = taskService;
        this.title = 'OrganizeMe!';
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
}