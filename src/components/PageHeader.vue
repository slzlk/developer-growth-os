<template>
  <div class="page-header">
    <div>
      <div class="page-title">{{ title }}</div>
      <div class="page-sub">{{ sub }}</div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; sub: string }>()
</script>

<style scoped>
.page-header {
  padding: 32px 40px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.page-title {
  font-family: var(--font-head);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
}
.page-sub {
  font-size: 11px;
  color: var(--muted);
  margin-top: 4px;
}
</style>
