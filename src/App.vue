<template>
  <div>
    <router-view @pisteChoisie="changerPiste" />

    
    <div class="lecteur">

      <div v-if="!sourateActuelle" class="lecteur-vide">
        <p>Aucune Sourate Selectionnee</p>
      </div>

      <div v-else class="lecteur-actif">
        <div class="lecteur-info">
          <span>🎵</span>
          <p>{{ sourateActuelle.titre }}</p>
        </div>
        <audio
          :src="sourateActuelle.src"
          controls
          autoplay
          ref="audioRef"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const sourateActuelle = ref(null)
const audioRef = ref(null)

function changerPiste(piste) {
  sourateActuelle.value = piste
}

watch(sourateActuelle, () => {
  if (audioRef.value) {
    audioRef.value.load()
    audioRef.value.play()
  }
})
</script>