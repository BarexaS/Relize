import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {ITask, Task} from "../../../shared/task/task.model";
import {TaskService} from "../../../shared/task/task.service";
import {Http, Response} from "@angular/http";
import {ApiUrl} from "../../../../login/apiurl.model";
import {Group} from "../../../shared/group/group.model";
import {GroupService} from "../../../shared/group/group.service";
declare var $: any;

@Component({
    selector: 'task-add',
    templateUrl: './app/components/tasks/task-form/task-form.component.html',
    styleUrls: ['./app/components/tasks/task-form/task-form.component.css']
})
export class TaskFormComponent implements OnInit{
    @Output() created : EventEmitter<ITask>;
    taskService : TaskService;
    message : string;
    groups: Group[];

    constructor(taskService:TaskService, private http:Http, private apiurl:ApiUrl, private groupService:GroupService) {
        this.taskService = taskService;
        this.created = new EventEmitter<ITask>();
        this.groups = []

    }

    ngOnInit(){
        this.groupService.getGroups().subscribe(
            data => this.groups = data
        )
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    creat(title:string, text:string,date:string, groupId:number){
        if(title && date) {
            let task = new Task(title,date,text,groupId);
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

    get sortedGroups(): Group[]{
        return this.groups
        // Создаем "копию" массива
            .map(group => group)
            // Сортитуем массив по названию
            .sort((a,b) => {
                if (a.name > b.name) return 1;
                else if (a.name < b.name) return -1;
                else return 0;
            })
    }
}