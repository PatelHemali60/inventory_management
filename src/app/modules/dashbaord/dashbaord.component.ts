import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
declare const CanvasJS: any;
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss'],
})
export class DashbaordComponent implements OnInit, AfterViewInit {
  //set dynamic data for card section
  card1 = {
    Profit: 'Annual Profit',
    price: '$1250,0k',
  };
  card1_bg1 = '#e5f6fd';
  card2 = {
    Profit: 'Annual Profit',
    price: '$1250,0k',
  };
  card1_bg2 = '#fff4de';
  card3 = {
    Profit: 'Annual Sale',
    price: '$1250,0k',
  };
  card1_bg3 = '#fff1ee';
  card4 = {
    Profit: 'Daily Profit',
    price: '$1250,0k',
  };
  card1_bg4 = '#e6f2f2';
  card5 = {
    Profit: 'Purchase',
    price: '5000',
  };
  card1_bg5 = '#e6f2f2';
  card6 = {
    Profit: 'Cancle Order',
    price: '50',
  };
  card1_bg6 = '#fce9eb';
  card7 = {
    Profit: 'Purchase',
    price: '$85000',
  };
  card1_bg7 = '#fff2ec';

  card8 = {
    Profit: 'Returns',
    price: '100',
  };
  card1_bg8 = '#f8edf3';
  @ViewChild('Linechart', { static: false }) lineChartCanvas!: ElementRef;

  sidebarOpen = false;
  public colors!: any[];
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  ngAfterViewInit(): void {
    // google.charts.load('current', { packages: ['bar'] });
    // google.charts.setOnLoadCallback(this.drawChart);
  }

  openSidebar() {
    if (!this.sidebarOpen) {
      this.sidebarOpen = true;
    }
  }

  closeSidebar() {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }

  createChart() {
    const ctx = document.getElementById('line-chart') as HTMLCanvasElement;
    const myChart = new CanvasJS.Chart('line-chart', {
      type: 'line',
      data: {
        labels: [1500, 1600, 1700, 1800, 1850, 1900, 1950, 2000, 2050, 2100],
        datasets: [
          // ... your datasets ...
        ],
      },
      options: {
        // ... your options ...
      },
    });
  }

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];
  public lineChartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: any = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.lineChartData[i].data.length),
        label: this.lineChartData[i].label,
      };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor(Math.random() * 100 + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
