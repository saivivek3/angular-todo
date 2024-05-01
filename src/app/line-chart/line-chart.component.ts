import { Component } from '@angular/core';
import { TodoRepresentation } from '../services/models/todo-representation';
import { TodosService } from '../services/api/todos.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
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
    const updatedDates: any = todos
      .filter((todo: any) => !todo.createdAt.includes('Invalid'))
      .map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt).toISOString().split('T')[0],
      }));

    const dateValues: any = [
      ...new Set(
        Object.values(updatedDates.map((date: any) => date.createdAt))
      ),
    ];

    const data: any = dateValues.map((date: any) => {
      let objData: any = {};
      console.log({ updatedDates });
      updatedDates.forEach((todo: any) => {
        if (todo.createdAt === date) {
          objData[todo.text] = objData[todo.text] ? ++objData[todo.text] : 1;
        } else {
          if (!(todo.text in objData)) {
            objData[todo.text] = 0;
          }
        }
      });

      return {
        date,
        ...objData,
      };
    });

    console.log({ data });

    // Transform data into series format for each item
    var seriesData: any = [];
    var categories: any = [];

    for (var i = 0; i < data.length; i++) {
      categories.push(data[i].date);
    }

    var items = Object.keys(data[0]).filter((key) => key !== 'date');

    items.forEach(function (item) {
      var itemData = [];
      for (var i = 0; i < data.length; i++) {
        itemData.push(data[i][item]);
      }

      seriesData.push({
        name: item,
        data: itemData,
      });
    });

    // Create the line chart for all items
    Highcharts.chart('container', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Items Count Over Time',
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Date',
        },
      },
      yAxis: {
        title: {
          text: 'Count',
        },
      },
      series: seriesData,
    });
  }
}
