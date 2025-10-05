<template>
  <div id="spotify-clone">
    <!-- INICIO: BARRA LATERAL (SIDEBAR) -->
    <aside class="sidebar">
      <div class="sidebar-section">
        <div class="sidebar-header">
          <span><Home /> Inicio</span>
        </div>
        <div class="sidebar-header">
          <span><Search /> Buscar</span>
        </div>
      </div>
      <div class="library">
        <div class="library-header">
          <span><BookCopy /> Tu biblioteca</span>
          <div>
            <Plus class="icon" />
            <ArrowRight class="icon" />
          </div>
        </div>
        <div class="library-filters">
          <button class="filter-btn active">Playlists</button>
          <button class="filter-btn">Álbumes</button>
          <button class="filter-btn">Artistas</button>
        </div>
        <div class="library-items">
          <div class="library-search">
              <Search class="search-icon"/>
              <span>Alfabéticamente <List /></span>
          </div>
          <ul>
            <li v-for="item in libraryItems" :key="item.title">
              <img :src="item.image" :alt="item.title" />
              <div>
                <p class="item-title">{{ item.title }}</p>
                <p class="item-subtitle">{{ item.subtitle }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <!-- FIN: BARRA LATERAL (SIDEBAR) -->

    <!-- INICIO: CONTENIDO PRINCIPAL (MAIN CONTENT) -->
    <main class="main-content">
      <header class="main-header">
        <div class="nav-buttons">
          <button><ChevronLeft /></button>
          <button><ChevronRight /></button>
        </div>
        <div class="top-filters">
            <button class="filter-btn active">Todo</button>
            <button class="filter-btn">Música</button>
            <button class="filter-btn">Podcasts</button>
        </div>
        <div class="user-actions">
          <button class="premium-btn">Explorar Premium</button>
          <Bell class="icon" />
          <Users class="icon" />
          <div class="user-profile">G</div>
        </div>
      </header>

      <div class="search-bar-mobile">
        <Search class="search-icon" />
        <input type="text" placeholder="¿Qué quieres reproducir?" />
      </div>

      <section class="content-section">
        <h2>Hecho para {{ username }}</h2>
        <div class="grid-container">
          <div class="card" v-for="card in madeForYou" :key="card.title">
            <div class="card-image" :style="{ backgroundColor: card.color }"></div>
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-subtitle">{{ card.artists }}</p>
          </div>
        </div>
      </section>
      <section class="content-section">
        <h2>Basado en lo último que escuchaste</h2>
        <div class="grid-container">
          <div v-for="card in recent" :key="card.title" class="card">
             <div class="card-image" :style="{ backgroundColor: card.color, backgroundImage: card.image ? `url(${card.image})` : 'none' }">
                <div v-if="card.special" class="special-tag">
                    <img v-if="card.special === 'netflix'" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1200px-Netflix_2015_N_logo.svg.png" alt="Netflix">
                    <span>{{ card.specialText }}</span>
                </div>
             </div>
             <h3 class="card-title">{{ card.title }}</h3>
             <p class="card-subtitle">{{ card.subtitle }}</p>
          </div>
        </div>
      </section>
    </main>
    <!-- FIN: CONTENIDO PRINCIPAL (MAIN CONTENT) -->

    <!-- INICIO: REPRODUCTOR (PLAYER BAR) -->
    <footer class="player-bar">
      <div class="player-controls">
        <Shuffle class="control-icon" />
        <SkipBack class="control-icon" />
        <button class="play-button">
          <Play />
        </button>
        <SkipForward class="control-icon" />
        <Repeat class="control-icon" />
      </div>
      <div class="progress-bar">
        <span>0:00</span>
        <div class="bar">
          <div class="progress"></div>
        </div>
        <span>0:00</span>
      </div>
       <div class="player-options">
            <Mic2 class="control-icon" />
            <ListMusic class="control-icon" />
            <MonitorSpeaker class="control-icon" />
            <Volume2 class="control-icon" />
            <div class="volume-bar"></div>
        </div>
    </footer>
    <!-- FIN: REPRODUCTOR (PLAYER BAR) -->
  </div>
</template>

<script>
import { 
    // Íconos de la barra lateral
    Home, BookCopy, Plus, ArrowRight, Search, List,
    // Íconos del contenido principal
    ChevronLeft, ChevronRight, Bell, Users,
    // Íconos del reproductor
    Shuffle, SkipBack, Play, SkipForward, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2
} from 'lucide-vue-next';

export default {
  name: 'SpotifyClone',
  components: {
    Home, BookCopy, Plus, ArrowRight, Search, List,
    ChevronLeft, ChevronRight, Bell, Users,
    Shuffle, SkipBack, Play, SkipForward, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2
  },
  data() {
    return {
      // Datos de la barra lateral
      libraryItems: [
        { title: 'Tus me gusta', subtitle: 'Playlist • 429 canciones', image: 'https://t.scdn.co/images/3099b3803ad9496896c43f2210d6b8de.png' },
        { title: '9Lana', subtitle: 'Artista', image: 'https://i.scdn.co/image/ab6761610000e5eb815b2ef6287f39446d8528ad' },
        { title: '9Lana Complete Collection', subtitle: 'Playlist • 9Lana', image: 'https://i.scdn.co/image/ab67706c0000da84523447936214ed037d80016e' },
        { title: 'Ado', subtitle: 'Artista', image: 'https://i.scdn.co/image/ab6761610000e5eb94632a93b843393392654874' },
        { title: 'Ado "Ready For My Show" Playlist', subtitle: 'Compilación • Ado', image: 'https://i.scdn.co/image/ab67706c0000da84de3c5ce1d2f2113331b62143' },
        { title: 'Ado\'s Best Adobum', subtitle: 'Álbum • Ado', image: 'https://i.scdn.co/image/ab67616d0000b2737618de441a5f6cf81a3818de'},
        { title: 'Ado\'s Utattemita Album', subtitle: 'Álbum • Ado', image: 'https://i.scdn.co/image/ab67616d0000b27391a27e738ed7b155979b44c2'},
        { title: 'Anime Openings Y Endings', subtitle: 'Playlist • Putupau', image: 'https://i.scdn.co/image/ab67706c0000da84e7159d332b5f6368b6b105a6'},
      ],
      // Datos del contenido principal
      username: 'SiriusW',
      madeForYou: [
        { title: '', artists: 'Ado, Mrs. GREEN APPLE, Ryokuous...', color: '#008080' },
        { title: '', artists: 'LiSA, Creepy Nuts, Shiro SAGISU y más', color: '#cd5c5c' },
        { title: '', artists: 'Cartel De Santa, Babo, Pacodify y más', color: '#b22222' },
        { title: '', artists: 'Lana Del Rey, Lady Gaga, Katy Perry y más', color: '#9932cc' },
        { title: '', artists: 'Imagine Dragons, Twenty One Pilots...', color: '#ff4500' },
      ],
      recent: [
        { title: 'Sonido contemporáneo', subtitle: '', color: '#4682b4' },
        { title: 'A mega Anime hits mix!', subtitle: '', color: '#2e8b57' },
        { title: 'The hottest Anime hits of', subtitle: '', color: '#556b2f' },
        { title: 'entering my villain era', subtitle: '', color: '#8b4513' },
        { title: 'Arcane Official Playlist', subtitle: 'Every legend has a beginning.', color: '#1e3a4c', image: 'https://i.scdn.co/image/ab67706f00000002891f7a68555095b871c8b356', special: 'netflix', specialText: 'Official Playlist' },
      ]
    };
  },
};
</script>

<style>
/* ESTILOS GLOBALES */
:root {
  --background-base: #000;
  --background-highlight: #121212;
  --background-press: #232323;
  --text-base: #fff;
  --text-subdued: #b3b3b3;
  --card-radius: 8px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--background-base);
  color: var(--text-base);
  overflow: hidden;
}

