import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoRepresentation } from '../models/todo-representation';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private baseUrl = 'https://todo-services-engj.onrender.com/todos';

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
}
