import { Component } from '@angular/core';
import { TaskListModule } from './task-list.module';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  tasks: TaskListModule[] = [];
  newTask: string = '';

  addTask() {
    const task: TaskListModule = {
      id: Date.now(),
      title: this.newTask,
      completed: false
    };

    this.tasks.push(task);
    this.newTask = '';
  }

  deleteTask(task: TaskListModule) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

}
