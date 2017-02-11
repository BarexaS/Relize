import {Injectable} from "@angular/core";

@Injectable()
export class ApiUrl {
    apiUrl = 'http://localhost:8080';
    // apiUrl = 'http://organizeme.tk';

    static token : string = '';
    static instance: ApiUrl;
    static isCreating:Boolean = false;

    constructor() {
        // if (!ApiUrl.isCreating) {
        //     throw new Error("You can't call new in instances! Call getInstance() instead.");
        // }
    }

    static getInstance() {
        if (ApiUrl.instance == null) {
            ApiUrl.isCreating = true;
            ApiUrl.instance = new ApiUrl();
            ApiUrl.isCreating = false;
        }

        return ApiUrl.instance;
    }

    public setToken(tok:string){
        ApiUrl.token = tok;
    }
    public getToken():string{
        return ApiUrl.token;
    }

    public setUrl(url:string){
        this.apiUrl = url;
    }
    public getUrl():string{
        return this.apiUrl;
    }
}