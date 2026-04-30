<template>
  <div>
    <h2>추천 주식 종목</h2>

    <div v-if="pending">
      로딩 중입니다...
    </div>

    <div
      v-else-if="error"
      class="text-red-500"
    >
      데이터를 불러오는 중 에러가 발생했습니다.
    </div>

    <ul v-else-if="data && data.success">
      <li
        v-for="stock in data.data"
        :key="stock.symbol"
        class="py-2"
      >
        <strong>{{ stock.symbol }}</strong> - {{ stock.name }}:
        {{ stock.price.toLocaleString() }} {{ stock.currency }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { stockService } from '~/services/stock'

// Nuxt 3의 useFetch와 TypeScript를 결합한 방식
const { data, pending, error } = await useAsyncData('stockData', () =>
  stockService.getRecommendStocks(),
)
</script>
