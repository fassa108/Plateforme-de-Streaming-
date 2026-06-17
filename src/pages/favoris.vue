<template>
  <div class="min-h-screen bg-slate-950 text-white p-8">

    <!-- HERO -->
    <div class="mb-10">
      <h1 class="text-5xl font-bold text-yellow-400 mb-2">
        Mes Favoris
      </h1>

      <p class="text-slate-400">
        Albums enregistrés
      </p>
    </div>

    <!-- VIDE -->
    <div
      v-if="albumsFavoris.length === 0"
      class="flex flex-col items-center justify-center py-20"
    >
      <div class="text-6xl mb-4">
        ⭐
      </div>

      <h2 class="text-2xl font-semibold mb-2">
        Aucun favori
      </h2>

      <p class="text-slate-400">
        Ajoutez des albums à vos favoris pour les retrouver ici.
      </p>
    </div>

    <!-- ALBUMS -->
    <div
      v-else
      class="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
    >
      <CarteAlbum
        v-for="album in albumsFavoris"
        :key="album.id"
        :album="album"
        @favoriChange="chargerFavoris"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CarteAlbum from '../components/CarteAlbum.vue'
import { albums } from '../data/albums'

const albumsFavoris = ref([])

function chargerFavoris() {
  const ids = JSON.parse(
    localStorage.getItem('favoris') || '[]'
  )

  albumsFavoris.value = albums.filter(
    album => ids.includes(album.id)
  )
}

onMounted(() => {
  chargerFavoris()
})
</script>