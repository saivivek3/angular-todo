import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input()
  todos: any = [];

  constructor() {
    console.log(this.todos, 'in constructor');
  }
  @Output()
  onAllTodos = new EventEmitter();

  @Output()
  onActiveTodos = new EventEmitter();

  @Output()
  onCompletedTodos = new EventEmitter();

  allTodos() {
    this.onAllTodos.emit();
  }

  activeTodos() {
    this.onActiveTodos.emit();
  }
  completedTodos() {
    this.onCompletedTodos.emit();
  }
}
