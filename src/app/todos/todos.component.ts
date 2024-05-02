import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
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
  selectedDate: any = '';
  selectedOptionValue: any = '';

  @ViewChild('text', { static: true }) text!: ElementRef<HTMLInputElement>;

  constructor(
    private service: TodosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event'])
  ngAfterViewInit() {
    this.text.nativeElement.focus();
  }

  // getAllTodosfunc() {
  //   this.service.getAllTodos().subscribe((todos: any) => {
  //     const reframedTodos = todos
  //       .filter((todo: any) => todo.createdAt)
  //       .map((todo: any) => ({
  //         ...todo,
  //         createdAt: this.getFormattedDate(todo.updatedAt),
  //         updatedAt: this.getFormattedDate(todo.updatedAt),
  //       }));
  //     this.persistAllTodo = reframedTodos;
  //     this.todos = reframedTodos;
  //     this.placeholderText = 'Enter a Todos....';
  //     this.buttonText = 'Add Todo';
  //     // this.getTodoCount(this.todos);

  //   });
  // }

  ngOnInit() {
    this.getAllTodosAndAssignTodos();
  }

  getAllTodosAndAssignTodos() {
    this.service.getAllTodosfunc().subscribe((data: any) => {
      (this.todos = data.todos), (this.persistAllTodo = data.persistAllTodo);
      this.getTodoCount(this.todos);
    });
  }

  getTodoCount(todos: any) {
    const allTodoTexts = todos.map((todo: any) => todo.text);
    this.todosCount = allTodoTexts.reduce((acc: any, curr: any) => {
      acc[curr] = acc[curr] ? ++acc[curr] : 1;
      return acc;
    }, {});
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
            this.getAllTodosAndAssignTodos();
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
            this.getAllTodosAndAssignTodos();
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
        this.getAllTodosAndAssignTodos();
      },
    });
  }
  onDeleteTodo(id: any) {
    this.service.deleteTodo(id).subscribe({
      next: (todo) => {
        this.toastr.success('Deleted Todo Successfuly', 'Success');
        this.getAllTodosAndAssignTodos();
      },
    });
  }
  onEditTodo(todo: TodoRepresentation) {
    this.isEditTodo = true;
    this.buttonText = 'Update Todo';
    this.placeholderText = 'Update a Todo...';
    this.todoText = todo.text;
    this.singleTodo = todo;
    window.scrollTo(0, 0);
  }

  onAllTodos() {
    this.getAllTodosAndAssignTodos();
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

  formateDate(createdAt: any) {
    return new Date(createdAt).toISOString().split('T')[0];
  }

  getSelectedDate() {
    if (this.selectedOptionValue) {
      this.selectSorting();
    } else {
      this.todos = this.persistAllTodo.filter((todo: any) => {
        return this.formateDate(todo.createdAt) === this.selectedDate;
      });
    }
  }

  // selectSorting() {
  //   if (this.selectedOptionValue === 'asc') {
  //     if (this.selectedDate) {
  //       this.todos = this.persistAllTodo
  //         .slice()
  //         .filter(
  //           (todo: any) =>
  //             this.formateDate(todo.createdAt) === this.selectedDate
  //         )
  //         .sort((a: any, b: any) => a.text.localeCompare(b.text));
  //     } else {
  //       this.todos = this.persistAllTodo
  //         .slice()
  //         .sort((a: any, b: any) => a.text.localeCompare(b.text));
  //     }
  //   } else {
  //     if (this.selectedDate) {
  //       this.todos = this.persistAllTodo
  //         .slice()
  //         .filter(
  //           (todo: any) =>
  //             this.formateDate(todo.createdAt) === this.selectedDate
  //         )
  //         .sort((a: any, b: any) => b.text.localeCompare(a.text));
  //     } else {
  //       this.todos = this.persistAllTodo
  //         .slice()
  //         .sort((a: any, b: any) => b.text.localeCompare(a.text));
  //     }
  //   }
  // }
  selectSorting() {
    const sortedTodos = this.persistAllTodo.slice();

    if (this.selectedOptionValue === 'asc') {
      sortedTodos.sort((a: any, b: any) => a.text.localeCompare(b.text));
    } else {
      sortedTodos.sort((a: any, b: any) => b.text.localeCompare(a.text));
    }

    if (this.selectedDate) {
      this.todos = sortedTodos.filter(
        (todo: any) => this.formateDate(todo.createdAt) === this.selectedDate
      );
    } else {
      this.todos = sortedTodos;
    }
  }
}
