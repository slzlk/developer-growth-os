import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  desc: string
  status: 'active' | 'paused' | 'done'
  tech: string
  date: string
}

export interface Decision {
  id: string
  title: string
  why: string
  context: string
  project: string
  date: string
}

export interface Idea {
  id: string
  title: string
  detail: string
  project: string
  status: 'captured' | 'in-progress' | 'done'
  date: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 8)
const today = () => new Date().toLocaleDateString('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit'
})

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}
function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

// ─── Store ────────────────────────────────────────────────────────────────────
export const useWorkspaceStore = defineStore('workspace', () => {
  const projects  = ref<Project[]>(load('lili-projects',  []))
  const decisions = ref<Decision[]>(load('lili-decisions', []))
  const ideas     = ref<Idea[]>(load('lili-ideas',     []))

  // Projects
  function addProject(data: Omit<Project, 'id' | 'date'>) {
    projects.value.push({ id: uid(), date: today(), ...data })
    save('lili-projects', projects.value)
  }
  function removeProject(id: string) {
    projects.value = projects.value.filter(p => p.id !== id)
    save('lili-projects', projects.value)
  }

  // Decisions
  function addDecision(data: Omit<Decision, 'id' | 'date'>) {
    decisions.value.push({ id: uid(), date: today(), ...data })
    save('lili-decisions', decisions.value)
  }
  function removeDecision(id: string) {
    decisions.value = decisions.value.filter(d => d.id !== id)
    save('lili-decisions', decisions.value)
  }

  // Ideas
  function addIdea(data: Omit<Idea, 'id' | 'date'>) {
    ideas.value.push({ id: uid(), date: today(), ...data })
    save('lili-ideas', ideas.value)
  }
  function removeIdea(id: string) {
    ideas.value = ideas.value.filter(i => i.id !== id)
    save('lili-ideas', ideas.value)
  }
  function promoteIdea(id: string) {
    const idea = ideas.value.find(i => i.id === id)
    if (idea) { idea.status = 'in-progress'; save('lili-ideas', ideas.value) }
  }

  // Computed
  const recentDecisions = computed(() =>
    [...decisions.value].reverse().slice(0, 3)
  )
  const recentIdeas = computed(() =>
    [...ideas.value].reverse().slice(0, 3)
  )
  const projectNames = computed(() => projects.value.map(p => p.title))

  return {
    projects, decisions, ideas,
    addProject, removeProject,
    addDecision, removeDecision,
    addIdea, removeIdea, promoteIdea,
    recentDecisions, recentIdeas, projectNames
  }
})
