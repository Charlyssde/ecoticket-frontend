import { UserService } from './../../../services/user.service';
import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RolesModel} from "../../../models/roles-model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RolesService} from "../../../services/roles.service";
import { ActivatedRoute } from '@angular/router';
import {StoresService} from "../../../services/stores.service";
import {StoreModel} from "../../../models/store-model";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  data1 : StoreModel = {
    cer: "",
    csdPassword: "",
    generatedInvoices: 0,
    generatedTickets: 0,
    id: "",
    key: "",
    name: "",
    nss: "",
    owner: "",
    rfc: "",
    toPay: 0
  };

  roles : any

    id: string = '';
    form : FormGroup;

  constructor(
    private dialogRef  :MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder,
    private  UserService : UserService,
    private _snackbar : MatSnackBar,
    private storeService : StoresService,
    private route : ActivatedRoute,
    private loader : NgxUiLoaderService,
    private rolesService : RolesService,

  ) {
    this.form = formBuilder.group({
      name : new FormControl('', [Validators.required]),
      username : new FormControl('', [Validators.required]),
      apellidouno : new FormControl('', [Validators.required]),
      apellidodos : new FormControl('',),
      role : new FormControl('',),
      correo : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      sucursal : new FormControl('',)

      })
   }

  ngOnInit(): void {
    this.cargarrole();

    if(this.data.action === 'Editar'){
      this.form.patchValue(this.data.data);
      this.form.controls['username'].disable();
      this.form.controls['correo'].disable();
    }else{
      this.cargarstores();
    }
  }

  cargarstores(){
    this.route.queryParams.subscribe((params) => {
      this.loader.start();
      this.id = params['id'];
      this.storeService.getStore(this.id).subscribe((response) => {
        this.data1 = response;
        this.loader.stop();
      }, error => this.loader.stop())
    })
  }

  cargarrole(){
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.rolesService.getAllRoles(this.id).subscribe((response) => {
        this.roles = response;
      })
    })
  }


  clicksaveuser(){
    if(this.form.valid){
      this.loader.start();
      if(this.data.action === 'Agregar'){
        this.form.controls['sucursal'].setValue(this.data1.id);
        this.UserService.saveUser(this.form.value).subscribe((resp) => {
          this._snackbar.open('Se ha guardado correctamente el registro', '', {
            duration : 3000,
          });
          this.loader.stop();
          this.dialogRef.close({result : true})
        }, ({error}) => {
          this.loader.stop();
          this._snackbar.open(error.message, '', {
            duration : 3000,
          })
        })
      }else{
        this.UserService.updateUser(this.data.data.id, this.form.value).subscribe((resp) => {
          this._snackbar.open('Se ha actualizado correctamente el registro', '', {
            duration : 3000,
          });
          this.loader.stop();
          this.dialogRef.close({result : true})
        }, ({error}) => {
          this.loader.stop();
          this._snackbar.open(error.message, '', {
            duration : 3000,
          })
        })
      }
    }
  }

}
