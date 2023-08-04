import { AfterViewInit, Component, OnInit } from '@angular/core';
declare const CanvasJS: any;
@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit,AfterViewInit {
  sidebarOpen = false;

constructor(){

}

ngOnInit(): void {

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
// ngOnInit(): void {
//   google.charts.load('current', { packages: ['bar'] });
//   google.charts.setOnLoadCallback(this.drawChart);
// }

// drawChart() {
//   var data = google.visualization.arrayToDataTable([
//     ['Year', 'Purchase', 'Sales'],
//     ['Jan', 45000, 50000],
//     ['Fab', 45000, 56000],
//     ['Mar', 55060, 20000],
//     ['Apr', 45900, 54000],
//     ['May', 30000, 60000],
//     ['Jun', 40000, 55000],
//     ['July', 30000, 55000],
//     ['Aug', 34000, 55000],
//     ['Sap', 20000, 55000],
//     ['Ocs', 59000, 55000],
//     ['Nav', 58000, 53000],
//     ['Dec', 60000, 50000],
//   ]);

//   var options: any = {
//     legend: { position: 'top' }, // Specify a valid position: 'bottom', 'in', 'none'
//     colors: ['#7b58d0', '#629ff4'],

//     chart: {
//       title: '',
//     },
//     vAxis: {
//       minValue: 10000,
//       maxValue: 75000,
//       gridlines: {
//         count: 6,
//       },
//     },
//     bar: {
//       groupWidth: '30%',
//     },
//   };

//   var chartContainer = document.getElementById('columnchart_material')!;
//   if (chartContainer) {
//     var chart = new google.visualization.BarChart(chartContainer);
//     google.visualization.events.addListener(chart, 'ready', function () {
//       // Add class to the bars to apply the rounded corners
//       Array.from(chartContainer.querySelectorAll('rect')).forEach(function (bar) {
//         bar.classList.add('rounded-bar');
//       });
//     });
//     chart.draw(data, options);
//   }
// }

ngAfterViewInit(): void {
  // google.charts.load('current', { packages: ['bar'] });
  // google.charts.setOnLoadCallback(this.drawChart);

  let linechart = new CanvasJS.Chart("linechart", {
    animationEnabled: false,
    title: {
      text: ""
    },
    axisY: {
      title: "",
      titleFontColor: "#4F81BC",
      lineColor: "#7b58d0",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
    },
    axisY2: {
      title: "",
      titleFontColor: "#C0504E",
      lineColor: "#629ff4",
      labelFontColor: "#C0504E",
      tickColor: "#C0504E",
      interval: 1
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    dataPointWidth: 10,

    data: [{
      type: "column",
      name: "",
      legendText: "",
      interval: 0,
      showInLegend: false,
      color: '#7b58d0',
      borderRadius: 50,
      borderWidth: 1,
      dataPoints: [
        { label: "Jan", y: 49000 },
        { label: "Feb", y: 59000 },
        { label: "March", y: 44000 },
        { label: "Apr", y: 38000 },
        { label: "May", y: 44000 },
        { label: "Jun", y: 29000 },
        { label: "July", y: 55000 },
        { label: "Aug", y: 41000 },
        { label: "Sep", y: 40000 },
        { label: "Oct", y: 46000 },
        { label: "Nov", y: 55000 },
        { label: "Dec", y: 52000 },

      ]
    },
    {
      type: "column",
      name: "",
      legendText: "",
      interval: 0,
      showInLegend: true,
      color: '#629ff4',
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust the background color of the columns
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      dataPoints: [
        { label: "Jan", y: 45000 },
        { label: "Feb", y: 48000 },
        { label: "March", y: 52000 },
        { label: "Apr", y: 53000 },
        { label: "May", y: 46000 },
        { label: "Jun", y: 41000 },
        { label: "July", y: 49000 },
        { label: "Aug", y: 42000 },
        { label: "Sep", y: 48000 },
        { label: "Oct", y: 52000 },
        { label: "Nov", y: 50000 },
        { label: "Dec", y: 55000 },
      ]
    }]
  });
  let piechart = new CanvasJS.Chart("pieChart",
  {
    title: {
      text: ""
    },
    legend: {
      maxWidth: 350,
      itemWidth: 150,
      cursor: "pointer",
      verticalAlign: "center",
      horizontalAlign: "right",
      markerType: "square",
      markerSize: 12,
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        indexLabelPlacement: 'inside',
        dataPoints: [
          { y: 12000, color: "#a155b9", legendText: 'Used Stock' },
          { y: 55000, color: "#16bfd6", legendText: 'Pending Stock' },
          { y: 30000, color: "#f765a3", legendText: 'Holding Stock' },
        ]
      }
    ]
  });

let barchart = new CanvasJS.Chart("barchart", {
  animationEnabled: false,

  title: {
    text: ""
  },
  axisX: {
    interval: 1
  },
  axisY: {
    suffix: "%",
    gridThickness: 0
  },
  gridThickness: 0,
  data: [{
    type: "bar",
    name: "companies",
    color: "#014D65",
    indexLabel: "{y}%",
    dataPoints: [
      { y: 55, label: "Fashion Related Product", color: '#fdd302' },
      { y: 58, label: "Books/Music/Statinary", color: '#fd2c03' },
      { y: 65, label: "Mobiles", color: '#9aae00' },
      { y: 100, label: "Furniture", color: '#ff6d00' },
      { y: 45, label: "Packaged Grocery Food", color: '#018ffd' },
      { y: 80, label: "Product for babies", color: '#01b06c' },
      { y: 30, label: "Beauty and Personal Care", color: '#241399' },
      { y: 95, label: "Medical and health care", color: '#6c1838' },
      { y: 35, label: "Video game cd", color: '#170b0b' },
      { y: 20, label: "Toys", color: '#3ec1c1' },
    ].reverse()
  }]
});

//line chart
// let ctx = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
// var gradientBkgrd = ctx.createLinearGradient(0, 0, 0, 300);
// gradientBkgrd.addColorStop(1, '#f6f4fc');

// Chart.controllers.line.prototype.draw = function () {};

// this.chart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['Jan', 'Fab', 'Mar', 'Dec', 'Apr', 'May'],
//     datasets: [
//       {
//         label: 'Ordered',
//         backgroundColor: gradientBkgrd,
//         borderColor: '#ff3b74',
//         data: [3000, 2000, 2000, 2800, 2900, 3200],
//         pointBorderWidth: 0,
//         pointRadius: 1,
//         borderWidth: 5,
//         pointHitRadius: 16,
//       },
//       {
//         label: 'Delivered',
//         borderColor: '#7B58D0',
//         data: [3300, 1300, 2400, 3200, 3100, 3400],
//         pointBorderWidth: 0,
//         pointRadius: 1,
//         borderWidth: 5,
//         pointHitRadius: 16,
//       },
//     ],
//   },
//   options: {
//     tooltips: {
//       backgroundColor: '#fff',
//       displayColors: false,
//       titleFontColor: 'black',
//       bodyFontColor: '#000',
//     },
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           ticks: {
//             min: 0,
//             max: 4000,
//             stepSize: 1000,
//           },
//           display: true,
//           gridLines: {
//             display: true,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           title: {
//             text: 'Purchase Orders',
//           },
//         },
//         {
//           opposite: true,
//           title: {
//             text: 'Sales Orders',
//           },
//         },
//       ],
//     },
//   },
// });



  function toggleDataSeries(e: any) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    linechart.render();
  }

}



// drawChart() {
//   var data = google.visualization.arrayToDataTable([
//         ['Year', 'Purchase', 'Sales'],
//         ['Jan', 45000, 50000],
//         ['Fab', 45000, 56000],
//         ['Mar', 55060, 20000],
//         ['Apr', 45900, 54000],
//         ['May', 30000, 60000],
//         ['Jun', 40000, 55000],
//         ['July', 30000, 55000],
//         ['Aug', 34000, 55000],
//         ['Sap', 20000, 55000],
//         ['Ocs', 59000, 55000],
//         ['Nav', 58000, 53000],
//         ['Dec', 60000, 50000],
//       ]);

//   var options = {
//     legend: { position: 'top' },
//     colors: ['#7b58d0', '#629ff4'],
//     chart: { title: '' },
//     vAxis: {
//       minValue: 10000,
//       maxValue: 75000,
//       gridlines: {
//         count: 6,
//       },
//     },
//     bar: { groupWidth: '30%' },
//   };

//   var chartContainer = document.getElementById('columnchart_material');
//   if (chartContainer) {
//     var chart = new google.visualization.BarChart(chartContainer);
//     // chart.draw(data, options);
//   }
// }
}