#spotify-clone {
  display: grid;
  grid-template-areas:
    'sidebar main-view'
    'player-bar player-bar';
  grid-template-columns: 350px 1fr; /* Ancho ajustado para la barra lateral */
  grid-template-rows: 1fr auto;
  height: 100vh;
  gap: 8px;
  padding: 8px;
  box-sizing: border-box;
}

/* ESTILOS DE LA BARRA LATERAL (SIDEBAR) */
.sidebar {
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sidebar-section, .library {
  background-color: var(--background-highlight);
  border-radius: var(--card-radius);
  padding: 8px 16px;
}
.sidebar-header, .library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-subdued);
  font-weight: bold;
  margin-bottom: 16px;
}
.sidebar-header span, .library-header span {
  display: flex;
  align-items: center;
  gap: 16px;
}
.icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
}
.library-filters {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}
.filter-btn {
  background-color: var(--background-press);
  color: var(--text-base);
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}
.filter-btn.active {
  background-color: #333;
}
.library-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-subdued);
  font-size: 14px;
  margin-bottom: 16px;
}
.search-icon { width: 20px; }
.library-items { overflow-y: auto; }
.library-items ul { list-style: none; padding: 0; margin: 0; }
.library-items li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}
.library-items li:hover { background-color: var(--background-press); }
.library-items li img {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
}
.item-title { margin: 0; font-weight: 500; font-size: 16px; }
.item-subtitle { margin: 0; color: var(--text-subdued); font-size: 14px; }

