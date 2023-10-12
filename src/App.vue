<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

/** 运行中 */
const processing = ref(false)

/** 信息 */
const message = ref('')

/** 点击回调 */
async function onClick() {
  if (processing.value) { return }

  try {
    processing.value = true
    const pong = await ping()
    message.value = `${new Date().toLocaleString()} ${pong}`

  } catch (error) {
    alert(error)
  } finally {
    processing.value = false
  }
}

/** 发送 ping 请求 */
async function ping(): Promise<string> {
  if (import.meta.env.DEV) {
    return 'mock response'
  }

  const resp = await fetch('/api/ping', { method: 'POST' })
  if (resp.status !== 200) {
    throw new Error(resp.statusText)
  }

  const pong = await resp.text()
  return pong
}
</script>

<template>
  <main class="flex column">
    <section class="flex column">
      <h2>请求</h2>

      <div>
        <button @click="onClick" :disabled="processing">请求</button>
      </div>

      <div>
        <span>响应：{{ message }}</span>
      </div>
    </section>

    <section class="flex column">
      <h2>路由</h2>
      <section class="flex row">
        <RouterLink to="/">PageA</RouterLink>
        <RouterLink to="/b">PageB</RouterLink>
      </section>
    </section>

    <section>
      <RouterView />
    </section>
  </main>
</template>

<style>
.flex {
  display: flex;
  gap: 0.5rem;
}

.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}
</style>
