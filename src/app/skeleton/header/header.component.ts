import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewChecked {
  

  private subscriptions = new Array<Subscription>();
  isUserLoggedIn: boolean;
  email: string= sessionStorage.getItem("email");

  constructor(private router: Router, private changeDetector: ChangeDetectorRef,
    private localStorageService: LocalStorageService ) { }


  ngOnInit(): void {
    

  }

  ngAfterViewChecked() {
    this.isUserLoggedIn = this.localStorageService.isUserAuthorized();
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  logout() {
    // Perform logout logic, such as clearing user session or tokens

    // Redirect to the login page
    this.localStorageService.removeAuthorization();
    this.router.navigate(['']);
  }
}
