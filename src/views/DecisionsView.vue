<template>
  <div>
    <PageHeader title="Decisions" sub="记录决策，减少重复思考">
      <button class="btn btn-primary" @click="showModal = true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        record decision
      </button>
    </PageHeader>

    <div class="content">
      <div v-if="store.decisions.length === 0" class="empty">
        <div class="empty-glyph">★</div>
        record your first decision — stop re-thinking
      </div>

      <div v-for="d in reversed" :key="d.id" class="card">
        <div class="card-header">
          <div>
            <div class="card-title">{{ d.title }}</div>
            <div class="card-meta">
              <span v-if="d.project" class="tag tag-accent">{{ d.project }}</span>
              <span>{{ d.date }}</span>
            </div>
          </div>
          <button class="btn btn-danger" @click="store.removeDecision(d.id)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
          </button>
        </div>
        <div v-if="d.why" class="card-section">
          <div class="section-label">why</div>
          <div class="card-body">{{ d.why }}</div>
        </div>
        <div v-if="d.context" class="card-section">
          <div class="section-label">context</div>
          <div class="card-body">{{ d.context }}</div>
        </div>
      </div>
    </div>

    <AppModal v-if="showModal" title="record decision" @close="reset" @save="save">
      <div class="form-group">
        <label class="form-label">decision</label>
        <input class="form-input" v-model="form.title" placeholder="e.g. MVP 只保留四个模块" />
      </div>
      <div class="form-group">
        <label class="form-label">why — the core reason</label>
        <textarea class="form-textarea" v-model="form.why" placeholder="为什么这样决定？以后不用重新思考。" />
      </div>
      <div class="form-group">
        <label class="form-label">context (optional)</label>
        <textarea class="form-textarea" v-model="form.context" placeholder="background, alternatives considered..." />
      </div>
      <div class="form-group">
        <label class="form-label">project (optional)</label>
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
const form = reactive({ title: '', why: '', context: '', project: '' })

const reversed = computed(() => [...store.decisions].reverse())

function save() {
  if (!form.title.trim()) return
  store.addDecision({ ...form })
  reset()
}
function reset() {
  showModal.value = false
  Object.assign(form, { title: '', why: '', context: '', project: '' })
}
</script>

<style scoped>
.content { padding: 32px 40px; }
.card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.card-title { font-family: var(--font-head); font-size: 14px; font-weight: 700; }
.card-meta { font-size: 10px; color: var(--muted); margin-top: 6px; display: flex; gap: 10px; align-items: center; }
.card-section { margin-top: 12px; }
.section-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.card-body { font-size: 12px; color: #aaabb8; line-height: 1.7; }
</style>
