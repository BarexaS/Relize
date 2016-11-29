import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoginComponent} from "./login.component";
import {SignUpFormComponent} from "./signup/form/signup-form.component";
import {ApiUrl} from "./apiurl.model";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        LoginComponent,
        SignUpFormComponent
    ],
    providers: [
        ApiUrl,
    ],
    bootstrap: [LoginComponent]
})
export class LoginModule {
}