import { Component } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  ngOnInit(){
    this.getAllTodosfunc();
  }

  getFormattedDate(dateTimeString: string) {
    const dateTime = new Date(dateTimeString)
    const options: any = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    const formattedDate:any = dateTime.toLocaleDateString('en-US', options);
    // Format the time as desired
    const formattedTime = dateTime.toLocaleTimeString('en-US');
    // Combine date and time
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }


  getAllTodosfunc() {
    this.service.getAllTodos().subscribe((todos: any) => {
      const reframedTodos = todos.map((todo: any) => ({
        ...todo,
        createdAt: this.getFormattedDate(todo.createdAt),
        updatedAt: this.getFormattedDate(todo.updatedAt),
      }));
      this.todos = reframedTodos;
    });
  }
}
