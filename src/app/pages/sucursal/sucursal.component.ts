import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StoreModel} from "../../models/store-model";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {

  data : StoreModel =
    {id : '0', name : 'CCStores sucursal campo de tiro', rfc : '123456789988', generatedTickets : 500, generatedInvoices : 231};

  title : string = '';

  constructor(
    private router : Router
  ) {
    console.log("Router -> ", this.router.routerState.snapshot.root.queryParams);
    this.title = this.data.name;
  }

  ngOnInit(): void {
  }

}
