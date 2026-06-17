<template>
  <div class="min-h-screen bg-slate-950 text-white p-8">

    <!-- HERO -->
    <div class="mb-12">

      <h1
        class="text-5xl md:text-6xl font-bold text-yellow-400 mb-3"
      >
        Bibliothèque Coranique
      </h1>

      <p class="text-slate-400 text-lg">
        Écoutez vos récitations préférées
      </p>

    </div>

    <!-- SECTION -->
    <section>

      <h2
        class="text-3xl font-bold mb-8"
      >
        Nouveaux Albums
      </h2>

      <div
        class="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
      >

        <CarteAlbum
          v-for="album in albums"
          :key="album.id"
          :album="album"
        />

      </div>

    </section>

  </div>
</template>

<script setup>
import CarteAlbum from '../components/CarteAlbum.vue'
import { albums } from '../data/albums'
</script>