// server/api/stocks.ts

// 1. 사용할 데이터의 타입 정의
export interface Stock {
  symbol: string
  name: string
  price: number
  currency: string
}

export interface StockApiResponse {
  success: boolean
  data: Stock[]
}

export default defineEventHandler(async (event): Promise<StockApiResponse> => {
  // .env에 저장된 API 키를 가져옵니다.
  const config = useRuntimeConfig()
  const apiKey = config.public.alphaVantageApiKey

  try {
    // 실제 외부 API 호출 (예: Alpha Vantage 등)
    // const response = await $fetch(`https://www.alphavantage.co/query?function=...&apikey=${apiKey}`);

    // 예시 목업 데이터 (실제 API 연동 시 위 주석을 활용하세요)
    return {
      success: true,
      data: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 170.5, currency: 'USD' },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 210.2, currency: 'USD' },
        { symbol: '005930', name: '삼성전자', price: 72000, currency: 'KRW' },
      ],
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stock data',
    })
  }
})
