import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksGraphService {

  //completedTasks: number = 0;
  //notcompletedTasks: number = 0;

  private dataSubject = new BehaviorSubject<number[]>([]);
  public data$: Observable<number[]> = this.dataSubject.asObservable();

  updateData(newData: number[]): void {
    this.dataSubject.next(newData);     // actualiza el valor del subject
    //console.log(newData);
  }
}


