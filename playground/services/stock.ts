// services/stockService.ts
export interface StockSummary {
  success: boolean
  name: string
  price: string
  change: string
}

export const stockService = {
  async getStockPrice(): Promise<StockSummary> {
    return await $fetch<StockSummary>('/api/stocks')
  },
}
