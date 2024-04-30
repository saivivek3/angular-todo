import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-project';
  ngAfterViewInit(): void {
    this.callHighCharts();
  }

  data = [
    { name: 'Completed', y: 70 },
    { name: 'Incomplete', y: 30 },
  ];

  callHighCharts() {
    // @ts-ignore
    Highcharts.chart('container', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Items Status',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Status',
          colorByPoint: true,
          data: this.data,
        },
      ],
    });
  }
}
