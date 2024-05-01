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
    this.getAllTodosfunc();
  }

  getFormattedDate(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);
    const options: any = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    const formattedDate: any = dateTime.toLocaleDateString('en-US', options);
    // Format the time as desired
    const formattedTime = dateTime.toLocaleTimeString('en-US');
    // Combine date and time
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  getAllTodosfunc() {
    this.service.getAllTodos().subscribe((todos: any) => {
      const reframedTodos = todos
        .filter((todo: any) => todo.createdAt)
        .map((todo: any) => ({
          ...todo,
          createdAt: this.getFormattedDate(todo.createdAt),
          updatedAt: this.getFormattedDate(todo.updatedAt),
        }));
      this.todos = reframedTodos;
      this.callHighChart(this.todos);
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
