import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.scss']
})
export class MyloginComponent implements OnInit {

  credentials={
    username:"",
    password:""
  }

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  log_username:string;
  log_password:string;
  register(){
    

  }
  login(){

  }

  onSubmit(){
    if((this.credentials.username!='' &&this.credentials.password!='')){
      
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          console.log(response.token);
          this.loginService.generateToken(response.token)
          window.location.href="/"
          //success

        },
        error=>{
          //error
          console.log(error)

        }
      )
    }else{
      console.log("field are empty")
    }
    
  }

}
