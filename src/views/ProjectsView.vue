<template>
  <div>
    <PageHeader title="Projects" sub="all real projects">
      <button class="btn btn-primary" @click="showModal = true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        new project
      </button>
    </PageHeader>

    <div class="content">
      <div v-if="store.projects.length === 0" class="empty">
        <div class="empty-glyph">◈</div>
        no projects yet — add your first
      </div>

      <div v-for="p in store.projects" :key="p.id" class="card">
        <div class="card-header">
          <div>
            <div class="card-title">{{ p.title }}</div>
            <div class="card-meta">
              <span :class="`status status-${p.status}`">{{ p.status }}</span>
              <span v-if="p.tech" class="tag">{{ p.tech }}</span>
              <span>{{ p.date }}</span>
            </div>
          </div>
          <button class="btn btn-danger" @click="store.removeProject(p.id)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
          </button>
        </div>
        <div v-if="p.desc" class="card-body">{{ p.desc }}</div>
      </div>
    </div>

    <AppModal v-if="showModal" title="new project" @close="reset" @save="save">
      <div class="form-group">
        <label class="form-label">project name</label>
        <input class="form-input" v-model="form.title" placeholder="e.g. 微信小程序智能助手" />
      </div>
      <div class="form-group">
        <label class="form-label">description</label>
        <textarea class="form-textarea" v-model="form.desc" placeholder="what is this project about?" />
      </div>
      <div class="form-group">
        <label class="form-label">tech stack</label>
        <input class="form-input" v-model="form.tech" placeholder="e.g. Vue3 / TypeScript" />
      </div>
      <div class="form-group">
        <label class="form-label">status</label>
        <select class="form-select" v-model="form.status">
          <option value="active">active</option>
          <option value="paused">paused</option>
          <option value="done">done</option>
        </select>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import PageHeader from '@/components/PageHeader.vue'
import AppModal from '@/components/AppModal.vue'

const store = useWorkspaceStore()
const showModal = ref(false)
const form = reactive({ title: '', desc: '', tech: '', status: 'active' as const })

function save() {
  if (!form.title.trim()) return
  store.addProject({ ...form })
  reset()
}
function reset() {
  showModal.value = false
  Object.assign(form, { title: '', desc: '', tech: '', status: 'active' })
}
</script>

<style scoped>
.content { padding: 32px 40px; }
.card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.card-title { font-family: var(--font-head); font-size: 14px; font-weight: 700; }
.card-meta { font-size: 10px; color: var(--muted); margin-top: 6px; display: flex; gap: 10px; align-items: center; }
.card-body { font-size: 12px; color: #aaabb8; margin-top: 10px; line-height: 1.7; }
</style>
