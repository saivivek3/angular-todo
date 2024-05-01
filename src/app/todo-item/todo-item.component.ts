import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoRepresentation } from '../services/models/todo-representation';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input()
  todo: TodoRepresentation = {};

  @Input()
  todosCnt: any = 0;

  @Output()
  toggleCheckbox = new EventEmitter();
  @Output()
  onDeleteTodo = new EventEmitter();

  @Output()
  onEditTodo = new EventEmitter();

  count: any = 1;

  toggleTodo(id: any) {
    this.toggleCheckbox.emit(id);
  }

  deleteTodo(id: any) {
    this.onDeleteTodo.emit(id);
  }

  editTodo(todo: TodoRepresentation) {
    this.onEditTodo.emit(todo);
  }
}
