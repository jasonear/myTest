<template>
  <aside class="w-72 bg-dark-900 border-l border-dark-600 flex flex-col">
    <div class="p-4 border-b border-dark-600">
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="搜索"
          class="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors pr-10"
        />
        <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto">
      <div v-for="library in libraries" :key="library.title" class="p-4 border-b border-dark-600">
        <div class="flex items-center space-x-2 mb-3">
          <component :is="library.icon" class="w-4 h-4 text-primary" />
          <span class="text-sm font-medium text-white">{{ library.title }}</span>
        </div>
        <div class="space-y-2">
          <div 
            v-for="item in library.items" 
            :key="item.id"
            class="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-700 cursor-pointer transition-colors"
          >
            <svg class="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-xs text-gray-400 truncate">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="p-4 border-t border-dark-600">
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span>10:10</span>
        <span>2025/8/5</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, markRaw } from 'vue'

const searchQuery = ref('')

const libraries = ref([
  {
    title: '政策法规库',
    icon: markRaw(() => ({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>' })),
    items: [
      { id: 1, name: '政策文件名称政策文件名称政策文件名称...' },
      { id: 2, name: '政策文件名称政策文件名称政策文件名称...' },
      { id: 3, name: '政策文件名称政策文件名称政策文件名称...' },
      { id: 4, name: '政策文件名称政策文件名称政策文件名称...' },
      { id: 5, name: '政策文件名称政策文件名称政策文件名称...' },
      { id: 6, name: '政策文件名称政策文件名称政策文件名称...' },
    ]
  },
  {
    title: '项目案例库',
    icon: markRaw(() => ({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>' })),
    items: [
      { id: 1, name: '项目案例项目案例项目案例文件名称...' },
      { id: 2, name: '项目案例项目案例项目案例文件名称...' },
      { id: 3, name: '项目案例项目案例项目案例文件名称...' },
      { id: 4, name: '项目案例项目案例项目案例文件名称...' },
      { id: 5, name: '项目案例项目案例项目案例文件名称...' },
      { id: 6, name: '项目案例项目案例项目案例项目案例文件名称...' },
    ]
  },
  {
    title: '工程技术库',
    icon: markRaw(() => ({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>' })),
    items: [
      { id: 1, name: '工程技术工程技术工程技术文件名称...' },
      { id: 2, name: '工程技术工程技术工程技术文件名称...' },
      { id: 3, name: '工程技术工程技术工程技术文件名称...' },
      { id: 4, name: '工程技术工程技术工程技术文件名称...' },
      { id: 5, name: '工程技术工程技术工程技术文件名称...' },
      { id: 6, name: '工程技术工程技术工程技术工程技术文件名称...' },
    ]
  },
  {
    title: '专家档案库',
    icon: markRaw(() => ({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' })),
    items: [
      { id: 1, name: '专家档案专家档案专家档案文件名称...' },
      { id: 2, name: '专家档案专家档案专家档案文件名称...' },
      { id: 3, name: '专家档案专家档案专家档案文件名称...' },
      { id: 4, name: '专家档案专家档案专家档案文件名称...' },
      { id: 5, name: '专家档案专家档案专家档案文件名称...' },
      { id: 6, name: '专家档案专家档案专家档案文件名称...' },
    ]
  }
])
</script>
