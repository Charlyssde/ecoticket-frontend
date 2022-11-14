import { Component, OnInit ,ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import { User } from './../../models/user';
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import { RoleComponent } from 'src/app/components/role/role.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  datasource : MatTableDataSource<User>;
  displayedColumns : string[] = [
    'Nombre','Usuario', 'Fecha', 'Sucursal', 'Asignar Rol','Acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  data : User[] = [
    {name : 'Benito López López', username: 'beno', activo:false, fecha: '11/11/2022', sucursal :'Centro', role:'Administrador'},
    {name : 'Carlos Carrillo San Gabriel', username: 'cc', activo:true, fecha: '08/10/2022', sucursal :'Sayago', role:'Cajero'},
    {name : 'Domingo DE Jesus Carrillo', username: 'djesus', activo:false, fecha: '06/03/2022', sucursal :'Lgos', role:'Cajero'},
    {name : 'Enrique Sanchez Flores', username: 'esanchez', activo:true, fecha: '1/1/2022', sucursal :'Centro', role:'Ayudante'},
  ];

  newuser() {

  }

  constructor(
    private _snackbar : MatSnackBar,
    public router : Router,
    private dialog : MatDialog
  ) {
    this.datasource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
    this.datasource = new MatTableDataSource<User>(this.data);
    this.datasource.paginator = this.paginator;
  }

  useredit(element : User) {

  }

  userdelete(id: string) {

  }

  assigrole(element : User) {
    let dialogRef = this.dialog.open(RoleComponent,{
      width : '500px',
      height : 'auto'
    });
  }

  handleClickView(id : string) {
    this.router.navigate(['/sucursal'], {queryParams : [id] })
  }

}
