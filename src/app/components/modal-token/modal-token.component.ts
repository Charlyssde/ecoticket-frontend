import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-modal-token',
  templateUrl: './modal-token.component.html',
  styleUrls: ['./modal-token.component.scss']
})
export class ModalTokenComponent implements OnInit {

  value : string = ''

  constructor(
    private _snackbar : MatSnackBar
  ) {
    setTimeout(() => {
      this.value = 'AKSDLJFLA2847XJAHF93YR23RH9R8q'
    }, 1500)
  }

  ngOnInit(): void {
  }

  paste(){
    navigator.clipboard.writeText(this.value).then(() => {
      this._snackbar.open('Se ha copiado el token al portapapeles', '', {
        duration : 3000
      })
    });
  }

}
