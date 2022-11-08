import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-tyc',
  templateUrl: './modal-tyc.component.html',
  styleUrls: ['./modal-tyc.component.scss']
})
export class ModalTycComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalTycComponent>
  ) { }

  ngOnInit(): void {
  }

  clickClose() {
    this.dialogRef.close({data : true})
  }
}
