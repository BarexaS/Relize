import {Component, OnInit} from "@angular/core";
import {ITask} from "../../shared/task/task.model";
import {TaskService} from "../../shared/task/task.service";


@Component({
    selector: 'tasks',
    templateUrl: './app/components/tasks/tasks.component.html',
    styleUrls: ['./app/components/tasks/tasks.component.css']
})
export class TasksComponent implements OnInit {
    tasks:ITask[] = [];
    taskService:TaskService;
    daysNumd:number;
    weeks = [[], [], [], [], []];
    month:number;
    year:number;
    date:Date;

    constructor(taskService:TaskService) {
        this.taskService = taskService;
        taskService.onAdded$.subscribe(task => {
                this.taskService.addTask(task)
                    .subscribe(data => this.addTask(data));
            }
        );
    }

    taskToggled(task:ITask):void {
        this.taskService.saveTask(task).subscribe(data => {
        });
    }

    taskDeleted(task:ITask):void {
        this.taskService.deleteTask(task).subscribe(data => {
        });
        this.deleteTask(task);
    }

    deleteTask(task:ITask) {
        let index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }

    tasksForDay(day) {
        let tasksForDay:ITask[] = [];
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].date.split('-')[2] == day) {
                tasksForDay.push(this.tasks[i]);
            }
        }
        return tasksForDay;
    }

    ngOnInit() {
        let date = new Date();
        this.calendarInit(date);
    }

    private calendarInit(date:Date) {
        this.month = date.getMonth() + 1;
        this.year = date.getFullYear();
        this.date = new Date(this.year, this.month, 0);
        this.daysNumd = new Date(this.year, this.month, 0).getDate();
        this.loadMonth();
        this.constructMonth();
    }

    private loadMonth():void {
        if ((this.month / 10) < 1) {
            this.taskService.getTaskData(this.year + '-0' + this.month).subscribe(
                data => this.tasks = data
            )
        } else {
            this.taskService.getTaskData(this.year + '-' + this.month).subscribe(
                data => this.tasks = data
            )
        }
    }

    private constructMonth() {
        this.weeks = [[], [], [], [], []];
        let k = 0;
        for (let i = 0; i < this.weeks.length; i++) {
            for (let j = 0; j < 7; j++) {
                k++;
                if (k > this.daysNumd)  break;
                this.weeks[i][j] = k;
            }
        }
    }

    private addTask(task:ITask):void {
        this.tasks.push(task);
    }

    private nextMonth() {
        this.month = this.month + 1;
        this.date = new Date(this.year, this.month, 0);
        this.calendarInit(this.date);
    }

    private previousMonth() {
        this.month = this.month - 1;
        this.date = new Date(this.year, this.month, 0);
        this.calendarInit(this.date);
    }
}
