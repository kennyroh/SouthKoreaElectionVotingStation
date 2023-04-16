// Filename: voting-code.model.ts
export interface VotingCodeModel {
  resultCode: string; // 결과코드
  resultMsg: string; // 결과메시지
  numOfRows: number; // 한 페이지 결과 수
  pageNo: number; // 페이지 번호
  totalCount: number; // 전체 결과 수
  sgId: string; // 선거ID
  sgTypecode: string; // 선거종류코드
  sgName: string; // 선거명
  sgVotedate: string; // 선거일자
  num: number; // 결과순서
}

