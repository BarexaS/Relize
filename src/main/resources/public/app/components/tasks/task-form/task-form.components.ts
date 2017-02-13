import {Component, Output, EventEmitter} from "@angular/core";
import {ITask, Task} from "../../../shared/task.model";
import {TaskService} from "../../../shared/task.service";
import {Http, Response} from "@angular/http";
import {ApiUrl} from "../../../../login/apiurl.model";
declare var $: any;

@Component({
    selector: 'task-add',
    templateUrl: './app/components/tasks/task-form/task-form.component.html',
    styleUrls: ['./app/components/tasks/task-form/task-form.component.css']
})
export class TaskFormComponent {
    @Output() created : EventEmitter<ITask>;
    taskService : TaskService;
    message : string;

    constructor(taskService:TaskService, private http:Http, private apiurl:ApiUrl) {
        this.taskService = taskService;
        this.created = new EventEmitter<ITask>();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    creat(title:string, text:string,date:string){
        if(title && date) {
            let task = new Task(title,date,text);
            this.created.emit(task);
            this.message = 'Task created!';
        }
        if (!date){
            this.message = 'Date is required!';
        }
        if (!title){
            this.message = 'Title is required!';
        }
    }

    fileAdded(fileInput: any){
        this.taskService.filesToUpload = fileInput.target.files[0];
    }
}