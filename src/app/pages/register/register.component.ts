import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OptionModel} from "../../models/option-model";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModalTycComponent} from "../../components/modal-tyc/modal-tyc.component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../utils/EqualityValidator";
import {SolicitudPacComponent} from "../../components/solicitud-pac/solicitud-pac.component";
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  persons : OptionModel[] = [
    {value : 1, name : 'PERSONA FÍSICA'},
    {value : 2, name : 'PERSONA MORAL'}
  ]

  pacs : OptionModel[] = [
    {value : 0, name : 'Pac 1'},
    {value : 1, name : 'Pac 2'},
    {value : 2, name : 'Pac 3'},
    {value : 3, name : 'Pac 4'},
  ]
  showAdditonal : boolean = false;
  showProvider : boolean = false;
  showPassword : boolean = false;

  constructor(
    private formBuilder : FormBuilder,
    private _snackbar : MatSnackBar,
    public router : Router,
    private dialog: MatDialog,
    private authService : AuthService,
    private mailService : MailService) {
    this.form = formBuilder.group({
      commercialName : new FormControl('', [Validators.required]),
      person : new FormControl(1, [Validators.required]),
      businessName : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required]),
      additionalServices : new FormControl(false),
      provider : new FormControl(false),
      pac : new FormControl(0),
      userPac : new FormControl(''),
      passwordPac : new FormControl('')
    }, {validator : CustomValidators.MatchValidator('password', 'confirmPassword')})
  }

  form : FormGroup;

  ngOnInit(): void {}

  changeAdditionalServices(event: MatSlideToggleChange) {
    this.showAdditonal = event.checked;
  }

  changeProvider(event : MatSlideToggleChange){
    this.showProvider = event.checked;
  }

  clickRequestPac() {
    let dialogRef = this.dialog.open(SolicitudPacComponent, {
      panelClass: 'my-dialog-container',
      width: '800px',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if(resp.data){
        this._snackbar.open('Se ha enviado un correo electrónico con su solicitud', '', {
          duration: 3000,
          panelClass: 'error'
        })
      }else{
        this._snackbar.open('Ha ocurrido un error al enviar la solicitud, por favor intente más tarde', '', {
          duration: 3000,
          panelClass: 'error'
        })
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  clickRegister() {
    if(!this.form.valid){
      this._snackbar.open('Por favor complete todos los campos para llevar a cabo su registro', '', {
        duration: 3000,
        panelClass: 'error'
      })
      return;
    }

    let dialogRef = this.dialog.open(ModalTycComponent, {
      panelClass: 'my-dialog-container',
      width: '600px',
      data: {
        title: 'Confirmación'
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data.data){
        console.log("Closed")
        this.authService.register(this.form.value).subscribe((resp) => {
          this.mailService.sendCondiciones(this.form.value).subscribe(resp => {
            this._snackbar.open('Se ha enviado el correo electrónico con éxito', '', {
              duration : 2500,
              verticalPosition : 'top',
              horizontalPosition : 'end'
            })
          });
          console.log("Response -> ", resp)
          let username = sessionStorage.getItem('usuario')
          this.router.navigate(['/dashboard'])
          this._snackbar.open(`Bienvenido ${username}`, '', {
            duration: 3000,
            panelClass: 'green-snackbar'
          })
        })
      }
    })
  }

}
