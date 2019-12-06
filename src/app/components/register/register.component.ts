import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cpfCnpjValidator} from '../shared/validators/cpf-cnpj-validator';
import {dateValidator} from '../shared/validators/date-validator';
import {StudentService} from '../shared/services/student.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading: Boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private studentService: StudentService,
        private router: Router,
        private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            document: ['', Validators.required],
            birthdate: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            course: ['', Validators.required]
        });
    }

    onSubmit() {
        console.log(this.registerForm.value);
        this.loading = true;
        this.studentService.register(this.registerForm.value).then(data => {
            this.notificationService.success('Matrícula realizada com sucesso');

            setTimeout(() =>
                {
                    this.loading = false;
                    this.router.navigate(['/']);
                },
                5000);
            //this.router.navigate(['/']);
        }).catch((data) => {
                this.notificationService.error('Erro realizar matrícula');
            }
        );
    }

}
