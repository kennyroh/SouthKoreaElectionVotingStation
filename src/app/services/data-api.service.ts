// Filename: src/app/services/data-api.service.ts
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {parseXML} from '../utils/xml-parser';
import {SearchVotingStationDto} from '../dto/search-voting-station.dto';
import {environment} from '../../environments/environment';
import {SearchVotingCodeDto} from '../dto/search-voting-code.dto';
import {SearchConstituencyCodeDto} from "../dto/search-constituency-code";

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private baseUrl = 'http://apis.data.go.kr/9760000/PolplcInfoInqireService2';
  private commonCodeBaseUrl = 'http://apis.data.go.kr/9760000/CommonCodeService';
  private serviceKey: string = environment.serviceKey;

  constructor(private http: HttpClient) {}

  public getEarlyVotingStationInfo(sgId: string, sdName: string, wiwName: string, pageNo: number) {
    const params: SearchVotingStationDto = {
      ServiceKey: this.serviceKey,
      sgId: sgId,
      numOfRows: 20,
      sdName: sdName,
      wiwName: wiwName,
      pageNo: pageNo,
    };
    const url = `${this.baseUrl}/getPrePolplcOtlnmapTrnsportInfoInqire?ServiceKey=${params.ServiceKey}&sgId=${params.sgId}&sdName=${encodeURIComponent(params.sdName || '')}&wiwName=${encodeURIComponent(params.wiwName || '')}&pageNo=${params.pageNo}&numOfRows=${params.numOfRows}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response) => parseXML(response)),
    );
  }

  public getElectionDayVotingStationInfo(sgId: string, sdName: string, wiwName: string, pageNo: number) {
    const params: SearchVotingStationDto = {
      ServiceKey: this.serviceKey,
      sgId: sgId,
      numOfRows: 20,
      sdName: sdName,
      wiwName: wiwName,
      pageNo: pageNo,
    };
    const url = `${this.baseUrl}/getPolplcOtlnmapTrnsportInfoInqire?ServiceKey=${params.ServiceKey}&sgId=${params.sgId}&sdName=${encodeURIComponent(params.sdName || '')}&wiwName=${encodeURIComponent(params.wiwName || '')}&pageNo=${params.pageNo}&numOfRows=${params.numOfRows}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response) => parseXML(response)),
    );
  }

  public getCommonSgCodeList(params: SearchVotingCodeDto) {
    params.ServiceKey = this.serviceKey;
    const url = `${this.commonCodeBaseUrl}/getCommonSgCodeList?ServiceKey=${params.ServiceKey}&pageNo=${params.pageNo || ''}&numOfRows=${params.numOfRows || ''}`;
    return this.http.get(url, { responseType: 'text' }).pipe(map((response) => {
      // console.log(result);
      return parseXML(response);
    }));
  }

  public getConstituencyCodeList(params: SearchConstituencyCodeDto) {
    params.ServiceKey = this.serviceKey;
    const url = `${this.commonCodeBaseUrl}/getCommonSggCodeList?ServiceKey=${params.ServiceKey}&sgId=${params.sgId}&sgTypecode=${params.sgTypecode}&pageNo=${params.pageNo || ''}&numOfRows=${params.numOfRows || ''}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response) => parseXML(response)),
    );
  }
}
