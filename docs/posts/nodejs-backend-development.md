---
layout: PostLayout
title: Node.js后端开发实战：从Express到微服务架构
date: 2024-01-03
category: 后端开发
tags: [Node.js, Express, API设计, 微服务, 数据库, 后端架构]
excerpt: 深入探讨Node.js后端开发的核心技术，从Express框架基础到微服务架构设计，构建可扩展的现代化后端应用。
coverImage: https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=nodejs%20server%20architecture%20diagram%20with%20express%20framework%2C%20database%20connections%2C%20api%20endpoints%2C%20modern%20tech%20illustration%2C%20green%20and%20blue%20theme&image_size=landscape_16_9
---

# Node.js后端开发实战：从Express到微服务架构

Node.js凭借其高性能的事件驱动架构和丰富的生态系统，已成为现代后端开发的重要选择。本文将深入探讨Node.js后端开发的核心技术，从Express框架基础到微服务架构设计。

## 🚀 Express框架基础

### 1. 项目初始化和基本设置

```javascript
// package.json
{
  "name": "nodejs-backend-api",
  "version": "1.0.0",
  "description": "Node.js后端API服务",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0",
    "joi": "^17.9.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3",
    "eslint": "^8.47.0"
  }
}
```

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 安全中间件
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// 限流中间件
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: {
    error: '请求过于频繁，请稍后再试'
  }
});
app.use('/api/', limiter);

// 解析中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    error: '接口不存在',
    path: req.originalUrl
  });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: '数据验证失败',
      details: err.message
    });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: '无效的访问令牌'
    });
  }
  
  res.status(500).json({
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : '请稍后重试'
  });
});

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

module.exports = app;
```

### 2. 数据库连接和模型设计

```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB连接成功: ${conn.connection.host}`);
    
    // 监听连接事件
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB连接错误:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB连接断开');
    });
    
  } catch (error) {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    unique: true,
    trim: true,
    minlength: [3, '用户名至少3个字符'],
    maxlength: [20, '用户名最多20个字符']
  },
  email: {
    type: String,
    required: [true, '邮箱不能为空'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, '邮箱格式不正确']
  },
  password: {
    type: String,
    required: [true, '密码不能为空'],
    minlength: [6, '密码至少6个字符'],
    select: false // 查询时默认不返回密码
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    website: String,
    location: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 虚拟字段
userSchema.virtual('fullName').get(function() {
  return `${this.profile?.firstName || ''} ${this.profile?.lastName || ''}`.trim();
});

// 索引
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });

// 密码加密中间件
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 实例方法：验证密码
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// 实例方法：生成JWT令牌
userSchema.methods.generateAuthToken = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { 
      userId: this._id, 
      username: this.username,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// 静态方法：查找活跃用户
userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true }).select('-password');
};

module.exports = mongoose.model('User', userSchema);
```

```javascript
// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '标题不能为空'],
    trim: true,
    maxlength: [100, '标题最多100个字符']
  },
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  excerpt: {
    type: String,
    maxlength: [200, '摘要最多200个字符']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, '分类不能为空'],
    enum: ['技术', '生活', '思考', '教程']
  },
  tags: [{
    type: String,
    trim: true
  }],
  coverImage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 虚拟字段：评论
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

// 索引
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ category: 1, status: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ title: 'text', content: 'text' }); // 全文搜索

// 中间件：发布时设置发布时间
postSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// 静态方法：获取已发布的文章
postSchema.statics.findPublished = function(options = {}) {
  const { page = 1, limit = 10, category, tags } = options;
  
  let query = { status: 'published' };
  
  if (category) query.category = category;
  if (tags && tags.length > 0) query.tags = { $in: tags };
  
  return this.find(query)
    .populate('author', 'username avatar')
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

module.exports = mongoose.model('Post', postSchema);
```

### 3. 认证和授权系统

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT验证中间件
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: '访问令牌缺失' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: '用户不存在或已被禁用' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: '访问令牌已过期' });
    }
    res.status(401).json({ error: '无效的访问令牌' });
  }
};

// 角色授权中间件
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: '请先登录' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: '权限不足' });
    }
    
    next();
  };
};

// 资源所有者验证
const checkOwnership = (Model, paramName = 'id') => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params[paramName]);
      
      if (!resource) {
        return res.status(404).json({ error: '资源不存在' });
      }
      
      // 管理员或资源所有者可以访问
      if (req.user.role === 'admin' || resource.author?.toString() === req.user._id.toString()) {
        req.resource = resource;
        return next();
      }
      
      res.status(403).json({ error: '无权访问此资源' });
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  };
};

