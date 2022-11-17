import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {StoreModel} from "../../models/store-model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {StoresService} from "../../services/stores.service";
import {MatDialog} from "@angular/material/dialog";
import {AddStoreComponent} from "./add-store/add-store.component";
import {ConfirmActionComponent} from "../../components/confirm-action/confirm-action.component";
import {NgxUiLoaderService} from "ngx-ui-loader";


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

  constructor(
    private _snackbar : MatSnackBar,
    private router : Router,
    private loader : NgxUiLoaderService,
    private storeService : StoresService,
    private dialog : MatDialog
  ) {
    this.datasource = new MatTableDataSource<StoreModel>();
  }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores() {
    const id = sessionStorage.getItem('id');
    if(id !== null){
      this.loader.start();
      this.storeService.getAllStores(id).subscribe((data) => {
        this.datasource = new MatTableDataSource<StoreModel>(data);
        this.datasource.paginator = this.paginator;
        this.loader.stop();
      })
    }
  }

  addNewStore() {
    let dialogRef = this.dialog.open(AddStoreComponent, {
      panelClass : 'my-dialog-container',
      width : '600px',
      height : '385px',
      data : {action : 'Agregar'}
    })
    dialogRef.afterClosed().subscribe((data) => {
      if(data.result){
        this.loadStores();
      }
    })
  }

  handleClickToken() {
    navigator.clipboard.writeText('some random token has been copied! :)').then(() => {
      this._snackbar.open('Se ha copiado el token al portapapeles', '', {
        duration : 3000
      })
    });
  }

  handleClickEdit(element : StoreModel) {
    let dialogRef = this.dialog.open(AddStoreComponent, {
      panelClass : 'my-dialog-container',
      width : '600px',
      height : '385px',
      data : {action : 'Editar', data : element}
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data.result){
        this.loadStores();
      }
    })
  }

  handleClickDelete(id : string) {
    let dialogRef = this.dialog.open(ConfirmActionComponent, {
      panelClass : 'my-dialog-container',
      width : '500px',
      height : '173px',
      data : {action : 'Eliminar'}
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data.result){
        this.loader.start();
        this.storeService.deleteStore(id).subscribe((resp) => {
          this.loadStores();
          this._snackbar.open('Se ha eliminado exitósamente el registro', '',{
            duration : 3000,
          });
        }, ({error}) => {
          this.loader.stop();
            this._snackbar.open(error.message, '', {
              duration: 3000
            })
        })
      }
    })
  }

  handleClickView(id : string) {
    this.router.navigate(['/sucursal'], { queryParams : {id : id} });
  }
}
