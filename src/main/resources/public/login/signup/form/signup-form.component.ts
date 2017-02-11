import {Component} from "@angular/core";
import {User} from "../user.model";
import {Http, RequestOptions, Headers} from "@angular/http";
import {ApiUrl} from "../../apiurl.model";
declare var $:any;

@Component({
    selector: 'signup-form',
    templateUrl: './login/signup/form/signup-form.component.html',
    styleUrls: ['./login/signup/form/signup-form.component.css'],
})
export class SignUpFormComponent {
    confPass = 'ng-invalid';
    model = new User(null, null, null, null);
    loginExist:boolean = false;
    passwordTooShort:boolean = false;
    passwordMismatch:boolean = false;
    private apiUrl:string;


    onSubmit() {
        this.loginExist = false;
        this.passwordTooShort = false;
        this.passwordMismatch = false;
        let body = JSON.stringify(this.model);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        this.http.post(this.apiUrl+'/signup', body, options)
            .subscribe(data => {
                this.takeResponse(data.text());
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }

    private takeResponse(data) {
        switch (data) {
            case 'Passwords didn\'t match': {
                this.passwordMismatch = true;
                break;
            }
            case 'Password too short': {
                this.passwordTooShort = true;
                break;
            }
            case 'Login already exist': {
                this.loginExist = true;
                break;
            }
            case 'SUCCESS': {
                this.loggin();
                break;
            }
            // default: {
            //     console.log(data);
            // }
        }
    }

    private loggin() {
        let body = 'username=' + this.model.login + '&password=' + this.model.password;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers});

        this.http.post(this.apiUrl + "/loginOn", body, options)
            .subscribe(data => {
                window.location.href = this.apiUrl + "/index.html";
            }, error => {
                console.log(JSON.stringify(error.json()))
            });
    }

    repPassChanged(pass:string, confPass:string) {
        if (pass == confPass) {
            this.confPass = 'ng-valid';
        } else {
            this.confPass = 'ng-invalid';
        }
    }

    constructor(private http:Http, apiurl:ApiUrl) {
        this.apiUrl = apiurl.apiUrl;
    }
}
