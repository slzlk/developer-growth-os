<template>
  <div class="app">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-name">Lili Workspace</div>
        <div class="logo-slogan">Build · Learn · Record · Grow</div>
      </div>

      <nav class="nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: $route.path === item.to }"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        local · no sync · no login
      </div>
    </aside>

    <!-- Main -->
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const $route = useRoute()

const navItems = [
  {
    to: '/',
    label: 'workspace',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`
  },
  {
    to: '/projects',
    label: 'projects',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 7l10-4 10 4v10l-10 4L2 17V7z"/></svg>`
  },
  {
    to: '/decisions',
    label: 'decisions',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>`
  },
  {
    to: '/ideas',
    label: 'ideas',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18h6M10 22h4M12 2a7 7 0 015 12c.5.7.8 1.4 1 2H6c.2-.6.5-1.3 1-2A7 7 0 0112 2z"/></svg>`
  },
]
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  min-width: 200px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--border);
}
.logo-name {
  font-family: var(--font-head);
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.3px;
}
.logo-slogan {
  font-size: 9px;
  color: var(--muted);
  letter-spacing: 0.08em;
  margin-top: 4px;
  text-transform: uppercase;
}

.nav { flex: 1; padding: 12px 0; }
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  font-size: 12px;
  color: var(--muted);
  border-left: 2px solid transparent;
  transition: all 0.15s;
  text-decoration: none;
  text-transform: lowercase;
  letter-spacing: 0.02em;
}
.nav-item:hover { color: var(--text); background: var(--surface2); }
.nav-item.active {
  color: var(--accent);
  border-left-color: var(--accent);
  background: rgba(200,240,96,0.05);
}
.nav-icon { display: flex; align-items: center; }

.main {
  flex: 1;
  overflow-y: auto;
  background: var(--bg);
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  font-size: 10px;
  color: var(--muted);
}
</style>
