import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

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
        private router: Router) {
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
            console.log(data);
            //alert(`Matrícula realizada com sucesso \n usuário: ${data.username} senha: ${data.password}`);
            //this.router.navigate(['/']);
        });
    }

}
