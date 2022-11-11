import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username : string = '';

  constructor(
    private authService : AuthService
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
}
