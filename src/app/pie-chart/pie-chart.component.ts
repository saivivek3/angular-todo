import { Component } from '@angular/core';
import { TodosService } from '../services/api/todos.service';
import { TodoRepresentation } from '../services/models/todo-representation';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  todos: TodoRepresentation[] = [];
  constructor(private service: TodosService) {}

  ngOnInit() {
    this.service.getAllTodosfunc().subscribe((data) => {
      this.callHighChart(data.todos);
    });
  }

  callHighChart(todos: TodoRepresentation[]) {
    const chartData: any = [];

    let completedTodos: any = todos.filter((todo: any) => todo.completed);
    let inCompletedTodos: any = todos.filter((todo: any) => !todo.completed);

    const data = [
      { name: 'Completed', y: completedTodos.length / 100 },
      { name: 'Incomplete', y: inCompletedTodos.length / 100 },
    ];

    console.log({ chartData });
    // @ts-ignore
    Highcharts.chart('container', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Todo Status',
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
          name: 'Todo Status',
          colorByPoint: true,
          data,
        },
      ],
    });
  }
}
