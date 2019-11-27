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
  mesesValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private _servicio: ConexionNodeService) {
    let tempArray = [];
    this._servicio.getDataHojaCalculo()
      .subscribe((data: any) => {
        tempArray; this.datos = [];
        data.map(i => tempArray.push(i.fecha.split('/')));
        tempArray.filter(mes => {
          this.datos.push(mes[1]);
        });

        for (let i = 0; i < this.mesesValue.length; i++) {
          for (let j = 0; j < this.datos.length; j++) {
            if (Number(this.datos[j]) == (i + 1)) {
              this.mesesValue[i]++;
            }
          }
        }


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
                data: this.mesesValue.map(i => i)
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


  refrescar() {
    window.location.reload();
  }
}