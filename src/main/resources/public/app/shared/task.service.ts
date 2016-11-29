import {Injectable, EventEmitter, Output} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {ITask} from "./task.model";
import "rxjs/Rx";
import {ApiUrl} from "../../login/apiurl.model";


@Injectable()
export class TaskService {

    @Output() onAdded$ : EventEmitter<ITask>;

    private apiUrl:string;

    constructor(private http:Http, apiurl:ApiUrl) {
        this.onAdded$ = new EventEmitter<ITask>();
        this.apiUrl = apiurl.apiUrl + '/api/tasks';
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    taskCreated(task:ITask):void{
        this.onAdded$.emit(task);
    }

    addTask(task:ITask):Observable<ITask> {
        let body = JSON.stringify(task);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        return this.http.post(this.apiUrl, body, options)
            .map(this.extractData)
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }

    saveTask(task:ITask) : Observable<ITask> {
        let body = JSON.stringify(task);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        let url = `${this.apiUrl}/${task.id}`;

        return this.http.put(url, body, options)
            .map(this.extractData)
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }

    getTaskData(date : string):Observable<any> {
        return this.http.get(this.apiUrl+'/'+date)
            .map(response => response.json())
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }

    deleteTask(task:ITask):Observable<ITask> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        let url = `${this.apiUrl}/${task.id}`;

        return this.http.delete(url, options)
            .map(this.extractData)
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }
}