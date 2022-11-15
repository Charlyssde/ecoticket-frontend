import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username : string = '';

  constructor(
    private authService : AuthService,
    private router : Router,
    private route : ActivatedRoute,
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
    return this.router.url.includes( '/sucursal?')
  }

  handleClickUsers() {
    this.route.queryParams.subscribe((params) => {
      console.log(params)
      this.router.navigate(['/user'], {queryParams : params})
    });

  }

  handleClickLogo() {
    this.router.navigate(['/dashboard'])
  }

  handleClickCsd() {
    this.route.queryParams.subscribe((params) => {
      console.log(params)
      this.router.navigate(['/csd'], {queryParams : params})
    });
  }
}
