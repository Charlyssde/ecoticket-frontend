import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  form : FormGroup;

  constructor(private formBuilder : FormBuilder) {
    this.form = formBuilder.group({
    usuario: false,
    reporte: false,
    csd: false,
    })
   }

  ngOnInit(): void {
  }

  clickGuardarrol() {

  }

}