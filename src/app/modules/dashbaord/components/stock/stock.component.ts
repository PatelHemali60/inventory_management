import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
declare const CanvasJS: any;
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let piechart = new CanvasJS.Chart('pieChart', {
      title: {
        text: '',
      },
      legend: {
        maxWidth: 350,
        itemWidth: 150,
        cursor: 'pointer',
        verticalAlign: 'center',
        horizontalAlign: 'right',
        markerType: 'square',
        markerSize: 12,
      },
      data: [
        {
          type: 'pie',
          showInLegend: true,
          indexLabelPlacement: 'inside',
          dataPoints: [
            { y: 12000, color: '#a155b9', legendText: 'Used Stock' },
            { y: 55000, color: '#16bfd6', legendText: 'Pending Stock' },
            { y: 30000, color: '#f765a3', legendText: 'Holding Stock' },
          ],
        },
      ],
    });
  }
}
