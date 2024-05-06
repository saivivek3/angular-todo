import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TodosComponent } from './todos/todos.component';
import { UsDataComponent } from './us-data/us-data.component';

const routes: Routes = [
  {
    path: 'line-chart',
    component: LineChartComponent,
  },
  {
    path: 'pie-chart',
    component: PieChartComponent,
  },
  {
    path: '',
    component: TodosComponent,
  },

  {
    path: 'us-data',
    component: UsDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
