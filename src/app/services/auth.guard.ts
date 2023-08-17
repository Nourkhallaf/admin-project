import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private localStorageService: LocalStorageService, private router: Router) { }
    canActivate(): boolean {
        if (this.localStorageService.isUserAuthorized()) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }
}
