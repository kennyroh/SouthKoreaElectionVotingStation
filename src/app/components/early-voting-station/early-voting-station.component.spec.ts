import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyVotingStationComponent } from './early-voting-station.component';

describe('EarlyVotingStationComponent', () => {
  let component: EarlyVotingStationComponent;
  let fixture: ComponentFixture<EarlyVotingStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarlyVotingStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlyVotingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
