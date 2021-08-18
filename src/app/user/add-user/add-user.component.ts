import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { RegisterPayload } from 'src/app/services/register-payload';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  submitted = false;
  public userFile :string;
  registerPayload: RegisterPayload;
  public imagePath;
  imgURL: any;
  pwdd :string;
  acceptTerms : string;

  constructor(public crudApi: UserService, public fb: FormBuilder, public toastr: ToastrService,
    
    public userService: UserService,
    
    private router: Router, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddUserComponent>,

  ) {

    
  }
  get f() { return this.crudApi.formData.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
    this.userService.getAll().subscribe(
     // response => { this.CategorieList = response; }
    );
    
 
    
    
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(8),Validators.email]],
      name: ['', [Validators.required, Validators.minLength(5),]],
      roles: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

 

  

  ResetForm() {
    this.crudApi.formData.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }
  
  
  

    addData() {
     
    }
    
    updateData(){
      const formData = new FormData();
        
        //const users = this.crudApi.formData.value;
        formData.append('img', this.userFile);
        formData.append('username',this.crudApi.formData.value.username)
        formData.append('email',this.crudApi.formData.value.email)
        formData.append('name',this.crudApi.formData.value.name)
        formData.append('roles',this.crudApi.formData.value.roles)
    
      this.crudApi.updatedata(this.crudApi.formData.value.id,formData).
      subscribe( data => {
        console.log(data);
        this.toastr.success( 'Modificacion  Exitosa');
        this.dialogRef.close();
        this.getData();
        //window.location.href="/users"
  
        //this.router.navigate(['/users']);
      });
    }
    onSelectFile(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.userFile = file;
        // this.f['profile'].setValue(file);
  
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          this.toastr.success('Only images are supported.');
  
          return;
        }
        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imgURL = reader.result;
        }
      }
    }
}
