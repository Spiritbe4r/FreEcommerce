import { Component, OnInit } from '@angular/core';
import { UserService} from '../service/user.service';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ArticleService} from '../service/article.service';
import { LoginService } from '../services/login.service';
import {LocalStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  
  styleUrls: ['./template.component.css'
  ]
})
export class TemplateComponent implements OnInit {
name : string;
img:string;
  constructor(private userService : UserService,private router : Router,private loginService:LoginService,
    public artService: ArticleService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
   this.name =  this.localStorageService.retrieve('username');
   this.img =  this.localStorageService.retrieve('img');
    this.artService.getAll().subscribe(
      response =>{this.artService.list = response;}
     );
  }
  
logout()
{
  this.userService.islogin = false;
    this.userService.admin = false;
    this.userService.suser = false;
  this.router.navigate(['/login']);

}
addArticle()
{
  
  this.router.navigate(['/articles']);
}
generatePdf()
{
  
 const document = this.artService.getDocument();
 alert("Imprimiendo");
 pdfMake.createPdf(document).open(); 

}

logoutUser(){
  this.loginService.logout()
  location.reload()
}

}
