import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MailService} from "../../services/mail.service";

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
    public dialogRef: MatDialogRef<SolicitudPacComponent>) {
    this.form = formBuilder.group({
      name : new FormControl(''),
      site : new FormControl(''),
      phone : new FormControl(''),
      extras : new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  requestPac() {
    this.mailService.sendPacRquest(this.form.value).subscribe((resp) => {
      console.log(resp)
      this._snackbar.open('Se ha enviado un correo electrónico con su solicitud', '', {
        duration: 3000,
        panelClass: 'error'
      });
      this.dialogRef.close();
    }, error => {
      this._snackbar.open('Ha ocurrido un error al enviar el correo electrónico', '', {
        duration: 3000,
        panelClass: 'error'
      })
      this.dialogRef.close()
    })

  }
}
