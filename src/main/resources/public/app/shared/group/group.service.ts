import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {ApiUrl} from "../../../login/apiurl.model";
import {Observable} from "rxjs/Rx";
import {Group} from "./group.model";

@Injectable()
export class GroupService {

    private apiUrl:string;
    private token:string;
    groups: Group[];


    constructor(private http:Http) {
        this.apiUrl = ApiUrl.getInstance().getUrl();
        this.token = localStorage.getItem('token');
        this.groups = [];
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    getGroups():Observable<any> {
        // let headers = new Headers({'Content-Type': 'application/json'});
        let headers = new Headers();
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.get(this.apiUrl+'/api/groups', options)
            .map(this.extractData)
            .catch(error => {
                return Observable.throw(error.json())
            })
    }

    addGroup(group:Group):Observable<any> {
        let body = JSON.stringify(group);
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.post(this.apiUrl+'/api/groups', body, options)
            .map(this.extractData)
            .catch(error => {
                return Observable.throw(error)
            })
    }

    leaveGroup(group:Group){
        let headers = new Headers();
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.delete(this.apiUrl+'/api/groups/'+group.id, options);
    }

    invite(login:string, groupId:number) {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.put(this.apiUrl+'/api/groups/'+groupId,  'login='+login, options);
    }

    getGroupsInvites() {
        let headers = new Headers();
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.get(this.apiUrl+'/api/groups/inv', options)
            .map(this.extractData)
            .catch(error => {
                return Observable.throw(error.json())
            })
    }

    removeInv(group:Group) {
        let headers = new Headers();
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.delete(this.apiUrl+'/api/groups/inv/'+group.id, options);
    }

    acceptInv(group:Group) {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        headers.append('token',this.token);
        let options = new RequestOptions({headers});
        return this.http.put(this.apiUrl+'/api/groups/inv', 'groupId='+group.id, options);
    }
}