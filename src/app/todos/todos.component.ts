import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TodosService } from '../services/api/todos.service';
import { TodoRepresentation } from '../services/models/todo-representation';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements AfterViewInit {
  todoText: any = '';
  todos: any = [];
  buttonText: string = 'Add Todo';
  isEditTodo: boolean = false;
  singleTodo: TodoRepresentation = {};
  persistAllTodo: any = [];

  @ViewChild('text', { static: true }) text!: ElementRef<HTMLInputElement>;
  constructor(private service: TodosService) {}

  ngAfterViewInit() {
    this.text.nativeElement.focus();
  }

  getAllTodosfunc() {
    this.service.getAllTodos().subscribe((todos) => {
      this.persistAllTodo = todos;
      this.todos = todos;
    });
  }

  ngOnInit() {
    this.getAllTodosfunc();
  }

  addTodo() {
    if (this.isEditTodo) {
      this.service
        .updateTodo({ ...this.singleTodo, text: this.todoText })
        .subscribe({
          next: (todo) => {
            alert('Updated Todo Succesfully');
            console.log(todo, 'in edit');
            this.getAllTodosfunc();
            this.todoText = '';
          },
        });
    } else {
      this.service
        .createTodo({
          text: this.todoText,
          _id: new Date().getUTCMilliseconds(),
          completed: false,
        })
        .subscribe({
          next: (todo) => {
            alert('Added Todo Successfully');
            this.todoText = '';
            this.getAllTodosfunc();
          },
        });
    }
  }

  toggle(id: any) {
    this.todos = this.todos.map((todo: any) => {
      return todo._id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo;
    });

    const singleTodo = this.todos.find((todo: any) => todo._id === id);
    console.log({ singleTodo });
    this.service.updateTodo(singleTodo).subscribe({
      next: (todo) => {
        alert('Updated Todo Successfully');
        console.log(todo);
        this.getAllTodosfunc();
      },
    });
  }
  onDeleteTodo(id: any) {
    this.service.deleteTodo(id).subscribe({
      next: (todo) => {
        alert('Deleted Todo Successfuly');
        console.log(todo, 'in delete');
        this.getAllTodosfunc();
      },
    });
  }
  onEditTodo(todo: TodoRepresentation) {
    this.isEditTodo = true;

    this.buttonText = 'Update Todo';
    this.todoText = todo.text;
    this.singleTodo = todo;
  }

  onAllTodos() {
    console.log('function was called');
    this.getAllTodosfunc();
  }

  onActiveTodos() {
    this.todos = this.persistAllTodo.filter((todo: any) => !todo.completed);
  }
  onCompletedTodos() {
    this.todos = this.persistAllTodo.filter((todo: any) => todo.completed);
  }
}
