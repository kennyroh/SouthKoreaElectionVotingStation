// Filename: constituency-code.model.ts
export interface ConstituencyCodeModel {
  resultCode: string; // 결과코드
  resultMsg: string; // 결과메시지
  numOfRows: number; // 한 페이지 결과 수
  pageNo: number; // 페이지 번호
  totalCount: number; // 전체 결과 수
  sgId: string; // 선거ID
  sgTypecode: string; // 선거종류
  sggName: string; // 선거구명
  sdName?: string; // 시도명 (옵션)
  wiwName?: string; // 구시군명 (옵션)
  sggJungsu: string; // 선출정소
  sOrder: number; // 순서
  num: number; // 결과순서
}
