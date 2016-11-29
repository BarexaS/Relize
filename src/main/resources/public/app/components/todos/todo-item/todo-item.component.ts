import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Todo} from "../../../shared/todo.model";

@Component({
    selector: "todo-item",
    templateUrl: './app/components/todos/todo-item/todo-item.component.html',
    styleUrls: ['./app/components/todos/todo-item/todo-item.component.css']
})

export class TodoItem {
    @Input() todo: Todo;
    @Output() deleted = new EventEmitter();
    @Output() toggled = new EventEmitter();

    showText : boolean;

    constructor() {
        this.toggled = new EventEmitter<Todo>();
        this.deleted = new EventEmitter<Todo>();
        this.showText = false;
    }

    toggle(){
        this.todo.done = !this.todo.done;
        this.toggled.emit(this.todo)
    }
    toggleShow(){
        this.showText = !this.showText;
    }

    delete(){
        this.deleted.emit(this.todo)
    }
}