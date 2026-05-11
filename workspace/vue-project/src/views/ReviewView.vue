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
            <p class="session-title">审查报备会话 {{ i }}</p>
          </el-card>
        </div>
      </el-aside>
      
      <el-main class="main-content">
        <el-card class="welcome-card">
          <div class="welcome-content">
            <el-avatar :size="60" class="welcome-icon">
              <el-icon :size="30"><Stamp /></el-icon>
            </el-avatar>
            <div class="welcome-text">
              <h2>审查报备</h2>
              <p>在线提交和跟踪审查进度，实时了解项目报备状态</p>
            </div>
          </div>
        </el-card>
        
        <el-card class="review-table-card">
          <template #header>
            <div class="table-header">
              <span>审查列表</span>
              <el-button type="primary" size="small">
                <el-icon class="el-icon--left"><Plus /></el-icon>
                新增报备
              </el-button>
            </div>
          </template>
          <el-table :data="reviewList" stripe style="width: 100%">
            <el-table-column prop="projectName" label="项目名称" />
            <el-table-column prop="submitTime" label="提交时间" width="180" />
            <el-table-column prop="status" label="状态" width="120">
              <template #default="scope">
                <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button link type="primary" size="small">查看</el-button>
                <el-button link type="primary" size="small">编辑</el-button>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        
        <el-card class="progress-card">
          <template #header>
            <div class="card-header">
              <el-icon><Clock /></el-icon>
              <span>审查进度</span>
            </div>
          </template>
          <el-steps :active="2" align-center>
            <el-step title="提交申请" description="2025-01-01" />
            <el-step title="县级初审" description="2025-01-05" />
            <el-step title="市级论证" description="进行中" />
            <el-step title="省级审批" description="等待中" />
          </el-steps>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Stamp, Clock } from '@element-plus/icons-vue'

const reviewList = ref([
  { projectName: '某某县全域土地整治项目', submitTime: '2025-01-01 10:00', status: '审批中' },
  { projectName: '某某市土地整治示范项目', submitTime: '2025-01-02 14:30', status: '已通过' },
  { projectName: '某某区生态修复项目', submitTime: '2025-01-03 09:15', status: '待完善' },
])

const getStatusType = (status) => {
  const typeMap = {
    '审批中': 'warning',
    '已通过': 'success',
    '待完善': 'info'
  }
  return typeMap[status] || ''
}
</script>

<style scoped>
.view-container {
  height: 100%;
  background: #1a1d23;
}

.sidebar {
  background: #1a1d23;
  border-right: 1px solid #333842;
  padding: 16px;
}

.main-content {
  background: #1a1d23;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.review-table-card {
  background: #22262e;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-card {
  background: #22262e;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}
</style>
