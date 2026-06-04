# SSCMS 数据库类型差异指南

## 问题分析

错误 `42P01: 关系 "siteserver_administrator" 不存在` 是 **PostgreSQL** 数据库的典型错误。PostgreSQL 对表名大小写非常敏感。

### 关键差异点

| 数据库类型 | 表名大小写 | Schema | 语法特点 |
|------------|-----------|--------|----------|
| MySQL | 默认不区分 | 无schema概念 | 表名自动转换为小写 |
| PostgreSQL | 默认区分 | public schema | 小写表名，大写需加引号 |
| SQL Server | 默认不区分 | dbo schema | 需要dbo前缀 |

---

## 针对 PostgreSQL 的解决方案

### 方案一：使用正确的表名格式

PostgreSQL 默认将未加引号的表名转换为小写：

```html
<!-- ✅ 正确：使用小写表名 -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT * FROM siteserver_administrator
    </stl:queryString>
    <stl:each>
      用户：<stl:sqlContent type="username"><br>
    </stl:each>
  </stl:sqlContents>
</stl:dynamic>
```

**关键点**：
- 表名全部小写：`siteserver_administrator`
- 字段名也需小写：`username`（不是 `UserName`）

### 方案二：使用引号包裹表名（保持大小写）

```html
<!-- 如果表名确实是大写的 -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT * FROM "siteserver_Administrator"
    </stl:queryString>
    <stl:each>
      用户：<stl:sqlContent type="UserName"><br>
    </stl:each>
  </stl:sqlContents>
</stl:dynamic>
```

### 方案三：指定 Schema

```html
<!-- PostgreSQL 默认使用 public schema -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT * FROM public.siteserver_administrator
    </stl:queryString>
    <stl:each>
      用户：<stl:sqlContent type="username"><br>
    </stl:each>
  </stl:sqlContents>
</stl:dynamic>
```

---

## 不同数据库的 SQL 语法对比

### 1. 查询所有表

| 数据库 | SQL 语句 |
|--------|----------|
| MySQL | `SHOW TABLES` |
| PostgreSQL | `SELECT tablename FROM pg_tables WHERE schemaname = 'public'` |
| SQL Server | `SELECT name FROM sys.tables` |

### 2. 查询表结构

| 数据库 | SQL 语句 |
|--------|----------|
| MySQL | `DESCRIBE tablename` |
| PostgreSQL | `SELECT * FROM information_schema.columns WHERE table_name = 'tablename'` |
| SQL Server | `EXEC sp_help 'tablename'` |

### 3. 字符串拼接

| 数据库 | 语法 | 示例 |
|--------|------|------|
| MySQL | `CONCAT(a, b)` 或 `a + b` | `CONCAT(first_name, ' ', last_name)` |
| PostgreSQL | `a || b` 或 `CONCAT(a, b)` | `first_name || ' ' || last_name` |
| SQL Server | `a + b` | `first_name + ' ' + last_name` |

### 4. 日期函数

| 数据库 | 当前时间 | 格式化日期 |
|--------|----------|------------|
| MySQL | `NOW()` | `DATE_FORMAT(date, '%Y-%m-%d')` |
| PostgreSQL | `NOW()` | `TO_CHAR(date, 'YYYY-MM-DD')` |
| SQL Server | `GETDATE()` | `CONVERT(VARCHAR, date, 23)` |

### 5. 分页语法

| 数据库 | 语法 |
|--------|------|
| MySQL | `LIMIT offset, rows` | `SELECT * FROM table LIMIT 0, 10` |
| PostgreSQL | `OFFSET offset LIMIT rows` | `SELECT * FROM table OFFSET 0 LIMIT 10` |
| SQL Server | `ROW_NUMBER()` | `SELECT TOP 10 * FROM table` |

---

## 完整的跨数据库兼容方案

