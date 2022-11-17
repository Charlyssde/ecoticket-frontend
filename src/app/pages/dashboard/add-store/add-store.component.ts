import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StoresService} from "../../../services/stores.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  form : FormGroup;

  constructor(
    private dialogRef  :MatDialogRef<AddStoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder,
    private storeService : StoresService,
    private loader : NgxUiLoaderService,
    private _snackbar : MatSnackBar
  ) {
    this.form = formBuilder.group({
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      rfc : new FormControl('', [Validators.required]),
      owner : new FormControl(sessionStorage.getItem('id')),
      toPay : new FormControl(0),
      generatedTickets : new FormControl(0),
      generatedInvoices : new FormControl(0),
      nss : new FormControl(''),
      csdPassword : new FormControl(''),
      cer : new FormControl(''),
      key : new FormControl(''),
    })

  }

  ngOnInit(): void {
    if(this.data.action === 'Editar'){
      this.form.patchValue(this.data.data);
    }
  }

  handleClickSave() {
    if(this.form.valid){
      this.loader.start();
      if(this.data.action === 'Agregar'){
        this.storeService.saveStore(this.form.value).subscribe((resp) => {
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
        this.loader.start();
        this.storeService.updateStore(this.data.data.id, this.form.value).subscribe((resp) => {
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
