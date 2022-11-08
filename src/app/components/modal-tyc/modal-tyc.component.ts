import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-modal-tyc',
  templateUrl: './modal-tyc.component.html',
  styleUrls: ['./modal-tyc.component.scss']
})
export class ModalTycComponent implements OnInit {

  checkPolicy : boolean = false;
  checkTyC : boolean = false;
  disabled : boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalTycComponent>
  ) { }

  ngOnInit(): void {
  }

  clickClose() {
    this.dialogRef.close({data : true})
  }

  handleCheck($event : MatCheckboxChange, check : boolean) {
    if(check){
      this.checkTyC = $event.checked
    }else{
      this.checkPolicy = $event.checked
    }

    this.disabled = !(this.checkTyC && this.checkPolicy)
  }
}
