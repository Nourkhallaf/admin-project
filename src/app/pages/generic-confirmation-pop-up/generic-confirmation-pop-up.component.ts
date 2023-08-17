import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface IConfirmationData {
  description: string;
  title: string;
  action: () => {};
}
@Component({
  selector: 'app-generic-confirmation-pop-up',
  templateUrl: './generic-confirmation-pop-up.component.html',
  styleUrls: ['./generic-confirmation-pop-up.component.scss']
})
export class GenericConfirmationPopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmationData) {

    console.log
  }
  ngOnInit() {
  }



}
