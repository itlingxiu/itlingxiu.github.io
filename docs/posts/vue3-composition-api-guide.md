---
layout: PostLayout
title: Vue 3 Composition API 实战指南：构建现代化的Vue应用
date: 2024-01-08
category: Vue.js
tags: [Vue3, Composition API, 响应式, 组件开发, 前端框架]
excerpt: 深入探索Vue 3 Composition API的强大功能，学习如何使用它来构建更加灵活和可维护的Vue应用程序。
coverImage: https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vue.js%20logo%20with%20modern%20code%20editor%20showing%20composition%20api%20syntax%2C%20green%20theme%2C%20clean%20interface%2C%20professional%20development%20environment&image_size=landscape_16_9
---

# Vue 3 Composition API 实战指南：构建现代化的Vue应用

Vue 3 的 Composition API 为我们提供了一种全新的组织组件逻辑的方式。相比于 Options API，它提供了更好的逻辑复用、类型推导和代码组织能力。本文将深入探讨 Composition API 的核心概念和实际应用。

## 🚀 Composition API 基础

### 1. setup() 函数

`setup()` 是 Composition API 的入口点，它在组件创建之前执行：

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const title = ref('Vue 3 Composition API')
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    const decrement = () => {
      count.value--
    }
    
    // 返回模板需要的数据和方法
    return {
      title,
      count,
      doubleCount,
      increment,
      decrement
    }
  }
}
</script>
```

### 2. `<script setup>` 语法糖

更简洁的写法，自动处理返回值：

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 直接声明，无需返回
const count = ref(0)
const title = ref('Vue 3 Composition API')

const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}
</script>
```

## 📊 响应式系统深入

### 1. ref vs reactive

```javascript
import { ref, reactive, toRefs } from 'vue'

// ref - 用于基本类型和单个值
const count = ref(0)
const message = ref('Hello')
const user = ref({ name: 'John', age: 30 })

// 访问值需要 .value
console.log(count.value) // 0
count.value = 10

// reactive - 用于对象和数组
const state = reactive({
  count: 0,
  message: 'Hello',
  user: {
    name: 'John',
    age: 30
  },
  todos: []
})

// 直接访问属性
console.log(state.count) // 0
state.count = 10

// 解构响应式对象
const { count: reactiveCount, message: reactiveMessage } = toRefs(state)
```

### 2. 响应式工具函数

```javascript
import { 
  ref, 
  reactive, 
  readonly, 
  computed, 
  watch, 
  watchEffect,
  unref,
  toRef,
  toRefs,
  isRef,
  isReactive
} from 'vue'

// 只读响应式对象
const state = reactive({ count: 0 })
const readonlyState = readonly(state)

// 工具函数
const count = ref(10)
console.log(unref(count)) // 10 - 获取ref的值
console.log(isRef(count)) // true
console.log(isReactive(state)) // true

// 从响应式对象创建ref
const countRef = toRef(state, 'count')
```

### 3. 计算属性的高级用法

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    const names = value.split(' ')
    firstName.value = names[0]
    lastName.value = names[names.length - 1]
  }
})

// 缓存控制
const expensiveValue = computed(() => {
  console.log('Computing expensive value...')
  return someExpensiveOperation()
})
```

## 👀 侦听器的使用

### 1. watch 和 watchEffect

```javascript
import { ref, reactive, watch, watchEffect } from 'vue'

const count = ref(0)
const state = reactive({ name: 'John', age: 30 })

// 侦听单个ref
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// 侦听多个源
watch([count, () => state.name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('Multiple values changed')
})

// 侦听响应式对象
watch(
  () => state,
  (newState, oldState) => {
    console.log('State changed')
  },
  { deep: true } // 深度侦听
)

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(`Count is ${count.value}, name is ${state.name}`)
})

// 停止侦听
const stopWatcher = watch(count, () => {})
stopWatcher() // 停止侦听
```

### 2. 侦听器选项

```javascript
// 立即执行
watch(
  count,
  (newValue) => {
    console.log('Count:', newValue)
  },
  { immediate: true }
)

// 深度侦听
watch(
  state,
  (newState) => {
    console.log('Deep state change')
  },
  { deep: true }
)

// 刷新时机
watch(
  count,
  () => {
    // 在DOM更新后执行
  },
  { flush: 'post' }
)
```

## 🔄 生命周期钩子

```javascript
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured,
  onActivated,
  onDeactivated
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('Component is about to mount')
    })
    
    onMounted(() => {
      console.log('Component mounted')
      // DOM操作、API调用等
    })
    
    onBeforeUpdate(() => {
      console.log('Component is about to update')
    })
    
    onUpdated(() => {
      console.log('Component updated')
    })
    
    onBeforeUnmount(() => {
      console.log('Component is about to unmount')
      // 清理工作
    })
    
    onUnmounted(() => {
      console.log('Component unmounted')
    })
    
    onErrorCaptured((error, instance, info) => {
      console.error('Error captured:', error)
      return false // 阻止错误继续传播
    })
  }
}
```

## 🧩 组合式函数 (Composables)

### 1. 创建可复用的逻辑

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    isEven
  }
}
```

### 2. 鼠标位置追踪

```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  
  const updateMouse = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMouse)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse)
  })
  
  return { x, y }
}
```

### 3. 本地存储

```javascript
// composables/useLocalStorage.js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const value = ref(initialValue)
  
  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )
  
  return value
}
```

### 4. API请求

```javascript
// composables/useApi.js
import { ref, reactive } from 'vue'

export function useApi(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  const execute = async (options = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  return {
    data: readonly(data),
    error: readonly(error),
    loading: readonly(loading),
    execute
  }
}

// 使用示例
export function useUsers() {
  const { data: users, loading, error, execute } = useApi('/api/users')
  
  const fetchUsers = () => execute()
  
  const createUser = (userData) => {
    return execute({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
  }
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser
  }
}
```

