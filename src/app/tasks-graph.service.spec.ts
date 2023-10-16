import { TestBed } from '@angular/core/testing';

import { TasksGraphService } from './tasks-graph.service';

describe('TasksGraphService', () => {
  let service: TasksGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
