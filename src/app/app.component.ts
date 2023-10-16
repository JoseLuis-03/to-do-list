import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild ('asBar') bar!: ElementRef;


  title = 'to-do-list';

  change(): void {

      const asBar = this.bar.nativeElement;     //  <div #asBar></div>
      

  }
}
