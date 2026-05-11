<template>
  <div class="view-container">
    <el-container>
      <el-aside width="288px" class="sidebar">
        <el-button type="primary" class="new-chat-btn">
          <el-icon class="el-icon--left"><Plus /></el-icon>
          开启新会话
        </el-button>
        <div class="session-list">
          <el-card v-for="i in 3" :key="i" class="session-card">
            <p class="session-time">2025-12-31 15:05:06</p>
            <p class="session-title">调研沙盘会话 {{ i }}</p>
          </el-card>
        </div>
      </el-aside>
      
      <el-main class="main-content">
        <el-card class="welcome-card">
          <div class="welcome-content">
            <el-avatar :size="60" class="welcome-icon">
              <el-icon :size="30"><Location /></el-icon>
            </el-avatar>
            <div class="welcome-text">
              <h2>调研沙盘</h2>
              <p>基于GIS技术的可视化调研工具，支持地块分析、人口分布、交通网络等功能</p>
            </div>
          </div>
        </el-card>
        
        <div class="tools-grid">
          <el-card v-for="tool in tools" :key="tool.name" class="tool-card">
            <el-icon :size="40" :color="tool.color"><component :is="tool.icon" /></el-icon>
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.desc }}</p>
          </el-card>
        </div>
      </el-main>
      
      <el-aside width="288px" class="right-panel">
        <div class="panel-header">
          <span>图层控制</span>
        </div>
        <el-tree :data="layers" default-expand-all />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Location, MapLocation, DataLine, House, Road } from '@element-plus/icons-vue'

const tools = ref([
  { name: '地块分析', desc: '查看地块详细信息', icon: 'Location', color: '#409EFF' },
  { name: '人口分布', desc: '查看人口热力图', icon: 'DataLine', color: '#67C23A' },
  { name: '建筑分布', desc: '查看建筑分布', icon: 'House', color: '#E6A23C' },
  { name: '交通网络', desc: '查看交通路线', icon: 'Road', color: '#F56C6C' },
])

const layers = ref([
  { label: '基础图层', children: [{ label: '行政区划' }, { label: '道路网络' }] },
  { label: '业务图层', children: [{ label: '整治单元' }, { label: '项目范围' }] },
])
</script>

<style scoped>
.view-container {
  height: 100%;
  background: #1a1d23;
}

.sidebar, .right-panel {
  background: #1a1d23;
  border-right: 1px solid #333842;
  padding: 16px;
}

.main-content {
  background: #1a1d23;
  padding: 24px;
}

.new-chat-btn {
  width: 100%;
  margin-bottom: 16px;
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.session-card {
  background: #22262e;
  cursor: pointer;
}

.session-time {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
}

.session-title {
  font-size: 14px;
  color: #ccc;
  margin: 0;
}

.welcome-card {
  background: #22262e;
  margin-bottom: 24px;
}

.welcome-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-icon {
  background: rgba(0, 212, 255, 0.2);
}

.welcome-text h2 {
  margin: 0 0 8px 0;
  color: #fff;
}

.welcome-text p {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.tool-card {
  background: #22262e;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.tool-card:hover {
  transform: translateY(-4px);
}

.tool-card h3 {
  margin: 16px 0 8px;
  color: #fff;
  font-size: 16px;
}

.tool-card p {
  margin: 0;
  color: #999;
  font-size: 12px;
}

.panel-header {
  padding: 12px;
  background: #22262e;
  border-radius: 8px;
  margin-bottom: 16px;
  color: #fff;
  font-size: 14px;
  text-align: center;
}
</style>
