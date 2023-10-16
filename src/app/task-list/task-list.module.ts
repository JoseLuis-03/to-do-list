import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/**@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})**/

export interface TaskListModule { 

  id: number;
  title: string;
  completed: boolean;

}
