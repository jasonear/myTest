import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const sessions = ref([
    { id: 1, question: '全域土地整治的流程是什么？', time: '2025-12-31 15:05:06' },
    { id: 2, question: '全域土地整治政策有哪些？', time: '2025-12-31 15:05:06' },
    { id: 3, question: '全域土地整治工作的重点内容是什么？', time: '2025-12-31 15:05:06' },
  ])
  const isTyping = ref(false)
  const hasAnswer = ref(false)
  const selectedModel = ref('reasoning')

  const answer = ref({
    question: '全域土地整治的流程是什么？',
    intro: '以下是各阶段的具体内容和关键要点：',
    stages: [
      {
        title: '第一阶段：前期谋划与选址申报',
        content: '这是项目的起点，核心是科学选址，确保项目具备实施基础。由县级人民政府组织，综合考虑区域的资源条件、群众意愿和发展需求。'
      },
      {
        title: '第二阶段：实施方案编制与审批',
        content: '这是项目的设计蓝图阶段，决定了整治的方向和具体内容。实施方案必须以国土空间规划为依据，明确整治目标、子项目清单、资金预算和时间安排。'
      },
      {
        title: '第三阶段：组织实施',
        content: '这是项目从蓝图走向现实的施工阶段。县级人民政府是实施的责任主体，负责统筹推进各项子项目。'
      }
    ]
  })

  const addMessage = (content) => {
    messages.value.push({
      type: 'user',
      content: content
    })
  }

  const sendMessage = (content) => {
    if (!content.trim()) return
    
    addMessage(content)
    isTyping.value = true
    
    setTimeout(() => {
      isTyping.value = false
      hasAnswer.value = true
    }, 1500)
  }

  const clearMessages = () => {
    messages.value = []
    hasAnswer.value = false
    isTyping.value = false
  }

  const setModel = (model) => {
    selectedModel.value = model
  }

  return {
    messages,
    sessions,
    isTyping,
    hasAnswer,
    selectedModel,
    answer,
    addMessage,
    sendMessage,
    clearMessages,
    setModel
  }
})
