import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';

@Component({
  selector: 'app-us-data',
  templateUrl: './us-data.component.html',
  styleUrls: ['./us-data.component.css'],
})
export class UsDataComponent implements OnInit {
  ngOnInit() {
    this.callHighChart();
  }

  callHighChart() {
    (async () => {
      const mapData = await fetch(
        'https://code.highcharts.com/mapdata/countries/us/us-all-all.topo.json'
      ).then((response) => response.json());

      let data: any = [];

      // Add state acronym for tooltip

      data = mapData.objects.default.geometries
        .filter((item: any) => {
          return ['gonzales', 'dallas'].includes(
            item.properties?.name?.toLowerCase()
          );
        })
        .map((item: any) => ({
          code: item.properties?.['hc-key'],
          name: item.properties?.name,
        }));

      // Create the map

      // Otherwise innerHTML doesn't update
      //@ts-ignore
      Highcharts.mapChart('container', {
        chart: {
          map: mapData,
          height: '80%',
        },

        title: {
          text: 'Cities in U.S',
          align: 'left',
        },

        accessibility: {
          description: 'Demo showing a large dataset.',
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          margin: 0,
          backgroundColor:
            // theme
            (Highcharts.defaultOptions &&
              Highcharts.defaultOptions.legend &&
              Highcharts.defaultOptions.legend.backgroundColor) ||
            'rgba(255, 255, 255, 0.85)',
        },

        mapNavigation: {
          enabled: true,
        },

        // colorAxis: {
        //   min: 0,
        //   max: 25,
        //   tickInterval: 5,
        //   stops: [
        //     [0, '#F1EEF6'],
        //     [0.65, '#900037'],
        //     [1, '#500007'],
        //   ],
        //   labels: {
        //     format: '{value}%',
        //   },
        // },

        plotOptions: {
          mapline: {
            showInLegend: false,
            enableMouseTracking: false,
          },
        },

        series: [
          {
            data: data,
            joinBy: ['hc-key', 'code'],
            name: 'Cities',
            borderWidth: 0.5,

            shadow: false,
            accessibility: {
              enabled: false,
            },
          },
          {
            type: 'mapline',
            name: 'State borders',
            color: 'white',
            shadow: false,
            borderWidth: 2,
            accessibility: {
              enabled: false,
            },
          },
        ],
      });
    })();
  }
}
