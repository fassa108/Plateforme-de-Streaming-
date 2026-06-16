<template>
  <div class="ligne" @click="play">
    <div class="info">
      <h3>{{ piste.titre }}</h3>
      <p>{{ piste.duree }}</p>
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
.ligne {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 10px;
  background: #1e293b;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.ligne:hover {
  background: #334155;
  transform: scale(1.01);
}

.info h3 {
  margin: 0;
  color: #fbbf24;
  font-size: 15px;
}

.info p {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}

.btn {
  background: #fbbf24;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>