module.exports = {
  authenticate,
  authorize,
  checkOwnership
};
```

```javascript
// routes/auth.js
const express = require('express');
const Joi = require('joi');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// 注册验证规则
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// 登录验证规则
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// 用户注册
router.post('/register', async (req, res) => {
  try {
    // 数据验证
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: '数据验证失败',
        details: error.details[0].message
      });
    }
    
    const { username, email, password } = value;
    
    // 检查用户是否已存在
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ? '邮箱已被注册' : '用户名已被使用'
      });
    }
    
    // 创建新用户
    const user = new User({ username, email, password });
    await user.save();
    
    // 生成JWT令牌
    const token = user.generateAuthToken();
    
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ error: '注册失败，请稍后重试' });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    // 数据验证
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: '数据验证失败',
        details: error.details[0].message
      });
    }
    
    const { email, password } = value;
    
    // 查找用户（包含密码字段）
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    // 验证密码
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: '邮箱或密码错误' });
    }
    
    // 更新最后登录时间
    user.lastLogin = new Date();
    await user.save();
    
    // 生成JWT令牌
    const token = user.generateAuthToken();
    
    res.json({
      message: '登录成功',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ error: '登录失败，请稍后重试' });
  }
});

// 获取当前用户信息
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('profile')
      .select('-password');
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        profile: user.profile,
        fullName: user.fullName,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

// 刷新令牌
router.post('/refresh', authenticate, async (req, res) => {
  try {
    const token = req.user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    console.error('刷新令牌错误:', error);
    res.status(500).json({ error: '刷新令牌失败' });
  }
});

// 用户登出（可选：实现令牌黑名单）
router.post('/logout', authenticate, async (req, res) => {
  try {
    // 这里可以实现令牌黑名单逻辑
    // 或者简单地让客户端删除令牌
    res.json({ message: '登出成功' });
  } catch (error) {
    console.error('登出错误:', error);
    res.status(500).json({ error: '登出失败' });
  }
});

module.exports = router;
```

### 4. RESTful API设计

```javascript
// routes/posts.js
const express = require('express');
const Joi = require('joi');
const Post = require('../models/Post');
const { authenticate, authorize, checkOwnership } = require('../middleware/auth');

const router = express.Router();

// 文章验证规则
const postSchema = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().required(),
  excerpt: Joi.string().max(200),
  category: Joi.string().valid('技术', '生活', '思考', '教程').required(),
  tags: Joi.array().items(Joi.string()),
  coverImage: Joi.string().uri().allow(''),
  status: Joi.string().valid('draft', 'published', 'archived').default('draft')
});

// 获取文章列表
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tags,
      author,
      status = 'published',
      search,
      sort = '-publishedAt'
    } = req.query;
    
    // 构建查询条件
    let query = {};
    
    // 只有管理员或作者本人可以查看非发布状态的文章
    if (req.user && (req.user.role === 'admin' || author === req.user._id.toString())) {
      if (status) query.status = status;
    } else {
      query.status = 'published';
    }
    
    if (category) query.category = category;
    if (tags) query.tags = { $in: tags.split(',') };
    if (author) query.author = author;
    if (search) {
      query.$text = { $search: search };
    }
    
    // 执行查询
    const posts = await Post.find(query)
      .populate('author', 'username avatar')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();
    
    // 获取总数
    const total = await Post.countDocuments(query);
    
    res.json({
      posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('获取文章列表错误:', error);
    res.status(500).json({ error: '获取文章列表失败' });
  }
});

// 获取单篇文章
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar profile')
      .populate('comments');
    
    if (!post) {
      return res.status(404).json({ error: '文章不存在' });
    }
    
    // 检查访问权限
    if (post.status !== 'published') {
      if (!req.user || (req.user.role !== 'admin' && post.author._id.toString() !== req.user._id.toString())) {
        return res.status(403).json({ error: '无权访问此文章' });
      }
    }
    
    // 增加浏览量（异步执行，不影响响应）
    if (post.status === 'published') {
      Post.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } }).exec();
    }
    
    res.json({ post });
  } catch (error) {
    console.error('获取文章错误:', error);
    res.status(500).json({ error: '获取文章失败' });
  }
});

