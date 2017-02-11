import {Component, Output, EventEmitter} from "@angular/core";
import {ITask, Task} from "../../../shared/task.model";
import {TaskService} from "../../../shared/task.service";

@Component({
    selector: 'task-add',
    templateUrl: './app/components/tasks/task-form/task-form.component.html',
    styleUrls: ['./app/components/tasks/task-form/task-form.component.css']
})
export class TaskFormComponent {
    @Output() created : EventEmitter<ITask>;
    taskService : TaskService;

    filesToUpload: Array<File>;
    message : string;

    constructor(taskService:TaskService) {
        this.taskService = taskService;
        this.created = new EventEmitter<ITask>();
    }

    creat(title:string, text:string,date:string, files:FileList){
        let file = [];
        for (var i = 0; i < files.length; i++) {
            file.push(files[i]);
        }
        if(title && date) {
            let task = new Task(title,date,text,file);
            this.taskService.filesToUpload = this.filesToUpload;
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
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
}