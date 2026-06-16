<template>
  <div class="album-view">

    <router-link class="back" to="/">
      ← Retour
    </router-link>

    <div v-if="!album">
      Album introuvable
    </div>

    <div v-else>

      <!-- HEADER -->
      <div class="album-header">

        <img
          v-if="album.cover"
          :src="album.cover"
          :alt="album.titre"
        >

        <h1>{{ album.titre }}</h1>

        <p>{{ album.recitateur }}</p>
        <p>{{ album.genre }}</p>

      </div>

      <!-- LISTE -->
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
import { albums } from '../data/albums'
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

<style scoped>
.album-view{
  max-width:900px;
  margin:auto;
}

.back{
  color:#fbbf24;
  text-decoration:none;
}

/* HEADER PROPRE */
.album-header{
  text-align:center;
  background:#0b1220;
  padding:25px;
  border-radius:20px;
  margin-top:20px;
  transition:0.2s;
  position:relative;
  overflow:hidden;
}

/* hover SANS masque image */
.album-header:hover{
  transform:translateY(-2px);
  box-shadow:0 10px 25px rgba(0,0,0,0.3);
}

/* IMAGE PROTÉGÉE (IMPORTANT) */
.album-header img{
  width:220px;
  height:220px;
  object-fit:cover;
  border-radius:15px;
  border:2px solid #fbbf24;

  /* 🔥 FIX ANTI MASQUE */
  filter:none !important;
  opacity:1 !important;
  transition:none !important;
}

/* ❌ BLOQUER TOUT OVERLAY INVISIBLE */
.album-header::before,
.album-header::after{
  content:none !important;
  display:none !important;
}
</style>