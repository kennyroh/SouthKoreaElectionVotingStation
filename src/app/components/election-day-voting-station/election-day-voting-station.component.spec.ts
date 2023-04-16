import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionDayVotingStationComponent } from './election-day-voting-station.component';

describe('ElectionDayVotingStationComponent', () => {
  let component: ElectionDayVotingStationComponent;
  let fixture: ComponentFixture<ElectionDayVotingStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionDayVotingStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionDayVotingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
