import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RolesModel} from "../../models/roles-model";
import {RolesService} from "../../services/roles.service";
import {StoreModel} from "../../models/store-model";
import {ActivatedRoute} from "@angular/router";
import {StoresService} from "../../services/stores.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {RoleComponent} from "./role/role.component";
import {ConfirmActionComponent} from "../../components/confirm-action/confirm-action.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  data : StoreModel = {
    cer_name: "",
    key_name: "",
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
    private dialog : MatDialog,
    private loader : NgxUiLoaderService,
    private _snackbar : MatSnackBar,
    private route : ActivatedRoute
  ) {
      this.route.queryParams.subscribe((params) => {
        this.id = params['id'];
        this.loader.start();
        this.storeService.getStore(this.id).subscribe((response) => {
          this.data = response;
          this.loader.stop();
        }, error => {
          this.loader.stop();
        })
      })
  }

  ngOnInit(): void {
    this.loadAllRoles()
  }

  loadAllRoles(){
    this.loader.start();
    this.rolesService.getAllRoles(this.id).subscribe((response) => {
      this.datasource = new MatTableDataSource<RolesModel>(response);
      this.datasource.paginator = this.paginator;
      this.loader.stop();
    }, error => this.loader.stop())
  }

  addNewRole() {
    let dialogRef = this.dialog.open(RoleComponent, {
      width : '500px',
      height : '330px',
      panelClass : 'my-dialog-container',
      data : {action : 'Agregar', id : this.id}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result.result){
        this.loadAllRoles()
      }
    })
  }

  handleClickEdit(element : RolesModel) {
    let dialogRef = this.dialog.open(RoleComponent, {
      width : '500px',
      height : '330px',
      panelClass : 'my-dialog-container',
      data : {action : 'Editar', data : element}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result.result){
        this.loadAllRoles()
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
        this.rolesService.deleteRole(id).subscribe((resp) => {
          this.loadAllRoles();
          this._snackbar.open('Se ha eliminado exit??samente el registro', '',{
            duration : 3000,
          });
          this.loader.stop();
        }, ({error}) => {
          this.loader.stop();
          this._snackbar.open(error.message, '', {
            duration: 3000
          })
        })
      }
    })
  }
}
