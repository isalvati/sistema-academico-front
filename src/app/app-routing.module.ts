import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {StudentHomeComponent} from './components/student-home/student-home.component';
import {SecretaryHomeComponent} from './components/secretary-home/secretary-home.component';
import {TeacherHomeComponent} from './components/teacher-home/teacher-home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'student-home', component: StudentHomeComponent},
  {path: 'secretary-home', component: SecretaryHomeComponent},
  {path: 'teacher-home', component: TeacherHomeComponent}
  // {path: 'create-login-password', component: CreateLoginPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
