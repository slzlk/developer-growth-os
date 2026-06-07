<template>
  <div>
    <PageHeader title="Workspace" sub="Build · Learn · Record · Grow" />

    <div class="content">
      <!-- Stats -->
      <div class="ws-grid">
        <div class="ws-stat" v-for="s in stats" :key="s.label">
          <div class="ws-stat-num" :style="{ color: s.color }">{{ s.num }}</div>
          <div class="ws-stat-label">{{ s.label }}</div>
        </div>
      </div>

      <!-- Recent Decisions -->
      <div class="ws-section">
        <div class="ws-section-title">recent decisions</div>
        <div v-if="store.recentDecisions.length === 0" style="font-size:11px;color:var(--muted)">
          no decisions yet
        </div>
        <div
          v-for="d in store.recentDecisions"
          :key="d.id"
          class="ws-recent-item"
        >
          <div class="ws-dot" style="background:var(--accent)"></div>
          <div style="flex:1;font-size:12px">{{ d.title }}</div>
          <div style="font-size:10px;color:var(--muted)">{{ d.date }}</div>
        </div>
      </div>

      <!-- Recent Ideas -->
      <div class="ws-section">
        <div class="ws-section-title">recent ideas</div>
        <div v-if="store.recentIdeas.length === 0" style="font-size:11px;color:var(--muted)">
          no ideas yet
        </div>
        <div
          v-for="i in store.recentIdeas"
          :key="i.id"
          class="ws-recent-item"
        >
          <div class="ws-dot" style="background:var(--accent2)"></div>
          <div style="flex:1;font-size:12px">{{ i.title }}</div>
          <div style="font-size:10px;color:var(--muted)">{{ i.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import PageHeader from '@/components/PageHeader.vue'

const store = useWorkspaceStore()

const stats = computed(() => [
  { label: 'projects',  num: store.projects.length,                          color: 'var(--accent3)' },
  { label: 'decisions', num: store.decisions.length,                         color: 'var(--accent)'  },
  { label: 'ideas',     num: store.ideas.length,                             color: 'var(--accent2)' },
  { label: 'active',    num: store.projects.filter(p=>p.status==='active').length, color: 'var(--accent)'  },
])
</script>

<style scoped>
.content { padding: 32px 40px; }

.ws-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.ws-stat {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 20px 24px;
}
.ws-stat-num {
  font-family: var(--font-head);
  font-size: 36px;
  font-weight: 800;
}
.ws-stat-label {
  font-size: 11px;
  color: var(--muted);
  margin-top: 4px;
}
.ws-section { margin-top: 28px; }
.ws-section-title {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
.ws-recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}
.ws-recent-item:last-child { border-bottom: none; }
.ws-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
