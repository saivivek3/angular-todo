import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-project';
  counter = 0;
}
