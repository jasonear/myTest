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
            <p class="session-title">实施评估会话 {{ i }}</p>
          </el-card>
        </div>
      </el-aside>
      
      <el-main class="main-content">
        <el-card class="welcome-card">
          <div class="welcome-content">
            <el-avatar :size="60" class="welcome-icon">
              <el-icon :size="30"><DataLine /></el-icon>
            </el-avatar>
            <div class="welcome-text">
              <h2>实施评估</h2>
              <p>全面的项目实施效果评估，跟踪整治成效和社会经济效益</p>
            </div>
          </div>
        </el-card>
        
        <el-row :gutter="16" class="stats-row">
          <el-col :span="6">
            <el-card class="stat-card">
              <el-icon :size="32" color="#409EFF"><Odometer /></el-icon>
              <div class="stat-value">95.8%</div>
              <div class="stat-label">完成率</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <el-icon :size="32" color="#67C23A"><Money /></el-icon>
              <div class="stat-value">¥2.5亿</div>
              <div class="stat-label">投资总额</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <el-icon :size="32" color="#E6A23C"><User /></el-icon>
              <div class="stat-value">12.5万</div>
              <div class="stat-label">受益人口</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <el-icon :size="32" color="#F56C6C"><PieChart /></el-icon>
              <div class="stat-value">3.2万亩</div>
              <div class="stat-label">整治面积</div>
            </el-card>
          </el-col>
        </el-row>
        
        <el-row :gutter="16">
          <el-col :span="12">
            <el-card class="chart-card">
              <template #header>
                <div class="card-header">
                  <el-icon><TrendCharts /></el-icon>
                  <span>实施进度趋势</span>
                </div>
              </template>
              <div class="placeholder-chart">
                <el-icon :size="48"><TrendCharts /></el-icon>
                <p>图表展示区域</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="chart-card">
              <template #header>
                <div class="card-header">
                  <el-icon><Histogram /></el-icon>
                  <span>投资效益分析</span>
                </div>
              </template>
              <div class="placeholder-chart">
                <el-icon :size="48"><Histogram /></el-icon>
                <p>图表展示区域</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, DataLine, Odometer, Money, User, PieChart, TrendCharts, Histogram } from '@element-plus/icons-vue'
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
  margin-bottom: 16px;
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

.stats-row {
  margin-bottom: 16px;
}

.stat-card {
  background: #22262e;
  text-align: center;
  padding: 24px 0;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin: 16px 0 8px;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

.chart-card {
  background: #22262e;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}

.placeholder-chart {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}

.placeholder-chart p {
  margin-top: 12px;
  font-size: 14px;
}
</style>
