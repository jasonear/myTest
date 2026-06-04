# SSCMS 表名问题解决指南

## 问题概述

您遇到的错误是：`42P01: 关系 "siteserver_administrator" 不存在`

这是因为 **SSCMS 7.0+ 版本对数据库表名进行了重构**，旧版本使用 `siteserver_` 前缀，新版本使用不同的表名结构。

---

## 快速解决方案

### 方案一：使用正确的表名（推荐）

在 SSCMS 7.0+ 中，管理员表通常叫：

```html
<!-- 尝试这些可能的表名 -->
<!-- 1. 首选：sscms_Administrator -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT * FROM sscms_Administrator
    </stl:queryString>
    <stl:each>
      用户：<stl:sqlContent type="UserName"><br>
    </stl:each>
  </stl:sqlContents>
</stl:dynamic>

<!-- 2. 备选：Administrator（不带前缀） -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT * FROM Administrator
    </stl:queryString>
    <stl:each>
      用户：<stl:sqlContent type="UserName"><br>
    </stl:each>
  </stl:sqlContents>
</stl:dynamic>
```

### 方案二：查询所有表，找出正确表名

首先查看数据库中有哪些表：

```html
<!-- 适用于 PostgreSQL -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    </stl:queryString>
    <table>
      <tr><th>序号</th><th>表名</th></tr>
      <stl:each>
        <tr>
          <td><stl:sqlContent type="__i__"></td>
          <td><stl:sqlContent type="tablename"></td>
        </tr>
      </stl:each>
    </table>
  </stl:sqlContents>
</stl:dynamic>

<!-- 适用于 MySQL -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SHOW TABLES
    </stl:queryString>
    <table>
      <tr><th>序号</th><th>表名</th></tr>
      <stl:each>
        <tr>
          <td><stl:sqlContent type="__i__"></td>
          <td><stl:sqlContent type="0"></td>
        </tr>
      </stl:each>
    </table>
  </stl:sqlContents>
</stl:dynamic>
```

### 方案三：使用 STL 内置标签（最推荐）

如果只是要显示管理员信息，**不要直接查询表**，使用 STL 标签：

```html
<!-- 获取当前管理员信息 -->
<stl:if testType="IsAdminLogined">
  <stl:yes>
    <p>当前登录管理员：<stl:admin type="UserName"></p>
    <p>管理员ID：<stl:admin type="Id"></p>
    <p>管理员姓名：<stl:admin type="Name"></p>
    <p>邮箱：<stl:admin type="Email"></p>
  </stl:yes>
  <stl:no>
    <p>未登录，请先登录</p>
  </stl:no>
</stl:if>
```

---

## SSCMS 表名对比

| 功能 | 旧表名 (6.x) | 新表名 (7.x+) |
|------|--------------|---------------|
| 管理员表 | siteserver_Administrator | sscms_Administrator |
| 用户表 | siteserver_User | sscms_User |
| 站点表 | siteserver_Site | sscms_Site |
| 栏目表 | siteserver_Channel | sscms_Channel |
| 内容表 | siteserver_Content | model_Content |

---

## 完整调试页面

使用我们提供的 [sscms-db-debug.html](sscms-db-debug.html) 文件，上传到您的 SSCMS 中进行调试。

该文件包含：
1. 查询所有表名的功能
2. 测试不同表名的功能
3. 错误处理机制
4. 最佳实践示例

---

## 安全建议

1. **避免在前台直接查询系统表**，可能导致安全问题
2. **尽量使用 STL 标签**或 REST API 替代直接 SQL 查询
3. **添加错误处理**，防止查询失败导致页面崩溃
4. **权限控制**，确保只有授权用户才能查看敏感数据

---

## REST API 方式（高级）

如果需要通过代码查询：

```javascript
async function loadAdministrators() {
    try {
        const response = await fetch('/api/v1/administrators', {
            headers: {
                'X-SS-API-KEY': '您的API密钥'
            }
        });
        
        const data = await response.json();
        console.log('管理员列表:', data);
    } catch (error) {
        console.error('加载失败:', error);
    }
}
```

---

## 常见问题

### Q: 查询后发现多个可能的表名怎么办？
A: 可以使用 `stl:try` 标签进行容错处理

```html
<stl:try>
    <stl:dynamic>
        <stl:sqlContents connectionStringName="ConnectionString">
            <stl:queryString>SELECT * FROM sscms_Administrator</stl:queryString>
            <p>使用表名: sscms_Administrator</p>
            <!-- 数据展示 -->
        </stl:sqlContents>
    </stl:dynamic>
    <stl:catch>
        <stl:try>
            <stl:dynamic>
                <stl:sqlContents connectionStringName="ConnectionString">
                    <stl:queryString>SELECT * FROM Administrator</stl:queryString>
                    <p>使用表名: Administrator</p>
                    <!-- 数据展示 -->
                </stl:sqlContents>
            </stl:dynamic>
            <stl:catch>
                <p>未找到合适的表名，请联系管理员</p>
            </stl:catch>
        </stl:try>
    </stl:catch>
</stl:try>
```

---

## 总结

1. 首先使用调试文件确定正确的表名
2. 优先使用 STL 标签或 REST API，避免直接 SQL 查询
3. 如果必须使用 SQL，务必包裹在 `<stl:dynamic>` 标签中
4. 添加错误处理，提高系统稳定性
5. 遵循安全最佳实践，防止敏感数据泄露
