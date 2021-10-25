import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchServiceService } from 'src/app/service/fetch-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  message:string;
  className:string = "d-none";
  constructor(
    private fb:FormBuilder,
    private fs:FetchServiceService,
    private router: Router
    ) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    const data = {
      email : this.loginForm.get('email').value,
      password : this.loginForm.get('password').value
    }
   this.fs.login(data)
       .subscribe(
         res => {
          if(res.success) {
            localStorage.setItem('token', res.token);
            window.location.replace("/");
          }else {
            this.message = res.message;
            this.className =  'alert alert-danger';
          }
         },
         err => {
           alert("login error");
         }
       )
  }

  
}
