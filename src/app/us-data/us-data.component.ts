import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';

@Component({
  selector: 'app-us-data',
  templateUrl: './us-data.component.html',
  styleUrls: ['./us-data.component.css'],
})
export class UsDataComponent {
  ngOnInit() {
    this.callHighChart();
  }

  async callHighChart() {
    const topology = await fetch(
      'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json'
    ).then((response) => response.json());

    const data = [
      ['us-ma', 10],
      ['us-wa', 11],
      ['us-ca', 12],
      ['us-or', 13],
      ['us-wi', 14],
      ['us-me', 15],
      ['us-mi', 16],
      ['us-nv', 17],
      ['us-nm', 18],
      ['us-co', 19],
      ['us-wy', 20],
      ['us-ks', 21],
      ['us-ne', 22],
      ['us-ok', 23],
      ['us-mo', 24],
      ['us-il', 25],
      ['us-in', 26],
      ['us-vt', 27],
      ['us-ar', 28],
      ['us-tx', 29],
      ['us-ri', 30],
      ['us-al', 31],
      ['us-ms', 32],
      ['us-nc', 33],
      ['us-va', 34],
      ['us-ia', 35],
      ['us-md', 36],
      ['us-de', 37],
      ['us-pa', 38],
      ['us-nj', 39],
      ['us-ny', 40],
      ['us-id', 41],
      ['us-sd', 42],
      ['us-ct', 43],
      ['us-nh', 44],
      ['us-ky', 45],
      ['us-oh', 46],
      ['us-tn', 47],
      ['us-wv', 48],
      ['us-dc', 49],
      ['us-la', 50],
      ['us-fl', 51],
      ['us-ga', 52],
      ['us-sc', 53],
      ['us-mn', 54],
      ['us-mt', 55],
      ['us-nd', 56],
      ['us-az', 57],
      ['us-ut', 58],
      ['us-hi', 59],
      ['us-ak', 60],
    ];

    // @ts-ignore
    Highcharts.mapChart('container', {
      chart: {
        map: topology,
      },

      title: {
        text: 'Highcharts Maps Us Cities ',
      },

      subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-all.topo.json">United States of America</a>',
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },

      colorAxis: {
        min: 0,
      },

      series: [
        {
          data: data,
          name: 'Random data',
          states: {
            hover: {
              color: '#BADA55',
            },
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      ],
    });
  }
}