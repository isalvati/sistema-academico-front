import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {StudentService} from '../shared/services/student.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-student-home',
    templateUrl: './student-home.component.html',
    styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

    username: string;
    profile: string;
    student: any;
    studentForm: FormGroup;
    loaded: Boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationsService,
        private studentService: StudentService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        } else if ('STUDENT' !== this.authService.getProfile()) {
            this.notificationService.error('Você não ter permissão para acessar essa tela');
            this.router.navigate([`/${this.authService.getProfile().toLocaleLowerCase()}-home`]);
        } else {
            this.username = this.authService.getUsername();
            this.profile = this.authService.getProfile();
            this.loadStudentInfo();
        }
    }

    loadStudentInfo() {
        console.log('loadStudent');
        this.loaded = false;
        this.studentService.getStudentByUser(this.authService.getUserId()).then(data => {
            this.student = data;
            this.studentForm = this.formBuilder.group({
                name: [{value: this.student.name , disabled: true}, Validators.required],
                document: [{value: this.student.document, disabled: true}, Validators.required],
                birthdate: [{value: this.student.birthdate, disabled: true}, Validators.required],
                email: [{value: this.student.email, disabled: true}, Validators.required],
                phone: [this.student.phone, Validators.required],
                address: [this.student.address, Validators.required],
                course: [{value: this.student.course, disabled: true}, Validators.required]
            });
            this.loaded = true;
        });
    }

    lockRegister() {
        console.log(this.student);
        this.studentService.lockRegister(this.student.id).then(data => {
            this.notificationService.success('Matrícula trancada com sucesso');
        }).catch(data => {
            console.log(data);
            this.notificationService.error('Erro ao trancar matrícula');
        });
    }

    renewRegister() {
        console.log(this.student);
        this.studentService.renewRegister(this.student.id).then(data => {
            this.notificationService.success('Matrícula renovada com sucesso');
        }).catch(data => {
            console.log(data);
            this.notificationService.error('Erro ao renovar matrícula');
        });
    }

    onSubmit() {
        let request = {
            address: this.studentForm.value.address,
            phone: this.studentForm.value.phone
        }
        this.studentService.update(this.student.id, request).then(data => {
            this.notificationService.success('Dados atualizados com sucesso');
            this.loadStudentInfo();
        }).catch((data) => {
            this.notificationService.error('Erro ao atualizar dados');
        });
    }

}
