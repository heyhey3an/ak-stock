// services/stockService.ts
import type { StockApiResponse } from '~/server/api/stock'

export const stockService = {
  // 추천 주식 데이터를 가져오는 비동기 함수
  async getRecommendStocks(): Promise<StockApiResponse> {
    return await $fetch<StockApiResponse>('/api/stocks')
  },
}
