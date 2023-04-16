// Filename: voting-station.model.ts
export interface VotingStationModel {
  resultCode: string; // 결과코드
  resultMsg: string; // 결과메시지
  numOfRows: number; // 한 페이지 결과 수
  pageNo: number; // 페이지 번호
  totalCount: number; // 전체 결과 수
  sgId?: string; // 선거ID
  evPsName?: string; // 사전투표소명
  sdName?: string; // 시도명
  wiwName?: string; // 위원회명
  emdName?: string; // 읍면동명
  evOrder?: number; // 순서
  placeName?: string; // 건물명
  addr?: string; // 주소
  floor?: string; // 층
  num?: number; // 결과순서
}

