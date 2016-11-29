import {Component, Output, EventEmitter} from "@angular/core";
import {ITask, Task} from "../../../shared/task.model";

@Component({
    selector: 'task-add',
    templateUrl: './app/components/tasks/task-form/task-form.component.html',
    styleUrls: ['./app/components/tasks/task-form/task-form.component.css']
})
export class TaskFormComponent {
    @Output() created : EventEmitter<ITask>;

    message : string;

    constructor() {
        this.created = new EventEmitter<ITask>()
    }

    ngOnInit() { }

    creat(title:string, text:string,date:string){
        if(title && date) {
            let task = new Task(title,date,text);
            this.created.emit(task);
            this.message = 'Task created!';
        }
        if (!date){
            this.message = 'Date is required!';
        }
    }


}