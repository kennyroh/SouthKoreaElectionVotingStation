// Filename: search-early-voting-station.dto.ts
export class SearchVotingStationDto {
  ServiceKey?: string; // 서비스키 (필수)
  pageNo?: number; // 페이지 번호 (옵션)
  numOfRows?: number; // 한 페이지 결과 수 (옵션)
  sgId?: string; // 선거ID (필수)
  sdName?: string; // 시도명 (필수)
  wiwName?: string; // 위원회명 (옵션)
}

