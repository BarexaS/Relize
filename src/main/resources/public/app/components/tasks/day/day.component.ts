import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {ITask} from "../../../shared/task.model";
declare var $: any;

@Component({
    selector: 'day',
    templateUrl: './app/components/tasks/day/day.component.html',
    styleUrls: ['./app/components/tasks/day/day.component.css']
})
export class DayComponent implements OnInit{
    @Input() dayTasks : ITask[];
    @Input() day : number;
    @Input() date : Date;
    @Output() toggled: EventEmitter<ITask>;
    @Output() deleted: EventEmitter<ITask>;

    constructor(){
        this.toggled = new EventEmitter<ITask>();
        this.deleted = new EventEmitter<ITask>();
    }

    ngOnInit(){
        this.date.setDate(this.day);
    }

    showTasks(day){
        $('#dayModal'+day)
            .modal('show')
        ;
    }

    onTaskToggled(task:ITask){
        this.toggled.emit(task);
    }
    onTaskDeleted(task:ITask){
        this.deleted.emit(task);
    }
}
