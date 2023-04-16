// election-day-voting-station.component.ts
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { VotingStationModel } from '../../models/voting-station.model';

@Component({
  selector: 'app-election-day-voting-station',
  templateUrl: './election-day-voting-station.component.html',
  styleUrls: ['./election-day-voting-station.component.css'],
})
export class ElectionDayVotingStationComponent implements OnInit, OnChanges {
  @Input() sgId: string = '';
  @Input() sdName: string = '';
  @Input() wiwName: string = '';
  copied: boolean[] = [];
  stations: VotingStationModel[] = [];
  electionDayVotingStationPageNo: number = 1;
  electionDayVotingStationNumOfRows = 0;
  electionDayVotingStationTotalCount = 0;
  electionDayVotingStationPageList: number[] = [];
  electionDayVotingStationResultMsg: string = '';

  constructor(private dataApiService: DataApiService) {}

  ngOnInit(): void {
    this.fetchElectionDayVotingStations();
  }

  private fetchElectionDayVotingStations(): void {
    this.onElectionDayVotingStationGoToPage(1);
  }

  ngOnChanges() {
    console.log('ElectionDayVotingStationComponent: ' + this.sgId, this.sdName);
    this.fetchElectionDayVotingStations();
  }

  setElectionDayVotingStationPageList() {
    this.electionDayVotingStationPageList = [];
    for (let i = 0; i <= this.electionDayVotingStationTotalCount / this.electionDayVotingStationNumOfRows; i++) {
      this.electionDayVotingStationPageList.push(i + 1);
    }
  }

  onElectionDayVotingStationGoToPage(page: number) {
    this.dataApiService.getElectionDayVotingStationInfo(this.sgId, this.sdName, this.wiwName, page).subscribe(
      (response) => {
        if (response.body != undefined) {
          this.stations = response.body.items.item;
          this.electionDayVotingStationNumOfRows = response.body.numOfRows;
          this.electionDayVotingStationTotalCount = response.body.totalCount;
          this.electionDayVotingStationResultMsg = response.body.resultMsg;
          this.setElectionDayVotingStationPageList();
          console.log(this.stations);
        } else {
          this.stations = [];
          this.electionDayVotingStationNumOfRows = 0;
          this.electionDayVotingStationTotalCount = 0;
          this.electionDayVotingStationResultMsg = 'No data';
          this.setElectionDayVotingStationPageList();
        }
      },
      (error) => {
        console.error('Error fetching election day voting station data:', error);
      },
    );
  }

  copyToClipboard(text: string, index: number): void {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard:', text);
        this.copied[index] = true;
      },
      (err) => {
        console.error('Could not copy text:', err);
      },
    );
  }
}
