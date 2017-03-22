import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ITodo} from "../../../shared/todo/todo.model";

@Component({
    selector: "todo-item",
    templateUrl: './app/components/todos/todo-item/todo-item.component.html',
    styleUrls: ['./app/components/todos/todo-item/todo-item.component.css']
})

export class TodoItem {
    @Input() todo: ITodo;
    @Output() deleted = new EventEmitter();
    @Output() toggled = new EventEmitter();

    showText : boolean;

    constructor() {
        this.toggled = new EventEmitter<ITodo>();
        this.deleted = new EventEmitter<ITodo>();
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