// server/api/stocks.ts
import { defineEventHandler, createError } from 'h3'

// 1. 타입 정의
export interface StockItem {
  shrn_iscd: string // 종목코드
  hts_kor_isnm: string // 종목명
  stck_prpr: string // 현재가
  prdy_vrss: string // 전일대비
}

export default defineEventHandler(async () => {

})
