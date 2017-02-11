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

    private url:string;

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

        this.http.post(this.url + "/loginOn", body, options)
            .subscribe(data => {
                this.getToken(login,pass);
                // window.location.href = this.apiUrl + "/index.html";
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

    facebookLogIn(){
        $('<form action="/signin/facebook" method="POST"></form>').submit();
    }

    getToken(login:string, pass:string){
        console.log('Works!');
        let body = 'login=' + login + '&password=' + pass;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers});

        this.http.post(this.url + "/get-token", body, options)
            .subscribe(data => {
                console.log(data.text());
                this.setToken(data.text());
                window.location.href = this.url + "/index.html";
            }, error => {});
    }

    private setToken(token:string){
        localStorage.setItem('token',token)
        console.log('Set Token - '+localStorage.getItem('token'));
    }

    constructor(private http:Http) {
        this.wrongCredentials = false;
        this.wrongInput = false;
        this.url = ApiUrl.getInstance().getUrl();
    }
}