import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TodosService } from '../services/api/todos.service';
import { TodoRepresentation } from '../services/models/todo-representation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  todosCount: any = [];

  @ViewChild('text', { static: true }) text!: ElementRef<HTMLInputElement>;
  constructor(
    private service: TodosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.text.nativeElement.focus();
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

  getAllTodosfunc() {
    this.service.getAllTodos().subscribe((todos: any) => {
      const reframedTodos = todos.map((todo: any) => ({
        ...todo,
        createdAt: this.getFormattedDate(todo.updatedAt),
        updatedAt: this.getFormattedDate(todo.updatedAt),
      }));

      console.log({ reframedTodos });
      this.persistAllTodo = reframedTodos;
      this.todos = reframedTodos;
      this.placeholderText = 'Enter a Todos....';
      this.buttonText = 'Add Todo';
      this.getTodoCount(todos);
    });
  }

  ngOnInit() {
    this.getAllTodosfunc();
  }

  getTodoCount(todos: any) {
    const allTodoTexts = todos.map((todo: any) => todo.text);
    this.todosCount = allTodoTexts.reduce((acc: any, curr: any) => {
      acc[curr] = acc[curr] ? ++acc[curr] : 1;
      return acc;
    }, {});

    console.log(this.todosCount, 'count in gettodocount');
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
            console.log(todo, 'todo in edits');
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

  goToPage(chart: any) {
    return chart === 'line'
      ? this.router.navigate(['/line-chart'])
      : this.router.navigateByUrl('/pie-chart');
  }
}
