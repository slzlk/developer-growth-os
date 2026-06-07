<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal-title">{{ title }}</div>
        <slot />
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="$emit('close')">cancel</button>
          <button class="btn btn-primary" @click="$emit('save')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>
            save
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
defineEmits<{ close: []; save: [] }>()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}
.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 28px;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-title {
  font-family: var(--font-head);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}
.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
