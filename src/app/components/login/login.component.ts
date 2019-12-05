import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        let username = this.loginForm.value.username;
        let password = this.loginForm.value.password;
        this.authService.login(username, password).then(data => {
            if(!data.success){
                this.notificationService.error(data.errorMessage);
            } else {
                this.router.navigate([`/${this.authService.getProfile().toLocaleLowerCase()}-home`]);
            }
        });
    }

}
