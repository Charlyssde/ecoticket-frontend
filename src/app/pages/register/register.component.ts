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
import {NgxUiLoaderService} from "ngx-ui-loader";
import {FacturacionService} from "../../services/facturacion.service";
import {FileService} from "../../services/file.service";

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

  pacs : OptionModel[] = []
  showAdditonal : boolean = false;
  showProvider : boolean = false;
  showPassword : boolean = false;

  fileCfdi! : File;
  inputCfdi : string = '';

  constructor(
    private formBuilder : FormBuilder,
    private _snackbar : MatSnackBar,
    public router : Router,
    private dialog: MatDialog,
    private authService : AuthService,
    private loader : NgxUiLoaderService,
    private ecoticketService : FacturacionService,
    private fileService : FileService,
    private mailService : MailService) {
    this.form = formBuilder.group({
      commercialName : new FormControl('', [Validators.required]),
      person : new FormControl(1, [Validators.required]),
      businessName : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required]),
      role : new FormControl('owner'),
      cfdi : new FormControl('', [Validators.required]),
      additionalServices : new FormControl(false),
      provider : new FormControl(false),
      pac : new FormControl(''),
      userPac : new FormControl(''),
      passwordPac : new FormControl('')
    }, {validator : CustomValidators.MatchValidator('password', 'confirmPassword')})
  }

  form : FormGroup;

  ngOnInit(): void {
    this.ecoticketService.getAllPacs().subscribe((data) => {
      this.pacs = data.map((d : any) => {
        return {value : d.key, name : d.display_name}
      })
    }, error => {
      this._snackbar.open('Ocurrió un error al intentar obtener los PACS de facturación. Por favor reintente más tarde', '', {
        duration : 3000
      });
    })
  }

  changeAdditionalServices(event: MatSlideToggleChange) {
    this.showAdditonal = event.checked;
  }

  changeProvider(event : MatSlideToggleChange){
    this.showProvider = event.checked;
  }

  clickRequestPac() {
    this.dialog.open(SolicitudPacComponent, {
      panelClass: 'my-dialog-container',
      width: '800px',
      height: '478px'
    });
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
        this.loader.start();
        this.authService.register(this.form.value).subscribe((resp) => {
          if(resp && resp.message){
            this._snackbar.open(resp.message, '', {
              duration: 3000,
            })
            this.loader.stop();
            return;
          }
            let formData : FormData = new FormData();
            formData.set('file', this.fileCfdi)
            formData.set('collection', 'cfdi')
            formData.set('id', resp.id)
          this.fileService.sendFileUser(formData).subscribe((res) => {
            this.loader.stop();
          }, error => {
            this.loader.stop();
          })
          this.mailService.sendCondiciones({to : this.form.controls['email'].value}).subscribe(resp => {
            this._snackbar.open('Se ha enviado el correo electrónico con éxito', '', {
              duration : 2500,
              verticalPosition : 'top',
              horizontalPosition : 'end'
            })
          });
          setTimeout(() => {
            let username = sessionStorage.getItem('usuario')
            this.loader.stop();
            this._snackbar.open(`Bienvenido ${username}`, '', {
              duration: 3000,
              panelClass: 'green-snackbar'
            })
            this.router.navigate(['/dashboard'])
          }, 1000)
        })
      }
    })
  }

  onCfdiSelected($event: any  ) {
    this.fileCfdi = $event.target.files[0]
    this.inputCfdi = $event.target.files[0].name
  }
}
