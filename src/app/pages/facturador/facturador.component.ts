import { Component, OnInit } from '@angular/core';
import {FacturacionService} from "../../services/facturacion.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomValidators} from "../../utils/EqualityValidator";
import {OptionModel} from "../../models/option-model";
import {MatRadioChange} from "@angular/material/radio";
import {VoucherModel} from "../../models/voucher-model";
import {VoucherService} from "../../services/voucher.service";


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

  persons : OptionModel[] = [
    {value : 1, name : 'PERSONA FÍSICA'},
    {value : 2, name : 'PERSONA MORAL'}
  ]
  usoEj : VoucherModel = {id : '0', c_UsoCFDI : '0', descripcion : 'Seleccione una opción', fechaFin:'', fechaInicio : '', persona : 'Ambas', regimenFiscalR:''}
  usosCfdi : VoucherModel[] = [this.usoEj];
  usosCfdiFiltered : VoucherModel[] = [this.usoEj];
  regimenEj = {value : 0, name : 'Seleccione una opción'};
  regimenFiscalReceptor : OptionModel[] = [this.regimenEj];

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
    private _snackbar : MatSnackBar,
    private voucherService : VoucherService
  ) {
    this.form = this.formBuilder.group({
      name : new FormControl('', [Validators.required]),
      rfc : new FormControl('', [Validators.required]),
      cp : new FormControl('', [Validators.required]),
      person : new FormControl(1, [Validators.required]),
      usoCfdi : new FormControl('0', [Validators.required]),
      regimen : new FormControl(0, [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      confirmEmail : new FormControl('', [Validators.required])
    }, {validator : CustomValidators.MatchValidator('email', 'confirmEmail')})
  }

  ngOnInit(): void {

    this.voucherService.getAllVouchers().subscribe(resp => {
      this.usosCfdi.push(...resp);
      this.usosCfdiFiltered = [this.usoEj, ...resp.filter((r : any) => r.persona === 'Física' || r.persona === 'Ambas')];
    })

  }

  handleClickFacturar() {
    /*this.facturacionService.sendTicket(this.ticketNumber).subscribe((data) => {
    }, error => {});*/

    if(!this.form.valid || this.form.value.usoCfdi === '0' || this.form.value.regimen === 0){
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

  handleChangePerson(value: number) {
    if(value === 1){
      this.usosCfdiFiltered = [...this.usosCfdi.filter(u => u.persona === 'Ambas' || u.persona === 'Física')]
      this.form.controls['usoCfdi'].setValue('0')
      this.restartRegimen();
    }else{
      this.usosCfdiFiltered = [...this.usosCfdi.filter(u => u.persona === 'Ambas' || u.persona === 'Moral')]
      this.form.controls['usoCfdi'].setValue('0')
      this.restartRegimen();
    }
  }

  handleUsoChange(value: any) {
    let found = this.usosCfdiFiltered.find(u => u.c_UsoCFDI === value);
    if(found){
      this.restartRegimen();
      this.regimenFiscalReceptor = [this.regimenEj, ...found.regimenFiscalR.split(',').map(r => {
        return {value : Number.parseInt(r), name : r};
      })]
    }
  }

  restartRegimen(){
    this.regimenFiscalReceptor = [this.regimenEj];
    this.form.controls['regimen'].setValue(0)
  }

}
