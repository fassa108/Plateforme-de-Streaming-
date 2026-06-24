# Plateforme de Streaming Coranique
> Une application Vue 3 + Vite pour écouter vos récitations préférées

---

## 1. Présentation du projet

Cette application est une plateforme de streaming coranique construite avec **Vue 3** et **Vite**. Elle permet de :

- Parcourir une **bibliothèque d'albums** de récitation du Coran
- **Rechercher** un album par titre ou par réciteur
- **Écouter** les sourates grâce à un lecteur audio persistant en bas de l'écran

L'interface est entièrement **responsive** :
- Sur ordinateur : une barre latérale fixe pour naviguer entre les pages
- Sur mobile : un menu "burger" en haut de l'écran
- Le lecteur audio reste visible en bas sur toutes les tailles d'écran

---

## 2. Installation et lancement

### Prérequis

- **Node.js** v18 ou plus
- **npm** (installé avec Node.js)
- **Git**

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/fassa108/plateforme_streaming_vuejs.git
cd plateforme_streaming_vuejs

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Ouvrez ensuite **http://localhost:5173/** dans votre navigateur.

```bash
# Pour construire la version de production
npm run build
```

---

## 3. Architecture et découpage

### Structure des fichiers

```
src/
├── main.js                  → Point d'entrée, monte App.vue + router
├── App.vue                  → Parent principal : layout, lecteur audio, état global
├── router/
│   └── index.js             → Déclaration des routes
├── pages/
│   ├── Home.vue             → Page d'accueil : liste des albums + recherche
│   ├── Album.vue            → Page détail d'un album : liste des sourates
│   └── Favoris.vue          → Page des favoris
├── components/
│   ├── CarteAlbum.vue       → Carte visuelle d'un album
│   └── LigneSourate.vue     → Ligne cliquable pour chaque sourate
└── data/
    └── albums.js            → Données mockées (albums + pistes)
```

### Relations entre composants

```
App.vue (parent global)
├── <router-view>
│     ├── Home.vue
│     │     └── CarteAlbum.vue (x plusieurs)
│     ├── Album.vue
│     │     └── LigneSourate.vue (x plusieurs)
│     │           └── $emit → remonte jusqu'à App.vue
│     └── Favoris.vue
└── Lecteur Audio (fixe en bas)
```

### Flux des données

```
Clic sur LigneSourate
  → $emit('pisteChoisie') vers Album.vue
    → $emit('pisteChoisie') vers App.vue
      → sourateActuelle = piste
        → Lecteur audio joue 
```

---

## 4. Gestion de la donnée

### Où sont stockées les données ?

Les données sont stockées localement dans :

```
src/data/albums.js
```

### Structure d'un album

```js
export const albums = [
  {
    id: 1,
    titre: "Al-Fatiha & Les courtes sourates",
    recitateur: "Sheikh Sudais",
    cover: "/images/image.png",
    genre: "Récitation",
    pistes: [
      { id: 1, titre: "Al-Fatiha", audio: "/audio/001.mp3" },
      { id: 2, titre: "Al-Ikhlas", audio: "/audio/112.mp3" },
    ],
  },
]
```

### Comment sont utilisées les données ?

**Dans `Home.vue`** — import et filtre en temps réel :
```js
import { albums } from '../data/albums'

const albumsFiltres = computed(() => {
  return albums.filter(album =>
    album.titre.toLowerCase().includes(recherche.value.toLowerCase()) ||
    album.recitateur.toLowerCase().includes(recherche.value.toLowerCase())
  )
})
```

**Dans `CarteAlbum.vue`** — affichage + gestion des favoris via `localStorage`

**Dans `LigneSourate.vue`** — émission d'événement au clic vers `App.vue`

### Gestion du lecteur audio global

Dans `App.vue`, l'état de la piste est surveillé avec `watch` :

```js
const sourateActuelle = ref(null)
const audioRef = ref(null)

watch(sourateActuelle, async () => {
  if (audioRef.value) {
    audioRef.value.load()
    await audioRef.value.play()
  }
})
```

Le `<audio>` est placé dans le layout global pour **survivre aux changements de page**.

---

## 5. Responsivité

| Ecran | Comportement |
|---|---|
| Desktop | Sidebar fixe à gauche, grille 3 colonnes, lecteur en bas à droite |
| Mobile | Menu burger en haut, grille 1 colonne, lecteur pleine largeur en bas |

---

## 6. Technologies utilisées

| Technologie | Rôle |
|---|---|
| Vue 3 | Framework JavaScript |
| Vite | Outil de build |
| Vue Router | Gestion des routes |
| Tailwind CSS v4 | Styles et responsive |
| Lucide Vue | Icônes |
| HTML Audio API | Lecture audio native |