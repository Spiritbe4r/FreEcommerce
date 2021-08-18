import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { RegisterPayload } from 'src/app/services/register-payload';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
    submitted = false;
    userFile;
    registerPayload: RegisterPayload;
    public imagePath;
    imgURL: any;
    pwdd :string;
    acceptTerms : string;
    constructor(public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
      private router : Router) {
        this.registerPayload={
          username:'',
          email:'',
          name:'',
          roles:'',
          password:'',
        }
       }
      
    ngOnInit() {
    
     
      this.infoForm();
     }
  
     get f() { return this.crudApi.formData.controls; }
  
    
    infoForm() {
      this.crudApi.formData = this.fb.group({
         // id: null,
          username: ['', [Validators.required, Validators.minLength(5)]],
          email: ['', [Validators.required, Validators.minLength(8),Validators.email]],
          name: ['', [Validators.required, Validators.minLength(5),]],
          roles: ['', [Validators.required, Validators.minLength(8)]],
          
          password: ['', [Validators.required, Validators.minLength(8)]],
          });
      }
  
    
     
    
  
    onReset() {
      this.submitted = false;
        this.crudApi.formData.reset();
    }
    onSubmit() {
      
      this.submitted = true;
      const val = this.crudApi.formData.value;
    //  if (val.password == val.pwdd)
   //   {
        if (this.crudApi.choixmenu == "A")
        {
          this.addData();
        }
        
    /*  }
      else
      {
        this.toastr.warning( 'Vérifiet votre de passe ...');  
      }*/
  }
  
  
  addData() {
    const formData = new FormData();
      
      //const users = this.crudApi.formData.value;
      formData.append('img', this.userFile);
      formData.append('username',this.crudApi.formData.value.username)
      formData.append('email',this.crudApi.formData.value.email)
      formData.append('name',this.crudApi.formData.value.name)
      formData.append('roles',this.crudApi.formData.value.roles)
      formData.append('password',this.crudApi.formData.get('password')?.value)
     // formData.append('user', JSON.stringify(users));
      
      this.crudApi.createData(formData).subscribe( data => {
      window.location.href="/users"
      this.toastr.success( 'Validation  Success'); 
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