import {Component} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {ApiUrl} from "./apiurl.model";
declare var $: any;

@Component({
    selector: 'login',
    templateUrl: './login/login.component.html',
    styleUrls: ['./login/login.component.css'],
})
export class LoginComponent {
    wrongInput:boolean;
    wrongCredentials:boolean;

    private apiUrl:string;

    public signIn(login:string, pass:string) {
        this.wrongInput = false;
        this.wrongCredentials = false;

        if (login == null || login == "" || pass == null || pass == "") {
            this.wrongInputs();
            return;
        }
        let body = 'username=' + login + '&password=' + pass;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers});

        this.http.post(this.apiUrl + "/loginOn", body, options)
            .subscribe(data => {
                window.location.href = this.apiUrl + "/index.html";
            }, error => {
                if ((JSON.stringify(error.json().status)) == "203") {
                    this.wrongCredent();
                }
            });
    }

    wrongCredent() {
        this.wrongCredentials = true;
        $('.ui.red.message')
            .transition('slide left')
        ;
    }
    wrongInputs() {
        this.wrongInput = true;
        $('.ui.blue.message')
            .transition('slide left')
        ;
    }

    signUp(){
        $('#singUpModal')
                .modal('show')
            ;
    }

    yolo(){
        let body = '';
        let headers = new Headers();
        let options = new RequestOptions({headers});

        this.http.post(this.apiUrl + "/signin/facebook", body, options)
            .subscribe();
    }

    constructor(private http:Http, apiurl:ApiUrl) {
        this.wrongCredentials = false;
        this.wrongInput = false;
        this.apiUrl = apiurl.apiUrl;
    }
}