import { createRouter, createWebHashHistory } from 'vue-router'
import WorkspaceView from '@/views/WorkspaceView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import DecisionsView from '@/views/DecisionsView.vue'
import IdeasView from '@/views/IdeasView.vue'

const router = createRouter({
  // Hash history works with GitHub Pages without server config
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',           component: WorkspaceView },
    { path: '/projects',   component: ProjectsView  },
    { path: '/decisions',  component: DecisionsView },
    { path: '/ideas',      component: IdeasView     },
  ]
})

export default router
