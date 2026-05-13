<script setup>
defineProps({
  title: { type: String, default: '' }
})

defineEmits(['quickLog'])
</script>

<template>
  <header class="sticky top-0 z-40 bg-[#131313]/80 backdrop-blur-md border-b border-outline-variant/10">
    <div class="flex justify-between items-center w-full px-container-margin py-base max-w-7xl mx-auto">
      <div class="flex flex-col">
        <span class="text-label-sm text-on-surface-variant tracking-widest uppercase">Bienvenido</span>
        <h2 class="text-display-lg font-bold text-primary-fixed tracking-tight">¡Hola, Atleta!</h2>
      </div>
      <div class="flex items-center gap-md">
        <button class="p-base text-on-surface-variant hover:text-primary-fixed transition-colors cursor-pointer">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <button class="p-base text-on-surface-variant hover:text-primary-fixed transition-colors cursor-pointer">
          <span class="material-symbols-outlined">settings</span>
        </button>
      </div>
    </div>
  </header>
</template>