// 创建文章
router.post('/', authenticate, async (req, res) => {
  try {
    // 数据验证
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: '数据验证失败',
        details: error.details[0].message
      });
    }
    
    // 创建文章
    const post = new Post({
      ...value,
      author: req.user._id
    });
    
    await post.save();
    await post.populate('author', 'username avatar');
    
    res.status(201).json({
      message: '文章创建成功',
      post
    });
  } catch (error) {
    console.error('创建文章错误:', error);
    res.status(500).json({ error: '创建文章失败' });
  }
});

// 更新文章
router.put('/:id', authenticate, checkOwnership(Post), async (req, res) => {
  try {
    // 数据验证
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: '数据验证失败',
        details: error.details[0].message
      });
    }
    
    // 更新文章
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    ).populate('author', 'username avatar');
    
    res.json({
      message: '文章更新成功',
      post
    });
  } catch (error) {
    console.error('更新文章错误:', error);
    res.status(500).json({ error: '更新文章失败' });
  }
});

// 删除文章
router.delete('/:id', authenticate, checkOwnership(Post), async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: '文章删除成功' });
  } catch (error) {
    console.error('删除文章错误:', error);
    res.status(500).json({ error: '删除文章失败' });
  }
});

// 点赞文章
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ error: '文章不存在' });
    }
    
    res.json({
      message: '点赞成功',
      likeCount: post.likeCount
    });
  } catch (error) {
    console.error('点赞错误:', error);
    res.status(500).json({ error: '点赞失败' });
  }
});

// 获取文章统计信息
router.get('/stats/overview', authenticate, authorize('admin'), async (req, res) => {
  try {
    const stats = await Post.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalViews: { $sum: '$viewCount' },
          totalLikes: { $sum: '$likeCount' }
        }
      }
    ]);
    
    const categoryStats = await Post.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      statusStats: stats,
      categoryStats
    });
  } catch (error) {
    console.error('获取统计信息错误:', error);
    res.status(500).json({ error: '获取统计信息失败' });
  }
});

module.exports = router;
```

## 🔧 高级功能实现

### 1. 文件上传处理

```javascript
// middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// 确保上传目录存在
const ensureUploadDir = async (dir) => {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

// 存储配置
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads', file.fieldname);
    await ensureUploadDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 允许的文件类型
  const allowedTypes = {
    'image/jpeg': true,
    'image/png': true,
    'image/gif': true,
    'image/webp': true
  };
  
  if (allowedTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('不支持的文件类型'), false);
  }
};

// 创建multer实例
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // 最多5个文件
  }
});

// 错误处理中间件
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '文件大小超过限制（5MB）' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: '文件数量超过限制（5个）' });
    }
  }
  
  if (err.message === '不支持的文件类型') {
    return res.status(400).json({ error: '只支持 JPEG、PNG、GIF、WebP 格式的图片' });
  }
  
  next(err);
};

module.exports = {
  upload,
  handleUploadError
};
```

```javascript
// routes/upload.js
const express = require('express');
const path = require('path');
const { authenticate } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// 单文件上传
router.post('/single', authenticate, upload.single('image'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请选择要上传的文件' });
    }
    
    const fileUrl = `/uploads/${req.file.fieldname}/${req.file.filename}`;
    
    res.json({
      message: '文件上传成功',
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    console.error('文件上传错误:', error);
    res.status(500).json({ error: '文件上传失败' });
  }
});

// 多文件上传
router.post('/multiple', authenticate, upload.array('images', 5), handleUploadError, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: '请选择要上传的文件' });
    }
    
    const files = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      url: `/uploads/${file.fieldname}/${file.filename}`
    }));
    
    res.json({
      message: '文件上传成功',
      files
    });
  } catch (error) {
    console.error('文件上传错误:', error);
    res.status(500).json({ error: '文件上传失败' });
  }
});

module.exports = router;
```

### 2. 缓存策略

```javascript
// middleware/cache.js
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

client.on('error', (err) => {
  console.error('Redis连接错误:', err);
});

client.on('connect', () => {
  console.log('Redis连接成功');
});

// 缓存中间件
const cache = (duration = 300) => {
  return async (req, res, next) => {
    // 跳过POST、PUT、DELETE请求
    if (req.method !== 'GET') {
      return next();
    }
    
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await client.get(key);
      
      if (cached) {
        console.log('缓存命中:', key);
        return res.json(JSON.parse(cached));
      }
      
      // 重写res.json方法以缓存响应
      const originalJson = res.json;
      res.json = function(data) {
        // 只缓存成功响应
        if (res.statusCode === 200) {
          client.setex(key, duration, JSON.stringify(data));
        }
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('缓存错误:', error);
      next();
    }
  };
};

