import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
declare const CanvasJS: any;

@Component({
  selector: 'app-topsellingitems',
  templateUrl: './topsellingitems.component.html',
  styleUrls: ['./topsellingitems.component.scss'],
})
export class TopsellingitemsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let barchart = new CanvasJS.Chart('barchart', {
      animationEnabled: false,

      title: {
        text: '',
      },
      axisX: {
        interval: 1,
      },
      axisY: {
        suffix: '%',
        gridThickness: 0,
      },
      gridThickness: 0,
      data: [
        {
          type: 'bar',
          name: 'companies',
          color: '#014D65',
          indexLabel: '{y}%',
          dataPoints: [
            { y: 55, label: 'Fashion Related Product', color: '#fdd302' },
            { y: 58, label: 'Books/Music/Statinary', color: '#fd2c03' },
            { y: 65, label: 'Mobiles', color: '#9aae00' },
            { y: 100, label: 'Furniture', color: '#ff6d00' },
            { y: 45, label: 'Packaged Grocery Food', color: '#018ffd' },
            { y: 80, label: 'Product for babies', color: '#01b06c' },
            { y: 30, label: 'Beauty and Personal Care', color: '#241399' },
            { y: 95, label: 'Medical and health care', color: '#6c1838' },
            { y: 35, label: 'Video game cd', color: '#170b0b' },
            { y: 20, label: 'Toys', color: '#3ec1c1' },
          ].reverse(),
        },
      ],
    });
  }
}