## 🎯 实际应用示例

### 1. 待办事项应用

```vue
<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    
    <form @submit.prevent="addTodo">
      <input 
        v-model="newTodo" 
        placeholder="Add a new todo..."
        required
      />
      <button type="submit">Add</button>
    </form>
    
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter"
        :class="{ active: currentFilter === filter }"
        @click="currentFilter = filter"
      >
        {{ filter }}
      </button>
    </div>
    
    <ul class="todo-list">
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
        />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
    
    <div class="stats">
      <p>Total: {{ todos.length }}</p>
      <p>Completed: {{ completedCount }}</p>
      <p>Remaining: {{ remainingCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodos } from '@/composables/useTodos'

const {
  todos,
  newTodo,
  currentFilter,
  filters,
  addTodo,
  removeTodo,
  filteredTodos,
  completedCount,
  remainingCount
} = useTodos()
</script>
```

```javascript
// composables/useTodos.js
import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useTodos() {
  const todos = useLocalStorage('todos', [])
  const newTodo = ref('')
  const currentFilter = ref('all')
  
  const filters = ['all', 'active', 'completed']
  
  const addTodo = () => {
    if (newTodo.value.trim()) {
      todos.value.push({
        id: Date.now(),
        text: newTodo.value.trim(),
        completed: false
      })
      newTodo.value = ''
    }
  }
  
  const removeTodo = (id) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }
  
  const filteredTodos = computed(() => {
    switch (currentFilter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })
  
  const completedCount = computed(() => 
    todos.value.filter(todo => todo.completed).length
  )
  
  const remainingCount = computed(() => 
    todos.value.filter(todo => !todo.completed).length
  )
  
  return {
    todos,
    newTodo,
    currentFilter,
    filters,
    addTodo,
    removeTodo,
    filteredTodos,
    completedCount,
    remainingCount
  }
}
```

### 2. 表单验证

```javascript
// composables/useForm.js
import { ref, reactive, computed } from 'vue'

export function useForm(initialValues = {}, validationRules = {}) {
  const values = reactive({ ...initialValues })
  const errors = reactive({})
  const touched = reactive({})
  
  const validate = (field) => {
    const rules = validationRules[field]
    if (!rules) return true
    
    const value = values[field]
    let error = null
    
    for (const rule of rules) {
      const result = rule(value)
      if (result !== true) {
        error = result
        break
      }
    }
    
    if (error) {
      errors[field] = error
    } else {
      delete errors[field]
    }
    
    return !error
  }
  
  const validateAll = () => {
    let isValid = true
    for (const field in validationRules) {
      if (!validate(field)) {
        isValid = false
      }
    }
    return isValid
  }
  
  const setFieldValue = (field, value) => {
    values[field] = value
    touched[field] = true
    validate(field)
  }
  
  const resetForm = () => {
    Object.assign(values, initialValues)
    Object.keys(errors).forEach(key => delete errors[key])
    Object.keys(touched).forEach(key => delete touched[key])
  }
  
  const isValid = computed(() => Object.keys(errors).length === 0)
  
  return {
    values,
    errors,
    touched,
    isValid,
    validate,
    validateAll,
    setFieldValue,
    resetForm
  }
}

// 验证规则
export const validationRules = {
  required: (value) => {
    if (!value || value.toString().trim() === '') {
      return 'This field is required'
    }
    return true
  },
  
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return true
  },
  
  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters long`
    }
    return true
  }
}
```

## 🔧 TypeScript 支持

```typescript
// types/user.ts
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

// composables/useUsers.ts
import { ref, Ref } from 'vue'
import type { User } from '@/types/user'

export function useUsers() {
  const users: Ref<User[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    try {
      const response = await fetch('/api/users')
      users.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }
  
  const addUser = (user: Omit<User, 'id'>): void => {
    const newUser: User = {
      ...user,
      id: Date.now()
    }
    users.value.push(newUser)
  }
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser
  }
}
```

## 🎯 最佳实践

### 1. 组合式函数命名

- 使用 `use` 前缀
- 描述性命名：`useCounter`、`useLocalStorage`
- 返回对象使用一致的结构

### 2. 响应式数据管理

```javascript
// ✅ 好的做法
const state = reactive({
  user: null,
  loading: false,
  error: null
})

// ❌ 避免解构响应式对象
const { user, loading } = state // 失去响应性

// ✅ 使用 toRefs
const { user, loading } = toRefs(state)
```

### 3. 副作用清理

```javascript
export function useEventListener(target, event, handler) {
  onMounted(() => {
    target.addEventListener(event, handler)
  })
  
  onUnmounted(() => {
    target.removeEventListener(event, handler)
  })
}
```

### 4. 性能优化

```javascript
// 使用 shallowRef 对于大型对象
const largeObject = shallowRef({
  // 大量数据
})

// 使用 markRaw 对于不需要响应式的对象
const nonReactiveObject = markRaw({
  // 不需要响应式的数据
})
```

## 📚 总结

Vue 3 的 Composition API 为我们提供了：

1. **更好的逻辑复用**：通过组合式函数实现跨组件的逻辑共享
2. **更好的类型推导**：与 TypeScript 的完美集成
3. **更灵活的代码组织**：按功能而非选项组织代码
4. **更好的性能**：更精确的依赖追踪

掌握 Composition API 将让你能够构建更加现代化、可维护的 Vue 应用。记住，它不是要替代 Options API，而是提供了另一种更强大的选择。

---

*你在使用 Composition API 时有什么心得体会？欢迎分享你的实践经验！*