<template>
  <header class="h-16 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-6">
    <div class="flex items-center space-x-8">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="text-xl font-bold text-white">全域土地整治</span>
      </div>
      
      <nav class="flex items-center space-x-1">
        <button 
          v-for="item in navItems" 
          :key="item.name"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeNav === item.name 
              ? 'bg-dark-700 text-primary border-b-2 border-primary' 
              : 'text-gray-400 hover:text-white hover:bg-dark-700'
          ]"
          @click="activeNav = item.name"
        >
          <span class="flex items-center space-x-2">
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.name }}</span>
          </span>
        </button>
      </nav>
    </div>
    
    <div class="flex items-center space-x-6">
      <button class="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-sm">用户名</span>
      </button>
      <button class="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="text-sm">退出</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, markRaw } from 'vue'

const activeNav = ref('智能问答')

const navItems = [
  { name: '智能问答', icon: markRaw(() => import('vue').then(m => m.SvgIcon)) },
  { name: '调研沙盘', icon: markRaw(() => import('vue').then(m => m.SvgIcon)) },
  { name: '方案编制', icon: markRaw(() => import('vue').then(m => m.SvgIcon)) },
  { name: '审查报备', icon: markRaw(() => import('vue').then(m => m.SvgIcon)) },
  { name: '实施评估', icon: markRaw(() => import('vue').then(m => m.SvgIcon)) },
]
</script>
