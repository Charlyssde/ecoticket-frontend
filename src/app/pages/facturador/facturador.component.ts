import { Component, OnInit } from '@angular/core';
import {FacturacionService} from "../../services/facturacion.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomValidators} from "../../utils/EqualityValidator";


@Component({
  selector: 'app-facturador',
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.scss']
})
export class FacturadorComponent implements OnInit {

  data = {
    "datos_tienda": {
      "razon_social": "ESCUELA KEMPER URGATE",
      "calle": "Calle conocida",
      "numero": "523",
      "numero_interior": "string",
      "codigo_postal": "26015",
      "telefono": "string",
      "rfc": "EKU9003173C9",
      "regimen_fiscal": "624",
      "correo": "string",
      "facturera": "conectia"
    },
    "info_operacion": {
      "fecha_operacion": "2022-09-19T01:44:30",
      "serie": "ABC",
      "folio": "00001",
      "numero_caja": "0",
      "nombre_cajero": "string",
      "tipo_cliente": "string",
      "exportacion": "01"
    },
    "lista_compras": [
      {
        "nombre_articulo": "Accesorios, equipo y tratamientos para los animales domesticos",
        "cantidad": "1",
        "importe": 100,
        "clave_prod_serv": "10111301",
        "unidad": "Pieza",
        "clave_unidad": "H87",
        "valor_unitario": 100,
        "objeto_impuesto": "02",
        "traslados": [
          {
            "base": 100,
            "importe": 16,
            "impuesto": "002",
            "tasa_o_cuota": 0.16,
            "tipo_factor": "Tasa"
          }
        ]

      }
    ],
    "datos_pago": {
      "subtotal": 100,
      "total": 116,
      "forma_pago": "99",
      "total_impuestos_trasladados": 16,
      "traslados": [
        {
          "base": 100,
          "importe": 16,
          "impuesto": "002",
          "tasa_o_cuota": 0.16,
          "tipo_factor": "Tasa"
        }
      ],
      "efectivo": "string",
      "cheque": "string",
      "vales": "string",
      "transferencia": "string",
      "tarjeta": "string",
      "credito": "string",
      "cambio": "string",
      "moneda": "MXN",
      "metodo_pago": ""
    },
    "generales_ticket": {
      "encabezado": "string",
      "leyenda_pie_1": "string",
      "leyenda_pie_2": "string"
    }
  }

  ticketColumns = ['producto', 'vu', 'cantidad', 'importe']
  dataColumns = ['tienda', 'fecha', 'monto', 'pdf', 'xml']

  ticketDatasource : MatTableDataSource<any> = new MatTableDataSource(this.data.lista_compras);
  dataSource : MatTableDataSource<any> = new MatTableDataSource();

  ticketNumber : string = '';

  form : FormGroup;
  showTicket: boolean = false;
  showData: boolean = false;

  constructor(
    private facturacionService : FacturacionService,
    private formBuilder : FormBuilder,
    private _snackbar : MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name : new FormControl('', [Validators.required]),
      rfc : new FormControl('', [Validators.required]),
      cp : new FormControl('', [Validators.required]),
      regimen : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      confirmEmail : new FormControl('', [Validators.required])
    }, {validator : CustomValidators.MatchValidator('email', 'confirmEmail')})
  }

  ngOnInit(): void {
  }

  handleClickFacturar() {
    /*this.facturacionService.sendTicket(this.ticketNumber).subscribe((data) => {
    }, error => {});*/

    if(!this.form.valid){
      this._snackbar.open('Por favor complete los datos del cliente', '', {
        duration : 2000
      });
      return;
    }

    this.dataSource = new MatTableDataSource<any>([
      {
        tienda : this.data.datos_tienda.razon_social,
        fecha : this.data.info_operacion.fecha_operacion.substring(0, 10),
        monto : this.data.datos_pago.total
      }])
    this.showData = true;

  }

  clickSearchTicket() {
    if(this.ticketNumber === ''){
      this._snackbar.open('Por favor ingrese un folio de ticket', '', {
        duration : 2000
      });
      return;
    }
    this.showTicket = true;
  }
}
