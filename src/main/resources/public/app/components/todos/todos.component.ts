import {Component, OnInit} from "@angular/core";
import {ITodo} from "../../shared/todo.model";
import {TodoService} from "../../shared/todo.service";
import {TaskService} from "../../shared/task.service";


@Component({
    selector: 'todos',
    templateUrl: './app/components/todos/todos.component.html',
    styleUrls: ['./app/components/todos/todos.components.css']
})
export class TodosComponent implements OnInit {
    todos: ITodo[];
    todoService: TodoService;
    taskService: TaskService;

    constructor(todoService: TodoService, taskService : TaskService) {
        this.todos = [];
        this.todoService = todoService;
        this.taskService = taskService;
        todoService.onAdded$.subscribe(todo => {
                this.todoService.addTodo(todo)
                    .subscribe(data => this.addTodo(data));
            }
        );
    }

    ngOnInit(){
        this.todoService.getTodoData().subscribe(
            data => this.todos = data
        )
    }

    onTodoToggled(todo: ITodo): void {
        this.todoService.saveTodo(todo).subscribe(data => {})
    }

    onTodoDeleted(todo: ITodo): void {
        this.todoService.deleteTodo(todo).subscribe();
        this.deleteTodo(todo);
    }

    private addTodo(todo: ITodo): void {
        this.todos.push(todo);
    }


    private deleteTodo(todo: ITodo): void {
        let index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }
}