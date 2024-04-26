import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TodosService } from '../services/api/todos.service';
import { TodoRepresentation } from '../services/models/todo-representation';
import { ToastrService } from 'ngx-toastr';

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
  placeholderText: string = 'Enter a Todos....';
  persistAllTodo: any = [];

  @ViewChild('text', { static: true }) text!: ElementRef<HTMLInputElement>;
  constructor(private service: TodosService, private toastr: ToastrService) {}

  ngAfterViewInit() {
    this.text.nativeElement.focus();
  }

  getAllTodosfunc() {
    this.service.getAllTodos().subscribe((todos) => {
      this.persistAllTodo = todos;
      this.todos = todos;
      this.placeholderText = 'Enter a Todos....';
      this.buttonText = 'Add Todo';
    });
  }

  ngOnInit() {
    this.getAllTodosfunc();
  }

  addTodo() {
    if (this.todoText === '') {
      this.toastr.error('Please Add Todos', 'error');
      return;
    }
    if (this.isEditTodo) {
      this.service
        .updateTodo({ ...this.singleTodo, text: this.todoText })
        .subscribe({
          next: (todo) => {
            this.toastr.success('Updated Todo Succesfully', 'Success');
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
            this.toastr.success('Added Todo Successfully', 'Success');
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
    this.service.updateTodo(singleTodo).subscribe({
      next: (todo) => {
        this.getAllTodosfunc();
      },
    });
  }
  onDeleteTodo(id: any) {
    this.service.deleteTodo(id).subscribe({
      next: (todo) => {
        this.toastr.success('Deleted Todo Successfuly', 'Success');
        this.getAllTodosfunc();
      },
    });
  }
  onEditTodo(todo: TodoRepresentation) {
    this.isEditTodo = true;
    this.buttonText = 'Update Todo';
    this.placeholderText = 'Update a Todo...';
    this.todoText = todo.text;
    this.singleTodo = todo;
  }

  onAllTodos() {
    this.getAllTodosfunc();
  }

  onActiveTodos() {
    this.todos = this.persistAllTodo.filter((todo: any) => !todo.completed);
  }
  onCompletedTodos() {
    this.todos = this.persistAllTodo.filter((todo: any) => todo.completed);
  }
}
