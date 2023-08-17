import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  hide: boolean = true;
  email: string = "";
  password: string= "";
  loginAttempted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
    ){
  }


  ngOnInit() {
    this.localStorageService.removeAuthorization();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      
      // Perform admin credentials validation
      if (email === 'admin@yahoo.com' && password === 'password123') {
        // Successful login
        this.localStorageService.setAuthorization();
        sessionStorage.setItem("email", email);


        console.log('Login successful');
        this.router.navigate(['/books']);

        // Redirect to the books list page or perform any other necessary action
      } else {
        // Invalid credentials
        console.log('Invalid credentials');
        // Show an error message or perform any other necessary action
      }
    }
  }

  public showPassword(){
      this.hide = !this.hide;
  }

}