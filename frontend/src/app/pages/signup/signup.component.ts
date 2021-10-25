import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchServiceService } from '../../service/fetch-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private fs:FetchServiceService
    ) { 
    this.signupForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  signup(){
    const data = {
        displayName: this.signupForm.get('displayName').value,
        email : this.signupForm.get('email').value,
        password: this.signupForm.get('password').value
    }
    this.fs.signup(data).subscribe( 
      res => {
        if(res.success) {
          this.signupForm.reset();
        }
      },
      err => {
        alert("error is coming")
      }
    )
  }

}
