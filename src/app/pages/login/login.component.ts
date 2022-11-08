import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginModel} from "../../models/login-model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup;

  showPassword: boolean = false;

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private _snackbar: MatSnackBar,) {
    this.form = formBuilder.group({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  clickForgotMyPassword() {

  }

  clickLogin() {
    if(!this.form.valid){
      this._snackbar.open('Por favor complete los campos para poder ingresar', '', {
        duration: 3000,
        panelClass: 'error'
      })
      return
    }
    let user = new LoginModel();
    user.username = this.form.controls['username'].value;
    user.password = this.form.controls['password'].value;
    this.authService.login(user).subscribe((resp) => {
      if(resp && resp.error){
        const error = resp.error;
        this._snackbar.open(error, '', {
          duration: 3000,
          panelClass: 'error'
        })
        return;
      }
      let username = sessionStorage.getItem('usuario')
      this.router.navigate(['/dashboard'])
      this._snackbar.open(`Bienvenido ${username}`, '', {
        duration: 3000,
        panelClass: 'green-snackbar'
      })
    }, error => {

    })
  }

  clickRegister() {
    this.router.navigate(['/register'])
  }
}
