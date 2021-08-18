import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { LoginPayload } from './LoginPayload';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.scss']
})
export class MyloginComponent implements OnInit {
  msg: string;
  submited:boolean;
  showErrorMessage: boolean;
  credentials = {
    username: "",
    password: ""
  }

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router,private toastr: ToastrService,) {

    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      password: [null,[Validators.required,Validators.minLength(8)]]
    });

    this.loginPayload = {
      username: '',
      password: '',
      role:''
    }
  }

  get f(){
    return this.loginForm.controls
  }

  get username(){
    return this.loginForm.get('username');
  }


  ngOnInit(): void {
  }

  getMessaje(){
    return this.msg="Invalid Credentials Try Again"
  }
  onReset() {

    return this.loginForm.reset()
    
    
  }

  //log_username:string;
  //log_password:string;


  onSubmit() {
    this.submited=true;
    if(this.loginForm.invalid){
      return;
    
      
    }
    

    this.loginPayload.username = this.loginForm.get('username')?.value;
    this.loginPayload.password = this.loginForm.get('password')?.value;
    if ((this.loginPayload.username != '' && this.loginPayload.password != '')) {
      

      this.showErrorMessage = false;
      this.loginService.generateToken(this.loginPayload).subscribe(
        (response: any) => {
          console.log(response.token);
          console.log(this.showErrorMessage)
          //console.log(response.role);
          // console.log(response.token);
          if (this.loginService.generateToken(response.token)) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.router.navigateByUrl('/')
          }
          

          //success

        },
        error => {
          //error
          console.log(error.error)
          if(error){
            this.toastr.warning(' Error Revisa las Credenciales Ingresadas !');
         // this.getMessaje()
          this.onReset()
        }
          


        }
      )
    }
   
    
     else {
  
      console.log("field are empty")
      
    }

  }
  

}


/*
loginUser(LoginPayload:any){
    this.showErrorMessage = false;
    this.loginService.loginUsers(this.loginPayload).subscribe(
      (response:any) => {
  
        console.log("test");
        if (response) {
          console.log(response.token);
          if (response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            if (response.role === 'USER') {
              this.router.navigate(['/admindashboard']);
            } else {
              this.router.navigate(['/userdashboard']);
            }
          } else {
            console.log("No Token");
          }
        }
      },
      (error) => {
        this.showErrorMessage = true;
      }
    )
  } */