<template>
  <div class="min-h-screen bg-slate-950 text-white p-4 lg:p-8">

    <!-- HERO -->
    <div class="mb-6 lg:mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
      <div>
        <h1 class="text-2xl lg:text-4xl font-bold text-yellow-400">
          Bibliothèque Coranique
        </h1>

        <p class="mt-2 text-sm lg:text-base text-slate-400">
          Écoutez vos récitations préférées
        </p>
      </div>

      <!-- RECHERCHE -->
      <div class="mt-2 lg:mt-0 w-full lg:w-[400px] lg:ml-auto">
        <input
          v-model="recherche"
          type="text"
          placeholder="🔍 Rechercher un album..."
          class="w-full rounded-2xl border border-yellow-400 bg-slate-900 px-5 py-3 text-white outline-none transition focus:border-yellow-500"
        >
      </div>
    </div>

    <!-- SECTION -->
    <section>

      <h2 class="text-3xl font-bold mb-8">
        Nouveaux Albums
      </h2>

      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >

        <CarteAlbum
          v-for="album in albumsFiltres"
          :key="album.id"
          :album="album"
        />

      </div>

      <p
        v-if="albumsFiltres.length === 0"
        class="mt-8 text-center text-slate-400"
      >
        Aucun album trouvé pour "{{ recherche }}"
      </p>

    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CarteAlbum from '../components/CarteAlbum.vue'
import { albums } from '../data/albums'

const recherche = ref('')

const albumsFiltres = computed(() => {
  if (recherche.value.trim() === "" ) {
    return albums
  }

  recherche.value = recherche.value.trim()
  return albums.filter(album =>
    album.titre
      .toLowerCase()
      .includes(recherche.value.toLowerCase()) ||
    album.recitateur
      .toLowerCase()
      .includes(recherche.value.toLowerCase())
  )
})
</script>