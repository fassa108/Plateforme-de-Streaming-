<template>
  <div
    @click="play"
    class="flex items-center justify-between bg-slate-950 hover:bg-slate-900 p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 group"
  >

    <div class="flex items-center gap-3">

      <p class="text-yellow-400 font-bold min-w-6">
        {{ piste.id }}
      </p>

      <h3 class="text-white font-medium">
        {{ piste.titre }}
      </h3>

    </div>

    <button
      class="bg-yellow-400 text-slate-950 px-3 py-2 rounded-lg font-bold transition-all duration-200 hover:scale-105 group-hover:bg-yellow-300"
    >
      ▶
    </button>

  </div>
</template>

<script setup>
const props = defineProps({
  piste: Object
})

const emit = defineEmits(['play'])

function play() {
  emit('play', props.piste)
}
</script>