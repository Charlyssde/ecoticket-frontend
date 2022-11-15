import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {StoreModel} from "../../models/store-model";
import {StoresService} from "../../services/stores.service";

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
    cert: "",
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

  constructor(
    private formBuilder : FormBuilder,
    private storeService : StoresService,
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
      this.storeService.getStore(params['id']).subscribe((data) => {
        this.data = data;
        this.form.patchValue({
          nss : this.data.nss,
          csdPassword : this.data.csdPassword
        })
        this.inputCer = this.data.cert;
        this.inputKey = this.data.key;
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

  }
}
