import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ConexionNodeService } from 'src/app/services/conexion-node.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public options: any = {};
  datos: any[] = [];
  loading: boolean = false;
  enero = 0
  febrero = 0
  marzo = 0
  abril = 0
  mayo = 0
  junio = 0
  julio = 0
  agosto = 0
  septiembre = 0
  octubre = 0
  noviembre = 0
  diciembre = 0;
  // arrayMeses = [0, '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  constructor(private _servicio: ConexionNodeService) {
    let tempArray = [];
    this._servicio.getDataHojaCalculo()
      .subscribe((data: any) => {
        tempArray; this.datos = [];
        data.map(i => tempArray.push(i.fecha.split('/')));
        tempArray.filter(mes => {
          this.datos.push(mes[1]);
        });

        for (let i = 0; i < this.datos.length; i++) {
          if (this.datos[i] == '01') {
            this.enero++;
          }
          if (this.datos[i] == "02") {
            this.febrero++;
          }
          if (this.datos[i] == "03") {
            this.marzo++;
          }
          if (this.datos[i] == "04") {
            this.abril++;
          }
          if (this.datos[i] == "05") {
            this.mayo++;
          }
          if (this.datos[i] == "06") {
            this.junio++;
          }
          if (this.datos[i] == "07") {
            this.julio++;
          }
          if (this.datos[i] == "08") {
            this.agosto++;
          }
          if (this.datos[i] == "09") {
            this.septiembre++;
          }
          if (this.datos[i] == "10") {
            this.octubre++;
          }
          if (this.datos[i] == "11") {
            this.noviembre++;
          }
          if (this.datos[i] == "12") {
            this.diciembre++;
          }
        }


        console.log(this.agosto);

        this.loading = true;
        if (this.loading) {
          this.options = {
            chart: {
              type: 'line',
              height: 700
            },
            title: {
              text: 'Meses con mas concurrencia de datos'
            },
            credits: {
              enabled: false
            },
            xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [
              {
                name: 'mes',
                data: [this.enero, this.febrero, this.marzo, this.abril, this.mayo,this.junio, this.julio, this.agosto, this.septiembre, this.octubre, this.noviembre, this.diciembre]
              },
            ]
          }
          Highcharts.chart('container', this.options);
        }
      });
  }

  ngOnInit() {
    this.loading = true;
  }


  refrescar(){
    window.location.reload();
  }
}