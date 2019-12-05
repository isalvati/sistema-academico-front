import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cpfCnpjValidator} from '../shared/validators/cpf-cnpj-validator';
import {dateValidator} from '../shared/validators/date-validator';
import {StudentService} from '../shared/services/student.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    documentMask = '';

    constructor(
        private formBuilder: FormBuilder,
        private studentService: StudentService,
        private router: Router) {
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
        this.studentService.register(this.registerForm.value).then(data => {
            alert(`Matrícula realizada com sucesso \n usuário: ${data.username} senha: ${data.password}`);
            this.router.navigate(['/']);
        });
    }

}