/* ESTILOS DEL CONTENIDO PRINCIPAL */
.main-content {
  grid-area: main-view;
  background: linear-gradient(to bottom, #222, #121212);
  border-radius: var(--card-radius);
  padding: 16px;
  overflow-y: auto;
}
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: sticky;
  top: 0;
  background: #1a1a1a;
  padding: 16px;
  margin: -16px -16px 16px -16px;
  z-index: 10;
}
.nav-buttons button {
  background-color: rgba(0,0,0,0.7);
  border: none;
  color: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.top-filters {
    position: absolute;
    left: 100px;
}
.user-actions { display: flex; align-items: center; gap: 16px; }
.premium-btn {
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}
.user-profile {
  width: 28px;
  height: 28px;
  background-color: #800080;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.search-bar-mobile { display: none; }
.content-section h2 { font-size: 24px; }
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}
.card {
  background-color: #181818;
  border-radius: var(--card-radius);
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
}
.card:hover { background-color: #282828; }
.card-image {
    width: 100%;
    padding-bottom: 100%; /* Aspect ratio 1:1 */
    border-radius: var(--card-radius);
    margin-bottom: 12px;
    background-size: cover;
    background-position: center;
    position: relative;
}
.special-tag {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    flex-direction: column;
}
.special-tag img { width: 20px; }
.special-tag span { font-weight: bold; color: white; margin-top: 4px; }
.card-title { margin: 0 0 4px 0; font-size: 16px; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-subtitle { 
  margin: 0; 
  font-size: 14px; 
  color: var(--text-subdued); 
  display: -webkit-box; 
  -webkit-line-clamp: 2; 
  line-clamp: 2;
  -webkit-box-orient: vertical; 
  overflow: hidden; 
}


/* ESTILOS DEL REPRODUCTOR */
.player-bar {
  grid-area: player-bar;
  padding: 12px 16px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 16px;
}
.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.control-icon {
  width: 20px;
  height: 20px;
  color: var(--text-subdued);
  cursor: pointer;
}
.control-icon:hover { color: var(--text-base); }
.play-button {
  background-color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.play-button svg { color: #000; }
.progress-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.progress-bar .bar {
  width: 100%;
  background-color: #535353;
  height: 4px;
  border-radius: 2px;
}
.progress-bar .progress {
  background-color: var(--text-subdued);
  height: 100%;
  width: 10%;
  border-radius: 2px;
}
.player-options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
}
.volume-bar {
    width: 80px;
    height: 4px;
    background-color: #535353;
    border-radius: 2px;
}
</style>