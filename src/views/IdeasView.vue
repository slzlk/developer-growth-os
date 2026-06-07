<template>
  <div>
    <PageHeader title="Ideas" sub="先记录，不立即开发">
      <button class="btn btn-primary" @click="showModal = true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        capture idea
      </button>
    </PageHeader>

    <div class="content">
      <div v-if="store.ideas.length === 0" class="empty">
        <div class="empty-glyph">✦</div>
        capture ideas — don't build yet, just record
      </div>

      <div v-for="i in reversed" :key="i.id" class="card">
        <div class="card-header">
          <div>
            <div class="card-title">{{ i.title }}</div>
            <div class="card-meta">
              <span :style="{ color: statusColor[i.status], fontSize: '10px' }">{{ i.status }}</span>
              <span v-if="i.project" class="tag tag-accent">{{ i.project }}</span>
              <span>{{ i.date }}</span>
            </div>
          </div>
          <div style="display:flex;gap:4px">
            <button
              v-if="i.status === 'captured'"
              class="btn btn-ghost"
              style="padding:4px 10px;font-size:10px"
              @click="store.promoteIdea(i.id)"
            >
              → build
            </button>
            <button class="btn btn-danger" @click="store.removeIdea(i.id)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
            </button>
          </div>
        </div>
        <div v-if="i.detail" class="card-body">{{ i.detail }}</div>
      </div>
    </div>

    <AppModal v-if="showModal" title="capture idea" @close="reset" @save="save">
      <div class="form-group">
        <label class="form-label">idea</label>
        <input class="form-input" v-model="form.title" placeholder="e.g. 给 Decision 增加关联 Project" />
      </div>
      <div class="form-group">
        <label class="form-label">detail (optional)</label>
        <textarea class="form-textarea" v-model="form.detail" placeholder="先记录，不立即开发。真正用到再做。" />
      </div>
      <div class="form-group">
        <label class="form-label">related project (optional)</label>
        <select class="form-select" v-model="form.project">
          <option value="">— none —</option>
          <option v-for="name in store.projectNames" :key="name" :value="name">{{ name }}</option>
        </select>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import PageHeader from '@/components/PageHeader.vue'
import AppModal from '@/components/AppModal.vue'

const store = useWorkspaceStore()
const showModal = ref(false)
const form = reactive({ title: '', detail: '', project: '' })

const reversed = computed(() => [...store.ideas].reverse())

const statusColor: Record<string, string> = {
  'captured':    'var(--muted)',
  'in-progress': 'var(--accent)',
  'done':        '#64c864',
}

function save() {
  if (!form.title.trim()) return
  store.addIdea({ ...form, status: 'captured' })
  reset()
}
function reset() {
  showModal.value = false
  Object.assign(form, { title: '', detail: '', project: '' })
}
</script>

<style scoped>
.content { padding: 32px 40px; }
.card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.card-title { font-family: var(--font-head); font-size: 14px; font-weight: 700; }
.card-meta { font-size: 10px; color: var(--muted); margin-top: 6px; display: flex; gap: 10px; align-items: center; }
.card-body { font-size: 12px; color: #aaabb8; margin-top: 10px; line-height: 1.7; }
</style>
