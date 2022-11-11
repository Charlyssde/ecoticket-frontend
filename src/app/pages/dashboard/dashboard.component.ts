import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {StoreModel} from "../../models/store-model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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

  data : StoreModel[] = [
    {id : '0', name : 'CCStores sucursal campo de tiro', rfc : '123456789988', generatedTickets : 500, generatedInvoices : 231},
    {id : '1', name : 'CCStores sucursal centro', rfc : 'ASDHJUFYYY', generatedTickets : 500, generatedInvoices : 231},
    {id : '2', name : 'CCStores sucursal americas', rfc : '1Q2W3E4R5T', generatedTickets : 500, generatedInvoices : 231},
    {id : '3', name : 'CCStores sucursal crystal', rfc : 'QAWS34ER56', generatedTickets : 500, generatedInvoices : 231},
    ]

  constructor(
    private _snackbar : MatSnackBar,
    private router : Router,
  ) {
    this.datasource = new MatTableDataSource<StoreModel>();
  }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<StoreModel>(this.data);
    this.datasource.paginator = this.paginator;
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
