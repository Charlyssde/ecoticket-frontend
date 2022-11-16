import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RolesModel} from "../../models/roles-model";
import {RolesService} from "../../services/roles.service";
import {StoreModel} from "../../models/store-model";
import {ActivatedRoute} from "@angular/router";
import {StoresService} from "../../services/stores.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

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
  id : string = '';

  displayedColumns : string[] = ['nombre', 'agregar_usuario', 'ver_reportes', 'timbrar', 'acciones']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource : MatTableDataSource<RolesModel> =  new MatTableDataSource<RolesModel>();

  constructor(
    private rolesService : RolesService,
    private storeService : StoresService,
    private route : ActivatedRoute
  ) {
      this.route.queryParams.subscribe((params) => {
        this.id = params['id'];
        this.storeService.getStore(this.id).subscribe((response) => {
          this.data = response;
        })
      })
  }

  ngOnInit(): void {
    this.rolesService.getAllRoles(this.id).subscribe((response) => {
      console.log(response)
      this.datasource = new MatTableDataSource<RolesModel>(response);
      this.datasource.paginator = this.paginator;
    })
  }

  addNewRole() {

  }

  handleClickEdit(element : RolesModel) {

  }

  handleClickDelete(id : string) {

  }
}
