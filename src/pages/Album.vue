<template>
  <div class="album-view">
    <router-link to="/">← Retour</router-link>

    <div v-if="!album">
      <p>Album introuvable</p>
    </div>

    <div v-else>
      <div class="album-header">
        <img v-if="album.cover" :src="album.cover" />
        <div v-else class="cover-placeholder"></div>

        <h1>{{ album.titre }}</h1>
        <p>{{ album.recitateur }}</p>
        <p>{{ album.genre }}</p>
      </div>

      <div class="liste-sourates">
        <h2>Sourates</h2>

        <LigneSourate
          v-for="piste in album.pistes"
          :key="piste.id"
          :piste="piste"
          @play="jouerPiste"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { albums } from '../data/albums.js'
import LigneSourate from '../components/LigneSourate.vue'

const route = useRoute()
const album = ref(null)

const emit = defineEmits(['pisteChoisie'])

function jouerPiste(piste) {
  emit('pisteChoisie', piste)
}

onMounted(() => {
  const id = Number(route.params.id)
  album.value = albums.find(a => a.id === id)
})
</script>