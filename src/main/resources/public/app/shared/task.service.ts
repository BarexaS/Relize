import {Injectable, EventEmitter, Output} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {ITask} from "./task.model";
import "rxjs/Rx";
import {ApiUrl} from "../../login/apiurl.model";
declare var $: any;


@Injectable()
export class TaskService {

    @Output() onAdded$ : EventEmitter<ITask>;

    private apiUrl:string;
    private token:string;
    filesToUpload: File;

    constructor(private http:Http) {
        this.onAdded$ = new EventEmitter<ITask>();
        this.apiUrl = ApiUrl.getInstance().getUrl();
        this.apiUrl = this.apiUrl + '/api/tasks';
        this.token = localStorage.getItem('token');
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    taskCreated(task:ITask):void{
        this.onAdded$.emit(task);
    }
    //
    // addTask(task:ITask):Observable<ITask> {
    //     console.log(task);
    //     let body = JSON.stringify(task);
    //     let headers = new Headers({'Content-Type': 'application/json'});
    //     headers.append('token',this.token);
    //     let options = new RequestOptions({headers});
    //
    //     return this.http.post(this.apiUrl, body, options)
    //         .map(this.extractData)
    //         .catch(error => {
    //             console.error(error);
    //             return Observable.throw(error.json())
    //         })
    // }


    addTask(task:ITask):Observable<ITask>{
        let formData = new FormData();
        if (this.filesToUpload !== undefined){
            formData.append("file", this.filesToUpload ,this.filesToUpload.name);
        }
        formData.append("task", new Blob([JSON.stringify(task)],{
            type: "application/json"
        }));
        let headers = new Headers({
            'token': this.token,
        });
        return this.http.post(this.apiUrl, formData, {headers})
            .map(this.extractData)
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            });
    }

    saveTask(task:ITask) : Observable<ITask> {
        let body = JSON.stringify(task);
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('token',this.token);
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
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.get(this.apiUrl+'/'+date, options)
            .map(response => response.json())
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }

    deleteTask(task:ITask):Observable<ITask> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('token',this.token);
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