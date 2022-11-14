import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {StoreModel} from "../../models/store-model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {StoresService} from "../../services/stores.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  datasource : MatTableDataSource<StoreModel>;
  displayedColumns : string[] = [
    'SUCURSAL','RFC', 'TICKETS GENERADOS', 'FACTURAS GENERADAS', 'OBTENER TOKEN', 'VER SUCURSAL', 'ACCIONES'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  constructor(
    private _snackbar : MatSnackBar,
    private router : Router,
    private storeService : StoresService,
  ) {
    this.datasource = new MatTableDataSource<StoreModel>();
  }

  ngOnInit(): void {
    const id = sessionStorage.getItem('id');
    if(id !== null){
      this.storeService.getAllStores(id).subscribe((data) => {
        this.data = data[0];
        this.datasource = new MatTableDataSource<StoreModel>(data);
        this.datasource.paginator = this.paginator;
      })
    }
  }

  addNewStore() {

  }

  handleClickToken() {
    navigator.clipboard.writeText('some random token has been copied! :)').then(() => {
      this._snackbar.open('Se ha copiado el token al portapapeles', '', {
        duration : 3000
      })
    });
  }

  handleClickEdit(element : StoreModel) {

  }

  handleClickDelete(id : string) {

  }

  handleClickView(id : string) {
    this.router.navigate(['/sucursal'], {queryParams : [id] })
  }
}
