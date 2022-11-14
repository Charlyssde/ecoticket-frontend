import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username : string = '';

  constructor(
    private authService : AuthService,
    private router : Router
  ) {
    // @ts-ignore
    this.username = sessionStorage.getItem('name')
  }

  ngOnInit(): void {
  }

  handleProfile() {

  }

  handleLogout() {
    this.authService.logout();
  }

  handlePermissions() : boolean {
    return this.router.url.includes( '/sucursal')
  }

  handleClickUsers() {
    this.router.navigate(['/user'])
  }
}
