import { OnInit, Component, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { environment } from '../../environments/environment';
// import Debug from 'debug';
// const debug = Debug('dgoods:admin:BasePageComponent');

@Component({
  selector: 'base-add',
  template: `<ng-content></ng-content>`
})
export class BasePageComponent implements OnInit, OnDestroy {

  public activatedRoute: ActivatedRoute;
  protected subscriptions = [];


  constructor(injector: Injector) {
    this.activatedRoute = injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
   // this.setDebuggingMode();
  }

//   setDebuggingMode() {
//     localStorage.debug = environment.enableDebugging;
//   }



  ngOnDestroy(): void {
    this.subscriptions.forEach(subscribe => {
      subscribe.unsubscribe();
    });
  }
}
