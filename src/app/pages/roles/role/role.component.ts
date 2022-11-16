import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RolesService} from "../../../services/roles.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  form : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private dialogRef  :MatDialogRef<RoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar : MatSnackBar,
    private rolService : RolesService) {
    this.form = formBuilder.group({
      nombre : new FormControl(''),
      agrega_usuarios: new FormControl(false),
      ve_reportes: new FormControl(false),
      puede_timbrar: new FormControl(false),
      owner : new FormControl('')
    })
   }

  ngOnInit(): void {
    if(this.data.action === 'Editar'){
      this.form.patchValue(this.data.data);
    }
  }

  clickSaveRole() {
    if(this.data.action === 'Agregar'){
      this.form.controls['owner'].setValue(this.data.id);
      this.rolService.saveRole(this.form.value).subscribe((response) => {
        this._snackbar.open('Se ha guardado con éxito el registro', '', {
          duration : 2000
        })
        this.dialogRef.close({result : true})
      }, error => {
        console.log("Error->")
      })
    }else{
      this.rolService.updateRole(this.data.data.id, this.form.value).subscribe((res) => {
        this._snackbar.open('Se ha actualizado con éxito el registro', '', {
          duration : 2000
        })
        this.dialogRef.close({result : true})
      })
    }
  }
}
