<template>
  <el-container class="home-container">
    <el-aside width="288px" class="sidebar">
      <el-button type="primary" class="new-chat-btn">
        <el-icon class="el-icon--left"><Plus /></el-icon>
        开启新会话
      </el-button>
      
      <div class="session-list">
        <div 
          v-for="session in chatStore.sessions" 
          :key="session.id"
          class="session-item"
        >
          <div class="session-info">
            <span class="session-time">{{ session.time }}</span>
            <span class="session-question">{{ session.question }}</span>
          </div>
          <el-icon class="delete-icon"><Delete /></el-icon>
        </div>
      </div>
    </el-aside>
    
    <el-main class="chat-main">
      <div v-if="chatStore.messages.length === 0" class="welcome-container">
        <el-card class="welcome-card">
          <div class="welcome-content">
            <el-avatar :size="40" class="welcome-avatar">
              <el-icon :size="20"><Warning /></el-icon>
            </el-avatar>
            <div class="welcome-text">
              <h3>你好，</h3>
              <p>欢迎来到"全域土地整治智能问答"</p>
              <p class="welcome-desc">该智能体包括全域土地整治政策、技术文件、项目案例、专家档案等专业知识，xxxxxxxxxxxxxxxxxxxxx</p>
            </div>
          </div>
        </el-card>
        
        <div class="example-tip">
          <el-icon class="el-icon--left"><WarningFilled /></el-icon>
          <span>示例问题：全域土地整治的流程是什么？</span>
        </div>
      </div>
      
      <div v-else class="messages-container">
        <div 
          v-for="(message, index) in chatStore.messages" 
          :key="index"
          :class="['message-wrapper', message.type === 'user' ? 'user-message' : 'ai-message']"
        >
          <el-card :class="message.type === 'user' ? 'user-card' : 'ai-card'">
            {{ message.content }}
          </el-card>
        </div>
        
        <div v-if="chatStore.isTyping" class="message-wrapper ai-message">
          <el-card class="ai-card typing-card">
            <div class="typing-indicator">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </el-card>
        </div>
        
        <el-card v-if="chatStore.hasAnswer" class="answer-card">
          <div class="answer-header">
            <el-icon class="el-icon--left"><WarningFilled /></el-icon>
            <span>{{ chatStore.answer.question }}</span>
          </div>
          
          <p class="answer-intro">{{ chatStore.answer.intro }}</p>
          
          <el-timeline>
            <el-timeline-item
              v-for="(stage, index) in chatStore.answer.stages"
              :key="index"
              :icon="stageIcons[index]"
            >
              <h4 class="stage-title">{{ stage.title }}</h4>
              <p class="stage-content">{{ stage.content }}</p>
            </el-timeline-item>
          </el-timeline>
          
          <div class="answer-actions">
            <el-button :icon="Download" circle title="导出"></el-button>
            <el-button :icon="RefreshRight" circle title="重新生成"></el-button>
            <el-button :icon="StarFilled" circle title="收藏"></el-button>
            <el-button :icon="RefreshLeft" circle title="反馈"></el-button>
          </div>
        </el-card>
      </div>
    </el-main>
    
    <el-aside width="288px" class="right-panel">
      <div class="search-box">
        <el-input
          v-model="knowledgeBaseStore.searchQuery"
          placeholder="搜索"
          :prefix-icon="Search"
        />
      </div>
      
      <div class="library-list">
        <div v-for="library in knowledgeBaseStore.libraries" :key="library.title" class="library-section">
          <div class="library-header">
            <el-icon><Document /></el-icon>
            <span>{{ library.title }}</span>
          </div>
          <div class="library-items">
            <div 
              v-for="item in library.items" 
              :key="item.id"
              class="library-item"
            >
              <el-icon class="file-icon"><Document /></el-icon>
              <span class="item-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="time-display">
        <span>{{ currentTime }}</span>
        <span>{{ currentDate }}</span>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useChatStore } from '../stores/chat'
import { useKnowledgeBaseStore } from '../stores/knowledgeBase'
import { Plus, Delete, Warning, WarningFilled, Search, Document, Download, RefreshRight, StarFilled, RefreshLeft, Check, Edit, List } from '@element-plus/icons-vue'

const chatStore = useChatStore()
const knowledgeBaseStore = useKnowledgeBaseStore()

const stageIcons = [Check, Edit, List]

const currentTime = ref('')
const currentDate = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  currentDate.value = now.toLocaleDateString('zh-CN')
}

let timeInterval

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script>

<style scoped>
.home-container {
  height: 100%;
  background: #1a1d23;
}

.sidebar {
  background: #1a1d23;
  border-right: 1px solid #333842;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.new-chat-btn {
  width: 100%;
  margin-bottom: 16px;
}

.session-list {
  flex: 1;
  overflow-y: auto;
}

.session-item {
  background: #22262e;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
}

.session-item:hover {
  background: #2a2f38;
}

.session-item:hover .delete-icon {
  opacity: 1;
}

.session-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.session-time {
  font-size: 12px;
  color: #666;
}

.session-question {
  font-size: 14px;
  color: #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  color: #999;
  cursor: pointer;
  transition: opacity 0.3s;
}

.delete-icon:hover {
  color: #f56c6c;
}

.chat-main {
  background: #1a1d23;
  padding: 24px 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.welcome-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 672px;
  margin: 0 auto;
  width: 100%;
}

.welcome-card {
  background: #22262e;
  border: 1px solid rgba(0, 212, 255, 0.3);
}

.welcome-content {
  display: flex;
  gap: 12px;
}

.welcome-avatar {
  background: rgba(0, 212, 255, 0.2);
  flex-shrink: 0;
}

.welcome-text h3 {
  margin: 0 0 8px 0;
  color: #fff;
  font-size: 18px;
}

.welcome-text p {
  margin: 0;
  color: #ccc;
  font-size: 14px;
}

.welcome-desc {
  margin-top: 8px !important;
  color: #999 !important;
}

.example-tip {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999;
  font-size: 14px;
}

.messages-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-wrapper {
  display: flex;
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

.user-card {
  max-width: 576px;
  background: #00d4ff;
  color: #fff;
}

.ai-card {
  max-width: 576px;
  background: #22262e;
}

.typing-card {
  background: #22262e;
}

.typing-indicator {
  display: flex;
  gap: 6px;
  justify-content: center;
  padding: 8px;
}

.typing-indicator .dot {
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.answer-card {
  background: #22262e;
  margin-top: 16px;
}

.answer-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #ccc;
  font-size: 14px;
}

.answer-intro {
  color: #ccc;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.stage-title {
  color: #fff;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.stage-content {
  color: #999;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.answer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #333842;
}

.right-panel {
  background: #1a1d23;
  border-left: 1px solid #333842;
  display: flex;
  flex-direction: column;
}

.search-box {
  padding: 16px;
  border-bottom: 1px solid #333842;
}

.library-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.library-section {
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #333842;
}

.library-section:last-child {
  border-bottom: none;
}

.library-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.library-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.library-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.library-item:hover {
  background: #2a2f38;
}

.file-icon {
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
}

.item-name {
  font-size: 12px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time-display {
  padding: 16px;
  border-top: 1px solid #333842;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}
</style>
