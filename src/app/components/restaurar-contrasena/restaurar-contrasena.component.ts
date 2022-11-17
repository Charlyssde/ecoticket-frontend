import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {MailService} from "../../services/mail.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-restaurar-contrasena',
  templateUrl: './restaurar-contrasena.component.html',
  styleUrls: ['./restaurar-contrasena.component.scss']
})
export class RestaurarContrasenaComponent implements OnInit {

  form : FormGroup;

  constructor(
    private formBuild : FormBuilder,
    private loader : NgxUiLoaderService,
    private mailService : MailService,
    private _snackbar : MatSnackBar,
    private dialogRef : MatDialogRef<RestaurarContrasenaComponent>
  ) {
    this.form = formBuild.group({
      email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
    });
  }

  ngOnInit(): void {
  }

  clickRestorePassword() {
    if(this.form.valid){
      this.loader.start();
      this.mailService.sendRestorePassword(this.form.value).subscribe(() => {
        this._snackbar.open('Se ha enviado un mensaje al correo electrónico ingresado', '',{
          duration : 3000,
        });
        this.dialogRef.close()
        this.loader.stop();
      }, ({error}) => {
        console.log("Error->", error)
        this._snackbar.open(error.message, '',{
          duration : 3000,
        });
        this.loader.stop();
        this.dialogRef.close()
      })
    }else{
      this._snackbar.open('El correo electrónico ingresado no es válido', '',{
        duration : 3000,
      });
    }
  }
}
