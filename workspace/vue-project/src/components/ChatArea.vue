<template>
  <main class="flex-1 flex flex-col bg-dark-900">
    <div class="flex-1 overflow-y-auto px-8 py-6">
      <div v-if="messages.length === 0" class="h-full flex flex-col justify-center">
        <div class="max-w-2xl mx-auto">
          <div class="bg-dark-800 rounded-xl p-6 border border-primary/30">
            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">你好，</h3>
                <p class="text-gray-300 text-sm">欢迎来到"全域土地整治智能问答"</p>
                <p class="text-gray-400 text-sm mt-2">该智能体包括全域土地整治政策、技术文件、项目案例、专家档案等专业知识，xxxxxxxxxxxxxxxxxxxxx</p>
              </div>
            </div>
          </div>
          
          <div class="mt-4 flex items-center space-x-2">
            <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm text-gray-400">示例问题：全域土地整治的流程是什么？</span>
          </div>
        </div>
      </div>
      
      <div v-else class="space-y-6">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="[
            'flex',
            message.type === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div 
            :class="[
              'max-w-3xl p-4 rounded-xl',
              message.type === 'user' 
                ? 'bg-primary text-white' 
                : 'bg-dark-800 border border-dark-600'
            ]"
          >
            <p class="text-sm">{{ message.content }}</p>
          </div>
        </div>
        
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-dark-800 rounded-xl p-4">
            <div class="flex space-x-2">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
        
        <div v-if="hasAnswer" class="bg-dark-800 rounded-xl p-6 border border-dark-600">
          <div class="flex items-center space-x-2 mb-4">
            <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm text-gray-300">{{ answer.question }}</span>
          </div>
          <div class="prose prose-invert max-w-none">
            <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ answer.intro }}</p>
            <div v-for="(stage, idx) in answer.stages" :key="idx" class="mb-4">
              <div class="flex items-center space-x-2 mb-2">
                <component :is="getStageIcon(idx)" class="w-4 h-4 text-primary" />
                <span class="font-medium text-white">{{ stage.title }}</span>
              </div>
              <p class="text-gray-400 text-sm pl-6 leading-relaxed">{{ stage.content }}</p>
            </div>
          </div>
          <div class="flex items-center justify-end space-x-4 mt-4 pt-4 border-t border-dark-600">
            <button class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button class="text-gray-400 hover:text-yellow-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <button class="text-gray-400 hover:text-red-400 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="p-4 border-t border-dark-600 bg-dark-800">
      <div class="max-w-5xl mx-auto">
        <div class="relative">
          <textarea 
            v-model="inputMessage"
            @keydown.enter.exact.prevent="sendMessage"
            placeholder="请输入您的问题..."
            class="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary transition-colors"
            rows="2"
          ></textarea>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center space-x-3">
              <button 
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedModel === 'reasoning' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                ]"
                @click="selectedModel = 'reasoning'"
              >
                <span class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>推理模型</span>
                </span>
              </button>
              <button 
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedModel === 'non-reasoning' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                ]"
                @click="selectedModel = 'non-reasoning'"
              >
                <span class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>非推理模型</span>
                </span>
              </button>
            </div>
            <button 
              @click="sendMessage"
              class="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, markRaw } from 'vue'

const inputMessage = ref('')
const messages = ref([])
const isTyping = ref(false)
const hasAnswer = ref(false)
const selectedModel = ref('reasoning')

const answer = ref({
  question: '全域土地整治的流程是什么？',
  intro: '以下是各阶段的具体内容和关键要点：',
  stages: [
    {
      title: '第一阶段：前期谋划与选址申报',
      content: '这是项目的起点，核心是科学选址，确保项目具备实施基础。由县级人民政府组织，综合考虑区域的资源条件、群众意愿和发展需求。实施单元通常以一个乡镇为基本单位，但条件成熟的地方也可以探索跨乡镇整治。在此阶段，需要编制达到预可研深度的项目选址建议书，并逐级上报，通过市级审核和省级审查后，才能纳入省级项目储备库。一个关键的创新点是"产业导入和运营前置"，即在谋划阶段就要论证未来的产业方向，确保整治工作有持续的经济动力。'
    },
    {
      title: '第二阶段：实施方案编制与审批',
      content: '这是项目的设计蓝图阶段，决定了整治的方向和具体内容。实施方案必须以国土空间规划为依据，明确整治目标、子项目清单、资金预算和时间安排，并需达到可行性研究的深度。这个过程强调"自下而上"的民意基础，方案必须广泛征求村民意见，并经农村集体经济组织或村民委员会同意。随后，方案需通过县级初审、市级论证，最终报省级自然资源主管部门审查批复。如果涉及永久基本农田调整（调整规模通常不超过所涉乡镇的5%）、城镇开发边界优化等，还需要编制专项方案一并报批。同时，所有项目都需对照负面清单进行严格审查，确保不违背农民意愿、不破坏生态和历史风貌。'
    },
    {
      title: '第三阶段：组织实施',
      content: '这是项目从蓝图走向现实的施工阶段。县级人民政府是实施的责任主体，负责统筹推进各项子项目。各类子项目（如农田整治、生态修复、道路建设等）由相应的行业主管部门归口管理，依法依规履行立项、招投标等程序。'
    }
  ]
})

const getStageIcon = (index) => {
  const icons = [
    markRaw(() => ({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>' })),
    markRaw(() => ({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>' })),
    markRaw(() => ({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' }))
  ]
  return icons[index]
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  messages.value.push({
    type: 'user',
    content: inputMessage.value.trim()
  })
  
  inputMessage.value = ''
  isTyping.value = true
  
  setTimeout(() => {
    isTyping.value = false
    hasAnswer.value = true
  }, 1500)
}
</script>
