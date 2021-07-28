import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn =false;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLogged()
  }

  logoutUser(){
    this.loginService.logout()
    location.reload()
  }

}