// 清除缓存
const clearCache = (pattern) => {
  return async (req, res, next) => {
    try {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
        console.log('缓存已清除:', pattern);
      }
      next();
    } catch (error) {
      console.error('清除缓存错误:', error);
      next();
    }
  };
};

module.exports = {
  client,
  cache,
  clearCache
};
```

### 3. 日志系统

```javascript
// utils/logger.js
const winston = require('winston');
const path = require('path');

// 创建日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// 创建logger实例
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'nodejs-api' },
  transports: [
    // 错误日志
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // 所有日志
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// 开发环境下输出到控制台
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// 请求日志中间件
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };
    
    if (res.statusCode >= 400) {
      logger.error('HTTP Request Error', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });
  
  next();
};

module.exports = {
  logger,
  requestLogger
};
```

## 🏗️ 微服务架构基础

### 1. 服务发现和注册

```javascript
// services/registry.js
const consul = require('consul')();
const os = require('os');

class ServiceRegistry {
  constructor(serviceName, port) {
    this.serviceName = serviceName;
    this.port = port;
    this.serviceId = `${serviceName}-${os.hostname()}-${port}`;
    this.health = true;
  }
  
  // 注册服务
  async register() {
    try {
      await consul.agent.service.register({
        id: this.serviceId,
        name: this.serviceName,
        port: this.port,
        address: this.getLocalIP(),
        check: {
          http: `http://${this.getLocalIP()}:${this.port}/health`,
          interval: '10s',
          timeout: '5s'
        },
        tags: ['api', 'nodejs']
      });
      
      console.log(`服务 ${this.serviceName} 注册成功`);
    } catch (error) {
      console.error('服务注册失败:', error);
    }
  }
  
  // 注销服务
  async deregister() {
    try {
      await consul.agent.service.deregister(this.serviceId);
      console.log(`服务 ${this.serviceName} 注销成功`);
    } catch (error) {
      console.error('服务注销失败:', error);
    }
  }
  
  // 发现服务
  async discover(serviceName) {
    try {
      const services = await consul.health.service({
        service: serviceName,
        passing: true
      });
      
      return services.map(service => ({
        id: service.Service.ID,
        address: service.Service.Address,
        port: service.Service.Port
      }));
    } catch (error) {
      console.error('服务发现失败:', error);
      return [];
    }
  }
  
  // 获取本地IP
  getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const interface of interfaces[name]) {
        if (interface.family === 'IPv4' && !interface.internal) {
          return interface.address;
        }
      }
    }
    return '127.0.0.1';
  }
}

module.exports = ServiceRegistry;
```

### 2. API网关

```javascript
// gateway/index.js
const express = require('express');
const httpProxy = require('http-proxy-middleware');
const ServiceRegistry = require('../services/registry');
const rateLimit = require('express-rate-limit');

const app = express();
const registry = new ServiceRegistry('api-gateway', 3000);

// 服务路由配置
const services = {
  '/api/auth': 'auth-service',
  '/api/users': 'user-service',
  '/api/posts': 'post-service',
  '/api/comments': 'comment-service'
};

// 负载均衡器
class LoadBalancer {
  constructor() {
    this.services = new Map();
    this.currentIndex = new Map();
  }
  
  // 添加服务实例
  addService(serviceName, instances) {
    this.services.set(serviceName, instances);
    this.currentIndex.set(serviceName, 0);
  }
  
  // 轮询算法获取服务实例
  getService(serviceName) {
    const instances = this.services.get(serviceName);
    if (!instances || instances.length === 0) {
      return null;
    }
    
    const currentIndex = this.currentIndex.get(serviceName);
    const instance = instances[currentIndex];
    
    // 更新索引
    this.currentIndex.set(serviceName, (currentIndex + 1) % instances.length);
    
    return instance;
  }
}

const loadBalancer = new LoadBalancer();

// 定期更新服务列表
const updateServices = async () => {
  for (const [route, serviceName] of Object.entries(services)) {
    try {
      const instances = await registry.discover(serviceName);
      loadBalancer.addService(serviceName, instances);
      console.log(`更新服务 ${serviceName}:`, instances.length, '个实例');
    } catch (error) {
      console.error(`更新服务 ${serviceName} 失败:`, error);
    }
  }
};

