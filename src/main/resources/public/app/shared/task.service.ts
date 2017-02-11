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
    private _filesToUpload: Array<File>;

    constructor(private http:Http) {
        this.onAdded$ = new EventEmitter<ITask>();
        this.apiUrl = ApiUrl.getInstance().getUrl();
        this.apiUrl = this.apiUrl + '/api/tasks';
        this.token = localStorage.getItem('token')
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


    addTask(task:ITask):Observable<ITask> {
        return this.makeFileRequest(task);
        // let formData = new FormData();
        // formData.append("files", new Blob([this._filesToUpload[0]]));
        // task.file = [];
        // console.log(this._filesToUpload);
        // formData.append("task", new Blob([JSON.stringify(task)],{
        //     type: "application/json"
        // }));
        // console.log(task);
        // console.log(formData);
        // let headers = new Headers({
        //     'token': this.token,
        //     // 'Content-Type': undefined
        // });
        // return this.http.post(this.apiUrl, formData, {headers})
        //     .map(this.extractData)
        //     .catch(error => {
        //         console.error(error);
        //         return Observable.throw(error.json())
        //     })
    }

    makeFileRequest(task:ITask) {
        return Observable.create(observer =>  {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            console.log(this._filesToUpload);
            for(var i = 0; i < this._filesToUpload.length; i++) {
                formData.append("files", this._filesToUpload[i], this._filesToUpload[i].name);
            }
            // formData.append("task", new Blob([JSON.stringify(task)],{
            //         type: "application/json"
            //     }));
            formData.append("text","RABOTAI!");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            }
            xhr.open("POST",this.apiUrl, true);
            xhr.setRequestHeader("token",this.token);
            xhr.send(formData);
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


    set filesToUpload(value:Array<File>) {
        this._filesToUpload = value;
    }
}