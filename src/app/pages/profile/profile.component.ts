import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OptionModel} from "../../models/option-model";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RolesModel} from "../../models/roles-model";
import {RolesService} from "../../services/roles.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../../components/change-password/change-password.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

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

  roles : RolesModel[] = [];

  data : any;

  constructor(
    private route : ActivatedRoute,
    private userService : UserService,
    private formBuilder : FormBuilder,
    private loader : NgxUiLoaderService,
    private rolesService : RolesService,
    private _snackbar : MatSnackBar,
    private dialog : MatDialog
  ) {
    this.form = formBuilder.group({
      role : ''
    })
    this.route.queryParams.subscribe((params) => {
      this.loadProfile(params['profile']);
    })
  }

  ngOnInit(): void {
  }

  changeAdditionalServices(event: MatSlideToggleChange) {
    this.showAdditonal = event.checked;
  }

  changeProvider(event : MatSlideToggleChange){
    this.showProvider = event.checked;
  }

  clickSave() {
    if(this.anythingChanges()){
      this._snackbar.open('No hay cambios que ejectura', '', {
        duration : 2000
      })
      return
    }
    this.loader.start()
    this.userService.updateUser(this.data.id, this.form.value).subscribe((resp) => {
      this.loadProfile(this.data.id)
      this._snackbar.open('Perfil actualizado con éxito', '', {
        duration: 3000,
        panelClass: 'green-snackbar'
      })
    })

  }

  anythingChanges() {
    return this.data.commercialName === this.form.controls['commercialName'].value &&
      this.data.person === this.form.controls['person'].value &&
      this.data.businessName === this.form.controls['businessName'].value &&
      this.data.email === this.form.controls['email'].value &&
      this.data.additionalServices === this.form.controls['additionalServices'].value &&
      this.data.provider === this.form.controls['provider'].value &&
      this.data.pac === this.form.controls['pac'].value &&
      this.data.userPac === this.form.controls['userPac'].value &&
      this.data.passwordPac === this.form.controls['passwordPac'].value;

  }

  private createForm(res : any) {
    if(res.role === 'owner'){
      this.form = this.formBuilder.group({
        commercialName : new FormControl('', [Validators.required]),
        person : new FormControl(1, [Validators.required]),
        businessName : new FormControl('', [Validators.required]),
        email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
        username : new FormControl('', [Validators.required]),
        password : new FormControl('', [Validators.required]),
        confirmPassword : new FormControl('', [Validators.required]),
        role : new FormControl('owner'),
        additionalServices : new FormControl(false),
        provider : new FormControl(false),
        pac : new FormControl(0),
        userPac : new FormControl(''),
        passwordPac : new FormControl('')
      });
      this.showAdditonal = res.additionalServices;
      this.showProvider = res.provider;
    }else{
      this.form = this.formBuilder.group({
        name : new FormControl('', [Validators.required]),
        username : new FormControl('', [Validators.required]),
        apellidouno : new FormControl('', [Validators.required]),
        apellidodos : new FormControl('',),
        correo : new FormControl('',),
        password : new FormControl('', [Validators.required]),
        confirmPassword : new FormControl('',),
        role : new FormControl('', [Validators.required]),
        permiso : new FormControl('', [Validators.required]),
        sucursal : new FormControl('')
      })
      this.rolesService.getAllRoles(res.sucursal).subscribe((response) => {
        this.roles = response;
      })
    }
    this.data = res;
    this.form.patchValue(res)
    this.loader.stop();
  }

  private loadProfile(value : string) {
    this.loader.start();
    this.userService.getProfile(value).subscribe((res) => {
      this.createForm(res);
    })
  }

  restorePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width : '600px',
      height : '385px',
      panelClass : 'my-dialog-container'
    })
  }
}
