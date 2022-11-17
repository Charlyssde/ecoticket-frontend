import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MailService} from "../../services/mail.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-solicitud-pac',
  templateUrl: './solicitud-pac.component.html',
  styleUrls: ['./solicitud-pac.component.scss']
})
export class SolicitudPacComponent implements OnInit {

  form : FormGroup;

  constructor(
    private mailService : MailService,
    private _snackbar : MatSnackBar,
    private formBuilder : FormBuilder,
    private loader : NgxUiLoaderService,
    public dialogRef: MatDialogRef<SolicitudPacComponent>) {
    this.form = formBuilder.group({
      name : new FormControl('', [Validators.required]),
      site : new FormControl('', [Validators.required]),
      phone : new FormControl('', [Validators.required]),
      extras : new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  requestPac() {
    if(!this.form.valid){
      this._snackbar.open('Por favor complete todos los campos', '', {
        duration : 2000
      })
      return;
    }
    this.loader.start();
    this.mailService.sendPacRquest(this.form.value).subscribe((resp) => {
      this._snackbar.open('Se ha enviado un correo electrónico con su solicitud', '', {
        duration: 3000,
        panelClass: 'error'
      });
      this.loader.stop();
      this.dialogRef.close();
    }, error => {
      this._snackbar.open('Ha ocurrido un error al enviar el correo electrónico', '', {
        duration: 3000,
        panelClass: 'error'
      })
      this.loader.stop();
      this.dialogRef.close()
    })

  }
}
