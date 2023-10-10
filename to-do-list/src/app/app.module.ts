import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { BarGraphTasksComponent } from './bar-graph-tasks/bar-graph-tasks.component';
import { TasksGraphService } from './tasks-graph.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    BarGraphTasksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [TasksGraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
