<template>
  <aside class="w-72 bg-dark-900 border-r border-dark-600 flex flex-col">
    <button class="m-4 px-4 py-3 bg-dark-700 rounded-lg text-gray-300 hover:bg-dark-600 transition-colors flex items-center space-x-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span class="text-sm">开启新会话</span>
    </button>
    
    <div class="flex-1 overflow-y-auto px-3 pb-4">
      <div class="space-y-2">
        <div 
          v-for="session in sessions" 
          :key="session.id"
          class="group p-3 bg-dark-800 rounded-lg cursor-pointer hover:bg-dark-700 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-500 mb-1">{{ session.time }}</p>
              <p class="text-sm text-gray-300 truncate">{{ session.question }}</p>
            </div>
            <button class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const sessions = ref([
  { id: 1, question: '全域土地整治的流程是什么？', time: '2025-12-31 15:05:06' },
  { id: 2, question: '全域土地整治政策有哪些？', time: '2025-12-31 15:05:06' },
  { id: 3, question: '全域土地整治工作的重点内容是什么？', time: '2025-12-31 15:05:06' },
])
</script>
