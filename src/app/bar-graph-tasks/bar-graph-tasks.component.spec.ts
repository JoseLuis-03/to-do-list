import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphTasksComponent } from './bar-graph-tasks.component';

describe('BarGraphTasksComponent', () => {
  let component: BarGraphTasksComponent;
  let fixture: ComponentFixture<BarGraphTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarGraphTasksComponent]
    });
    fixture = TestBed.createComponent(BarGraphTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
