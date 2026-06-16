<template>
  <div class="ligne" @click="play">

    <div class="info">
      <p class="numero">{{ piste.id }}</p>
      <h3>{{ piste.titre }}</h3>
    </div>

    <button class="btn">▶</button>

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

<style scoped>
.ligne{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#0b1220;
  padding:15px;
  margin-bottom:10px;
  border-radius:12px;
  cursor:pointer;
}


.ligne:hover{
  background:#111827;
}

.info{
  display:flex;
  align-items:center;
  gap:10px;
}

.numero{
  color:#fbbf24;
  font-weight:bold;
}

.btn{
  border:none;
  background:#fbbf24;
  padding:8px 12px;
  border-radius:8px;
  cursor:pointer;
  font-weight:bold;
}
</style>