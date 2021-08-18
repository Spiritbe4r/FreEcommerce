import { Component, OnInit,Inject } from '@angular/core';
import { CategorieService } from '../../service/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from '../../model/Categorie';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddCategorieComponent } from '../../categorie/add-categorie/add-categorie.component';
import { DialogService } from 'src/app/service/dialog.service';
@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styles: [
  ]
})
export class ListCategorieComponent implements OnInit {
  categorie: Categorie;
  constructor(public crudApi: CategorieService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private mymatdialog:DialogService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddCategorieComponent>,) { }

  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.list = response; 
    }
    );
  }

  removeData(code: string) {
    
    
    this.mymatdialog.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteData(code).subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.getData();
          },
          error => console.log(error));
    
      }
    });
  }
  
  selectData(item : Categorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddCategorieComponent, dialogConfig);
  }
  addCategorie()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddCategorieComponent, dialogConfig);
    }

  
}

/*
if (window.confirm('¿ Estas seguro de Eliminar Esta Categoria ?')) {
  this.crudApi.deleteData(code)
    .subscribe(
      data => {
        console.log(data);
        this.toastr.warning(' data successfully deleted!');
        this.getData();
      },
      error => console.log(error));
}*/