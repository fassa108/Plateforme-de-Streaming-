<template>
  <div class="max-w-5xl mx-auto">

    <!-- RETOUR -->
    <router-link
      to="/"
      class="inline-block mb-6 text-yellow-400 hover:text-yellow-300 transition"
    >
      ← Retour
    </router-link>

    <div v-if="!album">
      <p class="text-white">
        Album introuvable
      </p>
    </div>

    <div v-else>

      <!-- HEADER -->
      <div
        class="bg-slate-950 rounded-3xl p-8 mb-10 shadow-lg"
      >

        <div
          class="flex flex-col md:flex-row items-center gap-8"
        >

          <img
            v-if="album.cover"
            :src="album.cover"
            :alt="album.titre"
            class="w-56 h-56 object-cover rounded-2xl border-2 border-yellow-400 shadow-xl"
          >

          <div>

            <p class="text-slate-400 uppercase text-sm mb-2">
              Album
            </p>

            <h1
              class="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {{ album.titre }}
            </h1>

            <p class="text-lg text-slate-300">
              {{ album.recitateur }}
            </p>

            <p class="text-slate-500 mt-2">
              {{ album.genre }}
            </p>

            <p class="text-slate-400 mt-4">
              {{ album.pistes.length }} sourates
            </p>

          </div>

        </div>

      </div>

      <!-- LISTE -->
      <div>

        <h2
          class="text-2xl font-bold text-white mb-6"
        >
          Sourates
        </h2>

        <div class="space-y-2">

          <LigneSourate
            v-for="piste in album.pistes"
            :key="piste.id"
            :piste="piste"
            @play="jouerPiste"
          />

        </div>

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

  album.value = albums.find(
    a => a.id === id
  )
})
</script>