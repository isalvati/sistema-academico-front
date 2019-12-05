import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

}
