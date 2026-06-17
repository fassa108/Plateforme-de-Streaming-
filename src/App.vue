<template>
  <div class="flex h-screen bg-slate-950 text-white">

    <!-- SIDEBAR -->
    <aside
      class="fixed left-0 top-0 bottom-0 w-[250px] bg-slate-900 border-r border-slate-800 p-5"
    >

      <h2 class="mb-8 text-2xl font-bold text-yellow-400">
        Quran App
      </h2>

      <nav>

        <p class="mb-3 text-sm text-slate-400">
          Bibliothèquea
        </p>

        <ul class="space-y-2">

          <li>
            <router-link
              to="/"
              class="flex items-center gap-3 rounded-lg p-3 text-white transition hover:bg-slate-800"
              active-class="bg-slate-800 text-yellow-400 font-bold"
            >
              <LibraryBig :size="20" />
              <span>Albums</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/favoris"
              class="flex items-center gap-3 rounded-lg p-3 text-white transition hover:bg-slate-800"
              active-class="bg-slate-800 text-yellow-400 font-bold"
            >
              <Star :size="20" />
              <span>Favoris</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/recents"
              class="flex items-center gap-3 rounded-lg p-3 text-white transition hover:bg-slate-800"
              active-class="bg-slate-800 text-yellow-400 font-bold"
            >
              <History :size="20" />
              <span>Récents</span>
            </router-link>
          </li>

        </ul>

      </nav>

    </aside>

    <!-- CONTENT -->
    <main
      class="ml-[250px] flex-1 overflow-y-auto p-5 pb-32"
    >

      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          @pisteChoisie="changerPiste"
        />
      </router-view>

    </main>

    <!-- PLAYER -->
    <div
  class="fixed bottom-0 left-[270px] right-5 border border-slate-800 rounded-t-xl bg-slate-900 px-4 py-3 shadow-lg"
>

      <div
        v-if="!sourateActuelle"
        class="text-slate-400"
      >
        🎧 Aucune sourate sélectionnée
      </div>

      <div
        v-else
        class="flex items-center gap-4"
      >

        <div>

          <img
            v-if="sourateActuelle.cover"
            :src="sourateActuelle.cover"
            alt="cover"
            class="h-[50px] w-[50px] rounded-lg border-2 border-yellow-400 object-cover"
          >

          <div
            v-else
            class="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-slate-700 bg-slate-950"
          >
            🎵
          </div>

        </div>

        <div class="flex-1">

          <p class="font-bold">
            {{ sourateActuelle.titre }}
          </p>

          <p class="text-xs text-slate-400">
            {{ sourateActuelle.recitateur || 'Récitation' }}
          </p>

        </div>

        <audio
          ref="audioRef"
          :src="sourateActuelle.audio"
          controls
          autoplay
        />

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import {
  LibraryBig,
  Star,
  History
} from 'lucide-vue-next'

const sourateActuelle = ref(null)
const audioRef = ref(null)

function changerPiste(piste) {
  sourateActuelle.value = piste
}

watch(sourateActuelle, async () => {
  if (audioRef.value) {
    audioRef.value.load()

    try {
      await audioRef.value.play()
    } catch (e) {
      console.log(e)
    }
  }
})
</script>


