import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogModel, MatConfirmComponent } from '../componentes/mat-confirm/mat-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

constructor(private dialog:MatDialog) { }
    //data:ConfirmDialogModel  iva en msg
  openConfirmDialog(msg) {
    return this.dialog.open(MatConfirmComponent,{
     // data,
      width:'400px',
      panelClass:'confirm-dialog-container',
      disableClose:true,
      position: { top: "80px" },
      data:{
        message:msg

      }
    });
  }

}
