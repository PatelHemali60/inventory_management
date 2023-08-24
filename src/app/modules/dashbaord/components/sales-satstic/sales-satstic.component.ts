import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
declare const CanvasJS: any;

@Component({
  selector: 'app-sales-satstic',
  templateUrl: './sales-satstic.component.html',
  styleUrls: ['./sales-satstic.component.scss'],
})
export class SalesSatsticComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    let linechart = new CanvasJS.Chart('linechart', {
      animationEnabled: false,
      title: {
        text: '',
      },
      axisY: {
        title: '',
        titleFontColor: '#4F81BC',
        lineColor: '#7b58d0',
        labelFontColor: '#4F81BC',
        tickColor: '#4F81BC',
      },
      axisY2: {
        title: '',
        titleFontColor: '#C0504E',
        lineColor: '#629ff4',
        labelFontColor: '#C0504E',
        tickColor: '#C0504E',
        interval: 1,
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: toggleDataSeries,
      },
      dataPointWidth: 10,

      data: [
        {
          type: 'column',
          name: '',
          legendText: '',
          interval: 0,
          showInLegend: false,
          color: '#7b58d0',
          borderRadius: 50,
          borderWidth: 1,
          dataPoints: [
            { label: 'Jan', y: 49000 },
            { label: 'Feb', y: 59000 },
            { label: 'March', y: 44000 },
            { label: 'Apr', y: 38000 },
            { label: 'May', y: 44000 },
            { label: 'Jun', y: 29000 },
            { label: 'July', y: 55000 },
            { label: 'Aug', y: 41000 },
            { label: 'Sep', y: 40000 },
            { label: 'Oct', y: 46000 },
            { label: 'Nov', y: 55000 },
            { label: 'Dec', y: 52000 },
          ],
        },
        {
          type: 'column',
          name: '',
          legendText: '',
          interval: 0,
          showInLegend: true,
          color: '#629ff4',
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust the background color of the columns
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          dataPoints: [
            { label: 'Jan', y: 45000 },
            { label: 'Feb', y: 48000 },
            { label: 'March', y: 52000 },
            { label: 'Apr', y: 53000 },
            { label: 'May', y: 46000 },
            { label: 'Jun', y: 41000 },
            { label: 'July', y: 49000 },
            { label: 'Aug', y: 42000 },
            { label: 'Sep', y: 48000 },
            { label: 'Oct', y: 52000 },
            { label: 'Nov', y: 50000 },
            { label: 'Dec', y: 55000 },
          ],
        },
      ],
    });

    function toggleDataSeries(e: any) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      linechart.render();
    }
  }
}
