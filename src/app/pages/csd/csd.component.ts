import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-csd',
  templateUrl: './csd.component.html',
  styleUrls: ['./csd.component.scss']
})
export class CsdComponent implements OnInit {

  form : FormGroup;
  inputCer : string = '';
  inputKey : string = '';
  fileCer! : File;
  fileKey! : File;

  constructor(private formBuilder : FormBuilder) {
    this.form = formBuilder.group({
      name : new FormControl('', [Validators.required]),
      cer : new FormControl(null, [Validators.required]),
      key : new FormControl(null, [Validators.required]),
      password : new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  onCerSelected($event: any) {
    this.fileCer = $event.target.files[0]
    this.inputCer = $event.target.files[0].name
  }

  onKeySelected($event: any) {
    this.fileKey = $event.target.files[0]
    this.inputKey = $event.target.files[0].name
  }

  clickSaveScd() {

  }
}
