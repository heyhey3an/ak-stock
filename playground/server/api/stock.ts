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
  const config = useRuntimeConfig()
  try {
    const authRes = await $fetch<{ access_token: string }>('https://openapivts.koreainvestment.com:29443/oauth2/tokenP', {
      method: 'POST',
      body: {
        grant_type: 'client_credentials',
        appkey: config.kisAppKey,
        appsecret: config.kisAppSecret,
      },
    })

    const accessToken = authRes.access_token

    const stockData = await $fetch<any>('https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-price', {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`,
        'appkey': config.kisAppKey,
        'appsecret': config.kisAppSecret,
        'tr_id': 'FHKST01010100', // 주식 현재가 시세 TR ID
      },
      query: {
        FID_COND_MRKT_DIV_CODE: 'J', // 주식
        FID_INPUT_ISCD: '005930', // 종목코드
      },
    })
  }
  catch {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }

  return {
    success: true,
    name: '삼성전자',
    price: stockData.output.stck_prpr,
    change: stockData.output.prdy_vrss,
  }
})
