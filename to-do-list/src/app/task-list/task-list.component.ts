import { Component } from '@angular/core';
import { TaskListModule } from './task-list.module';
import { TasksGraphService } from '../tasks-graph.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  tasks: TaskListModule[] = [];
  newTask: string = '';
  completedTasks: number = 0;
  notcompletedTasks: number = 0;

  constructor(private tasksGraphService: TasksGraphService) { }

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

  ngDoCheck(): void {
    // Calcular el conteo de tareas completadas y pendientes en función de los datos actuales
    this.completedTasks = this.tasks.filter(task => task.completed).length;
    this.notcompletedTasks = this.tasks.length - this.completedTasks;
    
    const newData: number[] = [this.completedTasks, this.notcompletedTasks];
    this.tasksGraphService.updateData(newData);
  }

  

}
