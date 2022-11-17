import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {StoreModel} from "../../models/store-model";
import {StoresService} from "../../services/stores.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileService} from "../../services/file.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-csd',
  templateUrl: './csd.component.html',
  styleUrls: ['./csd.component.scss']
})
export class CsdComponent implements OnInit {

  form : FormGroup;
  inputCer : string = '';
  inputKey : string = '';
  fileCer! : File;
  fileKey! : File;

  data : StoreModel = {
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
  showPassword: boolean = false;
  id: string = '';

  constructor(
    private formBuilder : FormBuilder,
    private storeService : StoresService,
    private _snackbar : MatSnackBar,
    private fileService : FileService,
    private loader : NgxUiLoaderService,
    private route : ActivatedRoute) {
    this.form = formBuilder.group({
      nss : new FormControl('', [Validators.required]),
      cer : new FormControl(null, [Validators.required]),
      key : new FormControl(null, [Validators.required]),
      csdPassword : new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loader.start();
      this.id = params['id'];
      this.storeService.getStore(params['id']).subscribe((data) => {
        this.data = data;
        this.form.patchValue({
          nss : this.data.nss,
          csdPassword : this.data.csdPassword
        })
        this.inputCer = this.data.cer;
        this.inputKey = this.data.key;
        this.loader.stop();
      }, error => {
        this.loader.stop();
      })
    })
  }

  onCerSelected($event: any) {
    this.fileCer = $event.target.files[0]
    this.inputCer = $event.target.files[0].name
  }

  onKeySelected($event: any) {
    this.fileKey = $event.target.files[0]
    this.inputKey = $event.target.files[0].name
  }

  clickSaveScd() {

    if(this.nothingChanges()){
      this._snackbar.open('No hay cambios que realizar', '',{
        duration : 2000
      })
    }else{
      if(this.inputKey !== this.data.key){
        this.loader.start();
        let formData : FormData = new FormData();
        formData.set('file', this.fileKey)
        formData.set('collection', 'key')
        formData.set('owner', this.id)
        this.fileService.sendFile(formData).subscribe((res) => {
          this._snackbar.open('Se ha guardado con éxito el archivo .key','',{
            duration : 2000
          })
          this.loader.stop();
        }, error => {
          this.loader.stop();
        })
      }
      if(this.inputCer !== this.data.cer){
        this.loader.start();
        let formData : FormData = new FormData();
        formData.set('file', this.fileCer)
        formData.set('collection', 'cer')
        formData.set('owner', this.id)
        this.fileService.sendFile(formData).subscribe((res) => {
          this._snackbar.open('Se ha guardado con éxito el archivo .key','',{
            duration : 2000
          })
          this.loader.stop();
        }, error => {
          this.loader.stop();
        })
      }
      if(this.data.nss !== this.form.controls['nss'].value ||
        this.data.csdPassword !== this.form.controls['csdPassword'].value){
        this.loader.start();
          this.data.nss = this.form.controls['nss'].value;
          this.data.csdPassword = this.form.controls['csdPassword'].value;
          this.storeService.updateStore(this.data.id, this.data).subscribe((res) => {
            this._snackbar.open('Se han actualizado con éxito los valores modificados','',{
              duration : 3000
            })
            this.loader.stop();
          } , error => {
            this.loader.stop();
          })
      }
    }
  }

  nothingChanges() {
    return this.data.cer === this.inputCer && this.data.key === this.inputKey &&
      this.data.nss === this.form.controls['nss'].value &&
      this.data.csdPassword === this.form.controls['csdPassword'].value
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
