import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StoreModel} from "../../models/store-model";
import {MatDialog} from "@angular/material/dialog";
import {CsdComponent} from "../../components/csd/csd.component";
import {StoresService} from "../../services/stores.service";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {

  data : StoreModel = {
    cert: "",
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

  constructor(
    private route : ActivatedRoute,
    private dialog : MatDialog,
    private storeService : StoresService
  ) {
    this.route.queryParams.subscribe((params) => {
      const id = params[0]
      this.storeService.getStore(id).subscribe((data) => {
        this.data = data;
        this.title = this.data.name;
      });
    });

  }

  ngOnInit(): void {
  }

  handleAddCsd() {
    this.dialog.open(CsdComponent,{
      panelClass: 'my-dialog-container',
      width : '800px',
      height : '355px'
    });
  }
}