// 每30秒更新一次服务列表
setInterval(updateServices, 30000);
updateServices(); // 启动时立即更新

// 限流配置
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 1000, // 每个IP限制1000个请求
  message: { error: '请求过于频繁，请稍后再试' }
});

app.use(limiter);
app.use(express.json());

// 动态代理中间件
const createProxy = (serviceName) => {
  return (req, res, next) => {
    const instance = loadBalancer.getService(serviceName);
    
    if (!instance) {
      return res.status(503).json({
        error: '服务暂时不可用',
        service: serviceName
      });
    }
    
    const target = `http://${instance.address}:${instance.port}`;
    
    const proxy = httpProxy({
      target,
      changeOrigin: true,
      timeout: 10000,
      onError: (err, req, res) => {
        console.error(`代理错误 ${serviceName}:`, err.message);
        res.status(502).json({
          error: '网关错误',
          message: '上游服务不可用'
        });
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`代理请求: ${req.method} ${req.originalUrl} -> ${target}${req.url}`);
      }
    });
    
    proxy(req, res, next);
  };
};

// 注册路由
for (const [route, serviceName] of Object.entries(services)) {
  app.use(route, createProxy(serviceName));
}

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: Object.fromEntries(
      Array.from(loadBalancer.services.entries()).map(([name, instances]) => [
        name,
        instances.length
      ])
    )
  });
});

// 启动网关
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`API网关运行在端口 ${PORT}`);
  await registry.register();
});

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('正在关闭API网关...');
  await registry.deregister();
  process.exit(0);
});

module.exports = app;
```

## 📊 监控和性能优化

### 1. 性能监控

```javascript
// middleware/monitoring.js
const prometheus = require('prom-client');

// 创建指标
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP请求持续时间',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'HTTP请求总数',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new prometheus.Gauge({
  name: 'active_connections',
  help: '当前活跃连接数'
});

// 注册默认指标
prometheus.collectDefaultMetrics();

// 监控中间件
const monitoring = (req, res, next) => {
  const start = Date.now();
  activeConnections.inc();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
    
    activeConnections.dec();
  });
  
  next();
};

// 指标端点
const metricsEndpoint = (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
};

module.exports = {
  monitoring,
  metricsEndpoint,
  prometheus
};
```

### 2. 数据库优化

```javascript
// utils/database-optimizer.js
const mongoose = require('mongoose');

class DatabaseOptimizer {
  // 分析慢查询
  static async analyzeSlowQueries() {
    const db = mongoose.connection.db;
    
    // 启用慢查询日志
    await db.admin().command({
      profile: 2,
      slowms: 100 // 记录超过100ms的查询
    });
    
    // 获取慢查询
    const slowQueries = await db.collection('system.profile')
      .find({ ts: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
      .sort({ ts: -1 })
      .limit(10)
      .toArray();
    
    return slowQueries;
  }
  
  // 创建索引建议
  static async suggestIndexes(collectionName) {
    const db = mongoose.connection.db;
    const collection = db.collection(collectionName);
    
    // 获取查询统计
    const stats = await collection.aggregate([
      { $indexStats: {} }
    ]).toArray();
    
    return stats;
  }
  
  // 连接池监控
  static monitorConnectionPool() {
    const connection = mongoose.connection;
    
    setInterval(() => {
      const stats = {
        readyState: connection.readyState,
        host: connection.host,
        port: connection.port,
        name: connection.name
      };
      
      console.log('数据库连接状态:', stats);
    }, 30000);
  }
}

module.exports = DatabaseOptimizer;
```

## 🧪 测试策略

### 1. 单元测试

```javascript
// tests/unit/user.test.js
const User = require('../../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('用户创建', () => {
    test('应该成功创建用户', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const user = new User(userData);
      const savedUser = await user.save();
      
      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.password).not.toBe(userData.password); // 应该被加密
    });
    
    test('应该验证必填字段', async () => {
      const user = new User({});
      
      await expect(user.save()).rejects.toThrow();
    });
    
    test('应该验证邮箱格式', async () => {
      const user = new User({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      });
      
      await expect(user.save()).rejects.toThrow();
    });
  });
  
  describe('密码验证', () => {
    test('应该正确验证密码', async () => {
      const password = 'password123';
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password
      });
      
      await user.save();
      
      const isValid = await user.comparePassword(password);
      expect(isValid).toBe(true);
      
      const isInvalid = await user.comparePassword('wrongpassword');
      expect(isInvalid).toBe(false);
    });
  });
  
  describe('JWT令牌', () => {
    test('应该生成有效的JWT令牌', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
      await user.save();
      
      const token = user.generateAuthToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });
});
```

### 2. 集成测试

```javascript
// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');
const mongoose = require('mongoose');

