import { Component, OnInit } from '@angular/core';
import { FetchServiceService } from 'src/app/service/fetch-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  constructor(
    private fs: FetchServiceService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.fs.getProfile()
           .subscribe(res => {
             if(res.succes) {
               this.user =  res.data;
             }
           })
  }

  logout() {
    localStorage.clear();
    this.user  = null;
 }

}
