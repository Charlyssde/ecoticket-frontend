import { UserService } from './../../services/user.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import { User } from './../../models/user';
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import { RoleComponent } from 'src/app/components/role/role.component';
import { AdduserComponent } from './adduser/adduser.component';
import {ConfirmActionComponent} from "../../components/confirm-action/confirm-action.component";
import {StoresService} from "../../services/stores.service";
import {StoreModel} from "../../models/store-model";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  datasource : MatTableDataSource<User>;
  displayedColumns : string[] = [
    'Nombre','Usuario', 'Correo','Acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data : User[] = [
  //   {name : 'Benito López López', username: 'beno', activo:false, fecha: '11/11/2022', sucursal :'Centro', role:'Administrador'},
  //   {name : 'Carlos Carrillo San Gabriel', username: 'cc', activo:true, fecha: '08/10/2022', sucursal :'Sayago', role:'Cajero'},
  //   {name : 'Domingo DE Jesus Carrillo', username: 'djesus', activo:false, fecha: '06/03/2022', sucursal :'Lgos', role:'Cajero'},
  //   {name : 'Enrique Sanchez Flores', username: 'esanchez', activo:true, fecha: '1/1/2022', sucursal :'Centro', role:'Ayudante'},
  // ];

  data : User = {
    id: "",
    username:"",
    name:"",
    password:"",
    apellidouno:"",
    apellidodos:"",
    correo:"",
    role:"",
    permiso:""
  };

  data1 : StoreModel = {
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

  id: string = '';
  newuser() {
    let dialogRef = this.dialog.open(AdduserComponent,{
      panelClass: 'my-dialog-container',
      width : '700px',
      height : 'auto',
      data : {action : 'Agregar'}
    })
    dialogRef.afterClosed().subscribe((data) => {
      if(data.result){
        this.userall();
      }
    })
  }

  constructor(
    private _snackbar : MatSnackBar,
    public router : Router,
    private dialog : MatDialog,
    private UserService : UserService,
    private route : ActivatedRoute,
    private storeService : StoresService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.storeService.getStore(this.id).subscribe((response) => {
        this.data1 = response;
      })
    })
    this.datasource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
  this.userall();
  }

  userall(){
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.UserService.getuserbyid(this.id).subscribe((data) => {
        this.data = data[0];
        this.datasource = new MatTableDataSource<User>(data);
        this.datasource.paginator = this.paginator;
      })
    })

  }

  useredit(element : User) {
    let dialogRef = this.dialog.open(AdduserComponent,{
      panelClass: 'my-dialog-container',
      width : '700px',
      height : 'auto',
      data : {action : 'Editar', data : element}
    })
    dialogRef.afterClosed().subscribe((data) => {
      if(data.result){
        this.userall();
      }
    })
  }

  userdelete(id: string) {
    let dialogRef = this.dialog.open(ConfirmActionComponent, {
      panelClass : 'my-dialog-container',
      width : '500px',
      height : '173px',
      data : {action : 'Eliminar'}
    });
    dialogRef.afterClosed().subscribe((data) => {
      if(data.result){
        this.UserService.deleteUser(id).subscribe((resp) => {
          this.userall();
          this._snackbar.open('Se ha eliminado exitósamente el registro', '',{
            duration : 3000,
          });
        }, ({error}) => {
            this._snackbar.open(error.message, '', {
              duration: 3000
            })
        })
      }
    })
  }

  assigrole(element : User) {
    let dialogRef = this.dialog.open(RoleComponent,{
      panelClass: 'my-dialog-container',
      width : '500px',
      height : 'auto'
    });
  }

}
