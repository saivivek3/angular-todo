import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoRepresentation } from '../models/todo-representation';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private baseUrl = 'https://todo-services-engj.onrender.com/todos';
  persistAllTodo: any = [];
  todos: any = [];
  placeholderText: any = '';
  buttonText: any = '';

  constructor(private http: HttpClient) {}

  createTodo(todo: TodoRepresentation) {
    return this.http.post(this.baseUrl, todo);
  }
  getAllTodos() {
    return this.http.get(this.baseUrl);
  }
  updateTodo(todo: TodoRepresentation) {
    return this.http.put(`${this.baseUrl}/${todo._id}`, todo);
  }

  deleteTodo(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getFormattedDate(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);

    // Format the date as desired
    const options: any = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    const formattedDate = dateTime.toLocaleDateString('en-US', options);
    // Format the time as desired
    const formattedTime = dateTime.toLocaleTimeString('en-US');
    // Combine date and time
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  getAllTodosfunc(): Observable<any> {
    return this.getAllTodos().pipe(
      map((todos: any) => {
        const reframedTodos = todos
          .filter((todo: any) => todo.createdAt)
          .map((todo: any) => ({
            ...todo,
            createdAt: this.getFormattedDate(todo.updatedAt),
            updatedAt: this.getFormattedDate(todo.updatedAt),
          }));
        this.persistAllTodo = reframedTodos;
        this.todos = reframedTodos;
        this.placeholderText = 'Enter a Todos....';
        this.buttonText = 'Add Todo';
        return { todos: this.todos, persistAllTodo: this.persistAllTodo };
      }),
      catchError((error) => {
        console.error('Error fetching todos:', error);
        throw error;
      })
    );
  }
}