```html
<!-- 自动检测并处理不同数据库类型 -->
<stl:dynamic>
  <stl:try>
    <!-- 尝试 PostgreSQL 语法 -->
    <stl:sqlContents connectionStringName="ConnectionString">
      <stl:queryString>
        SELECT * FROM public.siteserver_administrator LIMIT 5
      </stl:queryString>
      <p>数据库类型：PostgreSQL</p>
      <table>
        <tr><th>用户名</th></tr>
        <stl:each>
          <tr><td><stl:sqlContent type="username"></td></tr>
        </stl:each>
      </table>
    </stl:sqlContents>
  </stl:try>
  <stl:catch>
    <stl:try>
      <!-- 尝试 MySQL 语法 -->
      <stl:sqlContents connectionStringName="ConnectionString">
        <stl:queryString>
          SELECT * FROM siteserver_administrator LIMIT 5
        </stl:queryString>
        <p>数据库类型：MySQL</p>
        <table>
          <tr><th>用户名</th></tr>
          <stl:each>
            <tr><td><stl:sqlContent type="username"></td></tr>
          </stl:each>
        </table>
      </stl:sqlContents>
    </stl:try>
    <stl:catch>
      <stl:try>
        <!-- 尝试 SQL Server 语法 -->
        <stl:sqlContents connectionStringName="ConnectionString">
          <stl:queryString>
            SELECT TOP 5 * FROM dbo.siteserver_Administrator
          </stl:queryString>
          <p>数据库类型：SQL Server</p>
          <table>
            <tr><th>用户名</th></tr>
            <stl:each>
              <tr><td><stl:sqlContent type="UserName"></td></tr>
            </stl:each>
          </table>
        </stl:sqlContents>
      </stl:try>
      <stl:catch>
        <p>无法识别数据库类型或表不存在</p>
      </stl:catch>
    </stl:catch>
  </stl:catch>
</stl:dynamic>
```

---

## 调试技巧

### 方法一：查看数据库类型

```html
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>SELECT version()</stl:queryString>
    <p>数据库版本：<stl:sqlContent type="version"></p>
  </stl:sqlContents>
</stl:dynamic>
```

### 方法二：列出所有表（PostgreSQL）

```html
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_type = 'BASE TABLE'
      ORDER BY table_schema, table_name
    </stl:queryString>
    <table>
      <tr><th>Schema</th><th>表名</th></tr>
      <stl:each>
        <tr>
          <td><stl:sqlContent type="table_schema"></td>
          <td><stl:sqlContent type="table_name"></td>
        </tr>
      </stl:each>
    </table>
  </stl:sqlContents>
</stl:dynamic>
```

### 方法三：查看表结构

```html
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'siteserver_administrator'
    </stl:queryString>
    <table>
      <tr><th>字段名</th><th>数据类型</th></tr>
      <stl:each>
        <tr>
          <td><stl:sqlContent type="column_name"></td>
          <td><stl:sqlContent type="data_type"></td>
        </tr>
      </stl:each>
    </table>
  </stl:sqlContents>
</stl:dynamic>
```

---

## 最佳实践建议

1. **避免硬编码表名**：使用 STL 内置标签替代直接 SQL 查询
2. **统一表名大小写**：始终使用小写表名和字段名
3. **添加错误处理**：使用 `<stl:try>` 和 `<stl:catch>` 进行容错
4. **明确指定 Schema**：PostgreSQL 使用 `public.`，SQL Server 使用 `dbo.`
5. **测试多种数据库**：确保代码在不同数据库类型下都能正常运行

---

## 针对您问题的具体解决方案

根据您的错误 `42P01: 关系 "siteserver_administrator" 不存在`，请尝试以下代码：

```html
<!-- PostgreSQL 正确写法 -->
<stl:dynamic>
  <stl:sqlContents connectionStringName="ConnectionString">
    <stl:queryString>
      SELECT * FROM public.siteserver_administrator
    </stl:queryString>
    <stl:each>
      <p><stl:sqlContent type="username"></p>
    </stl:each>
  </stl:sqlContents>
</stl:dynamic>
```

或者使用 STL 标签替代：

```html
<!-- 最安全的方式：使用内置标签 -->
<stl:if testType="IsAdminLogined">
  <stl:yes>
    当前管理员：<stl:admin type="UserName">
  </stl:yes>
</stl:if>
```

---

## 总结

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 表名不存在 | PostgreSQL 区分大小写 | 使用小写表名 |
| 字段名错误 | 字段名也区分大小写 | 使用小写字段名 |
| Schema 问题 | PostgreSQL 需要 public schema | 添加 public. 前缀 |
| 数据库兼容 | 不同数据库语法不同 | 使用 `<stl:try>` 进行兼容 |

如果问题仍然存在，请先使用调试代码确认数据库类型和实际表名！
