import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    public static UserRoleObserver$ = new EventEmitter();

    private readonly authorized = 'authorized';
    private readonly userRole = 'userrole';

    public isUserAuthorized() {
        return localStorage.getItem(this.authorized) === 'true' ? true : false;
    }
    public getUserRole() {
        return JSON.parse(localStorage.getItem(this.userRole));
    }

    public setAuthorization() {
        localStorage.setItem(this.authorized, 'true');
    }

    public removeAuthorization() {
        localStorage.removeItem(this.authorized);
    }

    public setUserRole(role: string[]) {
        localStorage.setItem(this.userRole, JSON.stringify(role));
        LocalStorageService.UserRoleObserver$.emit(role);
    }

    public removeUserRole() {
        localStorage.removeItem(this.userRole);
    }

    public clear() {
        localStorage.clear();
    }
}
