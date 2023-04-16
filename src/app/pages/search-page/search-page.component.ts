// search-page.component.ts
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VotingCodeModel} from "../../models/voting-code.model";
import {DataApiService} from "../../services/data-api.service";
import {SearchVotingCodeDto} from "../../dto/search-voting-code.dto";
import {ConstituencyCodeModel} from "../../models/constituency-code.model";
import {SearchConstituencyCodeDto} from "../../dto/search-constituency-code";


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  sgId: string = '';
  sdName: string = '';
  wiwName: string = '';
  isShowEarlyVotingStationInformation: boolean = true;
  isShowElectionDayVotingDayStationInformation: boolean = false;
  @ViewChild('votingCodeElement') votingCodeElement?: ElementRef;
  @ViewChild('constituencyCodeElement') constituencyCodeElement?: ElementRef;
  votingCodes: VotingCodeModel[] = [];
  votingCode: VotingCodeModel = {} as VotingCodeModel
  votingPageNo: number = 1;
  private votingCodeNumOfRows = 0;
  private votingCodeTotalCount= 0;
  votingPageList: number[] = [];
  private votingResultMsg: string = '';

  // variables for constituency codes
  constituencyCodes: ConstituencyCodeModel[] = [];
  constituencyCode: ConstituencyCodeModel = {} as ConstituencyCodeModel
  constituencyPageNo: number = 1;
  private constituencyCodeNumOfRows = 0;
  private constituencyCodeTotalCount = 0;
  constituencyPageList: number[] = [];
  private constituencyResultMsg: string | undefined = '';
  constructor(private dataApiService: DataApiService) {}

  ngOnInit(): void {}

  onSearch(event: Event) {
    event.preventDefault();
    this.onConstituencyChange(event);
  }

  onVotingCodeLoad(event: Event) {
    event.preventDefault();
    this.onVotingCodeGoToPage(1);
  }

  setVotingCodePageList(){
    this.votingPageList = [];
    for(let i = 0; i <= this.votingCodeTotalCount / this.votingCodeNumOfRows; i++){
      this.votingPageList.push(i + 1);
    }
  }

  onVotingCodeGoToPage(page: number) {
    this.votingPageNo = page;
    const params: SearchVotingCodeDto = {
      pageNo: this.votingPageNo,
      numOfRows: 200,
    };
    // console.log((event.target as Element).id);
    this.dataApiService.getCommonSgCodeList(params).subscribe(
      (response) => {
        if(response.header != undefined) {
          this.votingResultMsg = response.body.resultMsg;
          this.votingCodes = (response.body.items.item).reverse();
          this.votingCodeNumOfRows = response.body.numOfRows;
          this.votingCodeTotalCount = response.body.totalCount;
          this.setVotingCodePageList();
          console.log(response);
        }else{
          this.votingResultMsg = '';
          this.votingCodes = [];
          this.votingCodeNumOfRows = 0;
          this.votingCodeTotalCount = 0;
          this.setVotingCodePageList();
        }

      },
      (error) => {
        console.error('Error fetching voting code data:', error);
      },
    );
  }
  onVotingChange($event: Event) {
    this.onConstituencyCodeLoad()
    console.log('onVotingChange', $event);
  }

//---------- constituency-code
  onConstituencyCodeLoad() {
    console.log(this.votingCodeElement?.nativeElement.value);
    this.onConstituencyCodeGoToPage(1);
  }

  setConstituencyCodePageList() {
    this.constituencyPageList = [];
    for (let i = 0; i <= this.constituencyCodeTotalCount / this.constituencyCodeNumOfRows; i++) {
      this.constituencyPageList.push(i + 1);
    }
  }

  onConstituencyCodeGoToPage(page: number) {
    let {sgId, sgTypecode} = this.getSgIdAndSgTypecode(this.votingCodeElement?.nativeElement.value);
    this.constituencyPageNo = page;
    const params: SearchConstituencyCodeDto = {
      sgId: sgId,
      sgTypecode: sgTypecode,
      pageNo: this.constituencyPageNo,
      numOfRows: 100,
    };

    this.dataApiService.getConstituencyCodeList(params).subscribe(
      (response) => {
        if(response.header != undefined) {
          this.constituencyResultMsg = response.header.resultMsg;
          this.constituencyCodes = Array.isArray(response.body.items.item) ? response.body.items.item : [response.body.items.item];
          this.constituencyCodeNumOfRows = response.body.numOfRows;
          this.constituencyCodeTotalCount = response.body.totalCount;
          this.setConstituencyCodePageList();
        }else{
          this.constituencyResultMsg = '';
          this.constituencyCodes = [];
          this.constituencyCodeNumOfRows = 0;
          this.constituencyCodeTotalCount = 0;
          this.setConstituencyCodePageList();
        }
        console.log(response);
      },
      (error) => {
        console.error('Error fetching constituency code data:', error);
      },
    );
  }

  private getSgIdAndSgTypecode(value: string) {
    const splitValue = value.split('|');
    let sgId = splitValue[0];
    let sgTypecode = splitValue[1];
    return {sgId, sgTypecode}
  }

  onConstituencyChange($event: Event) {
    console.log('onConstituencyChange', $event);
    const select = this.constituencyCodeElement?.nativeElement;
    let { sgId, sdName , wiwName} =
      this.getSgIdAndSdNameAndWiwName(this.constituencyCodeElement?.nativeElement.value, select.options[select.selectedIndex].text);
    console.log(sgId, sdName, wiwName);
    this.sgId = sgId;
    this.sdName = sdName;
    this.wiwName = wiwName;
  }

  private getSgIdAndSdNameAndWiwName(value: string, text: string) {
    const splitValue = text.split('_');
    let sgId = value;
    let sdName = splitValue[0];
    let wiwName = splitValue[1];
    return {sgId, sdName, wiwName}
  }

  getDisplayValue(value: any): string {
    return typeof value === 'object' ? '-' : value;
  }

  onSelectClick(event: Event) {
    if (this.votingCodes.length === 0) {
      this.onVotingCodeLoad(event);
    }
  }
}
