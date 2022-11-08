import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OptionModel} from "../../models/option-model";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModalTycComponent} from "../../components/modal-tyc/modal-tyc.component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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
    private authService : AuthService) {
    this.form = formBuilder.group({
      commercialName : new FormControl('', [Validators.required]),
      person : new FormControl(1, [Validators.required]),
      businessName : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      passwordVerify : new FormControl('', [Validators.required]),
      additionalServices : new FormControl(false),
      provider : new FormControl(false),
      pac : new FormControl(0),
      userPac : new FormControl(''),
      passwordPac : new FormControl('')
    })
  }

  form : FormGroup;

  ngOnInit(): void {

  }

  changeAdditionalServices(event: MatSlideToggleChange) {
    this.showAdditonal = event.checked;
  }

  changeProvider(event : MatSlideToggleChange){
    this.showProvider = event.checked;
  }

  clickRequestPac() {

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
        title: 'Confirmación',
        message: 'Cancelar la firma es una acción que no se puede deshacer, y cancelará la firma del documento acutal, pero permitirá ' +
          'seguir visualizando el documento firmado. ¿Está seguro de cancelar la firma?',
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data.data){
        console.log("Closed")
        this.authService.register(this.form.value).subscribe((resp) => {
          console.log("Response -> ", resp)
        })
        /*
        * TODO: Continue to the register
        * */
      }
    })
  }
}
