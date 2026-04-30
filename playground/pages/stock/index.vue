<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">
      국내 주식 추천 서비스 여기까지..오늘은
    </h1>

    <div
      v-if="pending"
      class="animate-pulse"
    >
      데이터 로딩 중...
    </div>

    <div
      v-else-if="data"
      class="border p-4 rounded-lg shadow-sm w-64"
    >
      <h2 class="text-lg font-semibold">
        {{ data.name }}
      </h2>
      <p class="text-3xl font-mono my-2">
        {{ Number(data.price).toLocaleString() }}원
      </p>
      <p :class="Number(data.change) > 0 ? 'text-red-500' : 'text-blue-500'">
        전일대비: {{ data.change }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { stockService } from '~/services/stock'

const { data, pending } = await useAsyncData('currentStock', () =>
  stockService.getStockPrice(),
)
</script>
