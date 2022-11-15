import { UserService } from './../../../services/user.service';
import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomValidators} from "../../../utils/EqualityValidator";
import { ActivatedRoute } from '@angular/router';
import {StoresService} from "../../../services/stores.service";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {


    form : FormGroup;

  constructor(
    private dialogRef  :MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder,
    private  UserService : UserService,
    private _snackbar : MatSnackBar,
    private storeService : StoresService,
    private route : ActivatedRoute

  ) {
    this.form = formBuilder.group({
      name : new FormControl('', [Validators.required]),
      username : new FormControl('', [Validators.required]),
      apellidouno : new FormControl('', [Validators.required]),
      apellidodos : new FormControl('',),
      password : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required]),
      role : new FormControl('', [Validators.required]),
      permiso : new FormControl('', [Validators.required]),
      sucursal : new FormControl('')

      }, {validator : CustomValidators.MatchValidator('password', 'confirmPassword')})
   }

  ngOnInit(): void {
    if(this.data.action === 'Editar'){
      this.form.patchValue(this.data.data);
    }
  }

  clicksaveuser(){
    if(this.form.valid){
      if(this.data.action === 'Agregar'){
        this.UserService.saveUser(this.form.value).subscribe((resp) => {
          this._snackbar.open('Se ha guardado correctamente el registro', '', {
            duration : 3000,
          });
          this.dialogRef.close({result : true})
        }, ({error}) => {
          this._snackbar.open(error.message, '', {
            duration : 3000,
          })
        })
      }else{
        this.UserService.updateUser(this.data.data.id, this.form.value).subscribe((resp) => {
          this._snackbar.open('Se ha actualizado correctamente el registro', '', {
            duration : 3000,
          });
          this.dialogRef.close({result : true})
        }, ({error}) => {
          this._snackbar.open(error.message, '', {
            duration : 3000,
          })
        })
      }
    }
  }

}
