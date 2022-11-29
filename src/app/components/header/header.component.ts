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
    this.router.navigate(['/profile'], {queryParams : {profile : sessionStorage.getItem('id')}})
  }

  handleLogout() {
    this.authService.logout();
  }

  handlePermissions() : boolean {
    return this.router.url.includes( '?id')
  }

  handleClickUsers() {
    this.router.navigate(['/user'], {queryParamsHandling: "preserve"})
  }

  handleClickLogo() {
    this.router.navigate(['/dashboard'])
  }

  handleClickCsd() {
    this.router.navigate(['/csd'], {queryParamsHandling : "preserve"})
  }

  handleClickRoles() {
    this.router.navigate(['/roles'], {queryParamsHandling : "preserve"})
  }

  showButtons() {
    return !this.router.url.includes('dashboard') && !this.router.url.includes('profile');
  }
}
