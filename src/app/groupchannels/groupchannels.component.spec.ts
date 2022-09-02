import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchannelsComponent } from './groupchannels.component';

describe('GroupchannelsComponent', () => {
  let component: GroupchannelsComponent;
  let fixture: ComponentFixture<GroupchannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupchannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupchannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
