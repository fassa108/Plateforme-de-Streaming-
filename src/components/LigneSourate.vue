<template>
  <div class="ligne-sourate" @click="jouer">
    <span class="numero">{{ piste.id }}</span>
    <span class="titre">{{ piste.titre }}</span>
    <span class="icone">▶</span>
  </div>
</template>

<script setup>
const props = defineProps({
  piste: Object
})

const emit = defineEmits(['play'])

function jouer() {
  emit('play', props.piste)
}
</script>