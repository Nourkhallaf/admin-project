import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewChecked {
  

  private subscriptions = new Array<Subscription>();
  isUserLoggedIn: boolean;

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
}
