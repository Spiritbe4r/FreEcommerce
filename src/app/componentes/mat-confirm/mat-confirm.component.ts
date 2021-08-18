import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm',
  templateUrl: './mat-confirm.component.html',
  styleUrls: ['./mat-confirm.component.css']
})
export class MatConfirmComponent implements OnInit {

  title: string;
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data :ConfirmDialogModel,
  public dialogRef:MatDialogRef<MatConfirmComponent>) {
    this.title=data.title;
    this.message=data.message;
   }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

}
export class ConfirmDialogModel {

  constructor(public title: string, public message: string,public confirmText: string,public cancelText: string) {
  }
}