import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  baseUrl = "hhtp://localhost:8080"

  constructor(private userService: UserService) { }

  getUser() {
    return this.userService.getUser().subscribe(
      user => {
        console.log(user);


      },
      error => {
        console.log(error);
      }



    )
  }

  ngOnInit(): void {
  }

}
