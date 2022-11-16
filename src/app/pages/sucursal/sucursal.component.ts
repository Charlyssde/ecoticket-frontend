import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StoreModel} from "../../models/store-model";
import {MatDialog} from "@angular/material/dialog";
import {CsdComponent} from "../csd/csd.component";
import {StoresService} from "../../services/stores.service";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {

  data : StoreModel = {
    cer: "",
    csdPassword: "",
    generatedInvoices: 0,
    generatedTickets: 0,
    id: "",
    toPay : 0,
    key: "",
    name: "",
    nss: "",
    owner: "",
    rfc: ""
  };

  title : string = '';
  id : string = '';

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private dialog : MatDialog,
    private storeService : StoresService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id']
      this.storeService.getStore(this.id).subscribe((data) => {
        this.data = data;
      });
    });

  }

  ngOnInit(): void {
  }
}
