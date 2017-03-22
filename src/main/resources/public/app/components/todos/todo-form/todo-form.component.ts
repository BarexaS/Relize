import {Component, Output, EventEmitter} from "@angular/core";
import {Todo} from "../../../shared/todo/todo.model";


@Component({
    selector: 'todo-form',
    templateUrl: './app/components/todos/todo-form/todo-form.component.html',
    styleUrls: ['./app/components/todos/todo-form/todo-form.component.css']
})

export class TodoFormComponent {
    @Output() created: EventEmitter<Todo>;
    message : string;

    constructor(){
        this.created = new EventEmitter<Todo>();
    }

    creat(title: string, text: string): void {
        if(title) {
            let todo = new Todo(title,text);
            this.created.emit(todo);
            this.message = '';
        }
        if (!title){
            this.message = 'Title is required!';
        }
    }
}