describe('认证API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('POST /api/auth/register', () => {
    test('应该成功注册新用户', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body.message).toBe('注册成功');
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user.email).toBe(userData.email);
    });
    
    test('应该拒绝重复的邮箱', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      // 先创建一个用户
      await request(app)
        .post('/api/auth/register')
        .send(userData);
      
      // 尝试用相同邮箱注册
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser2',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(400);
      
      expect(response.body.error).toBe('邮箱已被注册');
    });
  });
  
  describe('POST /api/auth/login', () => {
    test('应该成功登录', async () => {
      // 先注册用户
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      await request(app)
        .post('/api/auth/register')
        .send(userData);
      
      // 登录
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);
      
      expect(response.body.message).toBe('登录成功');
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toBe(userData.username);
    });
    
    test('应该拒绝错误的密码', async () => {
      // 先注册用户
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      await request(app)
        .post('/api/auth/register')
        .send(userData);
      
      // 用错误密码登录
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: 'wrongpassword'
        })
        .expect(401);
      
      expect(response.body.error).toBe('邮箱或密码错误');
    });
  });
  
  describe('GET /api/auth/me', () => {
    test('应该返回当前用户信息', async () => {
      // 注册并登录用户
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(userData);
      
      const token = registerResponse.body.token;
      
      // 获取用户信息
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user.email).toBe(userData.email);
    });
    
    test('应该拒绝无效令牌', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
      
      expect(response.body.error).toBe('无效的访问令牌');
    });
  });
});
```

## 🚀 部署和运维

### 1. Docker容器化

```dockerfile
# Dockerfile
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 设置文件权限
RUN chown -R nodejs:nodejs /app
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# 启动应用
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/blog
      - REDIS_HOST=redis
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - mongo
      - redis
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  mongo_data:
  redis_data:
```

### 2. CI/CD流水线

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test
      env:
        MONGODB_TEST_URI: mongodb://localhost:27017/test
        REDIS_HOST: localhost
        JWT_SECRET: test-secret
    
    - name: Run security audit
      run: npm audit --audit-level high
  
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          myapp/nodejs-api:latest
          myapp/nodejs-api:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /opt/nodejs-api
          docker-compose pull
          docker-compose up -d
          docker system prune -f
```

## 📈 最佳实践总结

### 1. 安全最佳实践

- **输入验证**: 使用Joi等库验证所有输入数据
- **SQL注入防护**: 使用参数化查询和ORM
- **XSS防护**: 对输出进行适当的转义
- **CSRF防护**: 实现CSRF令牌验证
- **限流**: 实现API限流防止滥用
- **HTTPS**: 强制使用HTTPS加密传输
- **敏感信息**: 使用环境变量存储敏感配置

### 2. 性能优化

- **数据库索引**: 为常用查询字段创建索引
- **缓存策略**: 实现多层缓存机制
- **连接池**: 合理配置数据库连接池
- **压缩**: 启用gzip压缩减少传输大小
- **CDN**: 使用CDN加速静态资源
- **负载均衡**: 实现水平扩展

### 3. 监控和日志

- **结构化日志**: 使用JSON格式记录日志
- **错误追踪**: 集成错误监控服务
- **性能监控**: 监控关键性能指标
- **健康检查**: 实现服务健康检查端点
- **告警机制**: 设置关键指标告警

### 4. 代码质量

- **代码规范**: 使用ESLint和Prettier
- **类型检查**: 考虑使用TypeScript
- **测试覆盖**: 保持高测试覆盖率
- **代码审查**: 实施代码审查流程
- **文档**: 维护API文档和代码注释

## 🎯 总结

Node.js后端开发涉及多个方面，从基础的Express框架到复杂的微服务架构。关键是要:

1. **掌握核心技术**: Express、数据库、认证授权
2. **注重安全性**: 实施多层安全防护
3. **优化性能**: 合理使用缓存和数据库优化
4. **完善监控**: 建立完整的监控和日志系统
5. **自动化部署**: 实现CI/CD流水线
6. **持续学习**: 跟上技术发展趋势

通过系统性的学习和实践，可以构建出高质量、可扩展的Node.js后端应用。记住，好的架构是演进出来的，要根据业务需求逐步优化和完善。