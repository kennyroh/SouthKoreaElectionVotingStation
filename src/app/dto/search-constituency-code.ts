// Filename: search-constituency-code.dto.ts
export class SearchConstituencyCodeDto {
  ServiceKey?: string; // 서비스키 (필수)
  pageNo?: number; // 페이지 번호 (옵션)
  numOfRows?: number; // 한 페이지 결과 수 (옵션)
  sgId?: string; // 선거ID (필수)
  sgTypecode?: string; // 선거종류코드 (필수)
}

