import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../utils/EqualityValidator";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ActivatedRoute} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form : FormGroup;

  showCurrentPassword : boolean = false;
  showNewPassword : boolean = false;

  id : string = '';

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private _snackbar : MatSnackBar,
    private loader : NgxUiLoaderService,
    private route : ActivatedRoute,
    private dialogRef : MatDialogRef<ChangePasswordComponent>
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['profile'];
    })
    this.form = formBuilder.group({
      currentPassword : new FormControl('', [Validators.required]),
      newPassword : new FormControl('', [Validators.minLength(6),Validators.required]),
      confirmNewPassword : new FormControl('', [Validators.required]),
    }, {validator : CustomValidators.MatchValidator('newPassword', 'confirmNewPassword')})
  }

  ngOnInit(): void {
  }

  clickRestorePassword() {
    if(this.form.controls['newPassword'].value.length < 6){
      this._snackbar.open('La contraseña debe tener 6 caracteres como mínimo', '', {
        duration : 3000
      });
      return;
    }
    this.loader.start()
    this.authService.updatePassword(this.id, this.form.value).subscribe((resp) => {
      this.loader.stop()
      this._snackbar.open('Se ha actualizado con éxito la contraseña', '',{
        duration : 2000
      })
      this.dialogRef.close();
    }, error => {
      this.loader.stop()
      this._snackbar.open('Ha ocurrido un error', '', {
        duration : 3000
      })
    });
  }

  togleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  togleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
}
