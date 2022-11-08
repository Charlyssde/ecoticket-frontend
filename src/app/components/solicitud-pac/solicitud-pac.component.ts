import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-solicitud-pac',
  templateUrl: './solicitud-pac.component.html',
  styleUrls: ['./solicitud-pac.component.scss']
})
export class SolicitudPacComponent implements OnInit {

  form : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<SolicitudPacComponent>) {
    this.form = formBuilder.group({
      name : new FormControl(''),
      site : new FormControl(''),
      phone : new FormControl(''),
      extras : new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  requestPac() {
    this.dialogRef.close();
  }
}
