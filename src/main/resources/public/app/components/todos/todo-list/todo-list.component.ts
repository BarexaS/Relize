import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ITodo} from "../../../shared/todo.model";


@Component({
    selector: 'todo-list',
    templateUrl: './app/components/todos/todo-list/todo-list.component.html',
    styleUrls:['./app/components/todos/todo-list/todo-list.component.css']
})

export class TodoListComponent{
    @Input()  todos: ITodo[];
    @Output() toggled: EventEmitter<ITodo>;
    @Output() deleted: EventEmitter<ITodo>;
    
    constructor(){
        this.toggled = new EventEmitter<ITodo>(); 
        this.deleted = new EventEmitter<ITodo>(); 
    }

    get sortedTodos(): ITodo[]{
        return this.todos
        // Создаем "копию" массива
        .map(todo => todo)
        // Сортитуем массив по названию
        .sort((a,b) => {
            if (a.title > b.title) return 1;
            else if (a.title < b.title) return -1;
            else return 0;
        })
        // Сортируем массив по состоянию задачи
        .sort((a,b) => {
            if (a.done && !b.done) return 1;
            else if (!a.done && b.done) return -1;
            else return 0;
        })
    }

    onTodoDeleted(todo: ITodo): void{
        this.deleted.emit(todo);
    }

    onTodoToggled(todo: ITodo): void{
        this.toggled.emit(todo);
    }
}