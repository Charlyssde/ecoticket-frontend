import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../utils/EqualityValidator";

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styleUrls: ['./user-save.component.scss']
})
export class UserSaveComponent implements OnInit {

  form : FormGroup;

  constructor(private formBuilder : FormBuilder) {
    this.form = formBuilder.group({
      name : new FormControl('', [Validators.required]),
      username : new FormControl('', [Validators.required]),
      apellidouno : new FormControl('', [Validators.required]),
      apellidodos : new FormControl('',),
      password : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required]),
      rol : new FormControl('', [Validators.required]),
      permiso : new FormControl('', [Validators.required]),

      }, {validator : CustomValidators.MatchValidator('password', 'confirmPassword')})
   }

  ngOnInit(): void {
  }

  clicksaveuser() {

  }
}
