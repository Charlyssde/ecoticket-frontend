import { Component, OnInit } from '@angular/core';
import {FacturacionService} from "../../services/facturacion.service";

@Component({
  selector: 'app-facturador',
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.scss']
})
export class FacturadorComponent implements OnInit {

  isData : boolean = true;
  ticketNumber : string = '';
  constructor(
    private facturacionService : FacturacionService
  ) { }

  ngOnInit(): void {
  }

  handleClickFacturar() {
    this.facturacionService.sendTicket(this.ticketNumber).subscribe((data) => {
      this.isData = true;
    }, error => {});
  }
}
