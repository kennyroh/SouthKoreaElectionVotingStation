// early-voting-station.component.ts
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import {VotingStationModel} from "../../models/voting-station.model";


@Component({
  selector: 'app-early-voting-station',
  templateUrl: './early-voting-station.component.html',
  styleUrls: ['./early-voting-station.component.css'],
})
export class EarlyVotingStationComponent implements OnInit, OnChanges {
  @Input() sgId: string = '';
  @Input() sdName: string = '';
  @Input() wiwName: string = '';
  copied: boolean[] = [];
  stations: VotingStationModel[] = [];
  earlyVotingStationPageNo: number = 1;
  earlyVotingStationNumOfRows = 0;
  earlyVotingStationTotalCount = 0;
  earlyVotingStationPageList: number[] = [];
  earlyVotingStationResultMsg: string = '';


  constructor(private dataApiService: DataApiService) {}

  ngOnInit(): void {
    this.fetchEarlyVotingStations();
  }

  private fetchEarlyVotingStations(): void {
    this.onEarlyVotingStationGoToPage(1);
  }
  ngOnChanges() {
    console.log('EarlyVotingStationComponent: ' + this.sgId, this.sdName);
    this.fetchEarlyVotingStations();
  }
  setEarlyVotingStationPageList(){
    this.earlyVotingStationPageList = [];
    for(let i = 0; i <= this.earlyVotingStationTotalCount / this.earlyVotingStationNumOfRows; i++){
      this.earlyVotingStationPageList.push(i + 1);
    }
  }

  onEarlyVotingStationGoToPage(page: number) {
    this.dataApiService.getEarlyVotingStationInfo(this.sgId, this.sdName, this.wiwName, page).subscribe(
      (response) => {
        if(response.body != undefined) {
          this.stations = response.body.items.item;
          this.earlyVotingStationNumOfRows = response.body.numOfRows;
          this.earlyVotingStationTotalCount = response.body.totalCount;
          this.earlyVotingStationResultMsg = response.body.resultMsg;
          this.setEarlyVotingStationPageList();
          console.log(this.stations)
        }else{
          this.stations = [];
          this.earlyVotingStationNumOfRows = 0;
          this.earlyVotingStationTotalCount = 0;
          this.earlyVotingStationResultMsg = 'No data';
          this.setEarlyVotingStationPageList();
        }
      },
      (error) => {
        console.error('Error fetching early voting station data:', error);
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
      }
    );
  }
}
