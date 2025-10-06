<template>
    <div id="spotify-clone" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
        <!-- INICIO: BARRA LATERAL (SIDEBAR) -->
        <aside class="sidebar">
            <div class="library">
                <div class="library-header">
                    <button @click="toggleSidebar" class="library-title-button">
                        <BookCopy />
                        <span class="library-title-text">Tu biblioteca</span>
                    </button>
                </div>
                <!-- Usamos v-show para ocultar y mostrar estos elementos con una posible animación -->
                <div v-show="!isSidebarCollapsed" class="library-content">
                    <div class="library-filters">
                        <!-- MODIFICADO: Botones de filtro ahora son dinámicos -->
                        <button v-for="filter in libraryFilters" :key="filter" @click="setLibraryFilter(filter)"
                            :class="{ 'active': activeLibraryFilter === filter }" class="filter-btn">
                            {{ filter }}
                        </button>
                    </div>
                    <div class="library-items">
                        <!-- INICIO: SECCIÓN DE BÚSQUEDA DINÁMICA -->
                        <div class="library-search-container">
                            <!-- VISTA POR DEFECTO: Se muestra cuando NO se está buscando -->
                            <div v-if="!isLibrarySearching" class="search-default-view">
                                <button @click="startLibrarySearch" class="search-action-button">
                                    <Search class="search-icon" />
                                </button>
                            </div>

                            <!-- VISTA DE BÚSQUEDA: Se muestra cuando isLibrarySearching es true -->
                            <div v-else class="search-active-view">
                                <Search class="search-icon-active" />
                                <input ref="librarySearchInput" type="text" placeholder="Buscar en Tu biblioteca"
                                    v-model="librarySearchQuery" @blur="stopLibrarySearch" />
                                <button v-if="librarySearchQuery" @click="clearLibrarySearch" class="clear-button">
                                    <X class="clear-icon" />
                                </button>
                            </div>
                        </div>
                        <!-- FIN: SECCIÓN DE BÚSQUEDA DINÁMICA -->

                        <!-- AÑADIDO: Lista dinámica que muestra los items filtrados -->
                        <ul class="item-list-container">
                            <li v-for="item in filteredLibraryItems" :key="item.id">
                                <img :src="item.image" :alt="item.title" />
                                <div>
                                    <p class="item-title">{{ item.title }}</p>
                                    <p class="item-subtitle">{{ item.subtitle }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
        <!-- FIN: BARRA LATERAL (SIDEBAR) -->

        <!-- INICIO: CONTENIDO PRINCIPAL (MAIN CONTENT) -->
        <main class="main-content">
            <header class="main-header">

                <!-- MODIFICADO: Barra de Búsqueda Principal Corregida -->
                <div class="search-bar">
                    <button class="sidebar-button">
                        <Search class="search-icon" />
                    </button>
                    <input ref="mainSearchInput" type="text" placeholder="¿Qué quieres reproducir?" v-model="mainSearchQuery" />
                    <button v-if="mainSearchQuery" @click="clearMainSearch" class="clear-button">
                        <X class="clear-icon" />
                    </button>
                </div>

                <!-- INICIO: MENÚ DESPLEGABLE DE USUARIO (REEMPLAZA AL BOTÓN HOME) -->
                <div class="user-menu-container" ref="userMenuContainer">
                    <button @click="toggleUserMenu" class="user-menu-button">
                        <User />
                    </button>
                    <transition name="fade">
                        <div v-if="isUserMenuOpen" class="user-dropdown-menu">
                            <ul>
                                <li>
                                    <router-link to="/editarperfil">Perfil</router-link>
                                </li>
                                <li>
                                    <button @click="logout">Cerrar sesión</button>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </div>
                <!-- FIN: MENÚ DESPLEGABLE DE USUARIO -->

            </header>

            <!-- AÑADIDO: Contenedor para la vista por defecto (sin búsqueda) -->
            <div v-if="!mainSearchQuery">
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
                            <div class="card-image"
                                :style="{ backgroundColor: card.color, backgroundImage: card.image ? `url(${card.image})` : 'none' }">
                            </div>
                            <h3 class="card-title">{{ card.title }}</h3>
                            <p class="card-subtitle">{{ card.subtitle }}</p>
                        </div>
                    </div>
                </section>
            </div>

            <!-- AÑADIDO: Contenedor para los resultados de búsqueda -->
            <div v-else class="search-results-container">
                <h2>Resultados</h2>
                <ul class="item-list-container">
                    <li v-for="item in mainSearchResults" :key="item.id">
                        <img :src="item.image" :alt="item.title" />
                        <div>
                            <p class="item-title">{{ item.title }}</p>
                            <p class="item-subtitle">{{ item.type }} • {{ item.subtitle }}</p>
                        </div>
                    </li>
                </ul>
            </div>

        </main>
        <!-- FIN: CONTENIDO PRINCIPAL (MAIN CONTENT) -->

        <!-- INICIO: REPRODUCTOR (PLAYER BAR) -->
        <footer class="player-bar">
            <!-- ... -->
        </footer>
    </div>
</template>

<script>
import {
    User, BookCopy, Search, X,
    Shuffle, SkipBack, Play, SkipForward, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2
} from 'lucide-vue-next';

export default {
    name: 'inicioGeneral',
    components: {
        User, BookCopy, Search, X,
        Shuffle, SkipBack, Play, SkipForward, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2
    },
    data() {
        return {
            isSidebarCollapsed: false,
            isLibrarySearching: false,
            librarySearchQuery: '',
            mainSearchQuery: '',
            isUserMenuOpen: false,

            activeLibraryFilter: 'Playlists',
            libraryFilters: ['Playlists', 'Álbumes', 'Artistas'],

            allLibraryItems: [
                { id: 1, title: 'Tus me gusta', subtitle: '429 canciones', image: 'https://t.scdn.co/images/3099b3803ad9496896c43f2210d6b8de.png', type: 'Playlists' },
                { id: 2, title: '9Lana', subtitle: 'Artista', image: 'https://yt3.googleusercontent.com/MvaTJIXIiNIu59I0n1Ok_Gcp6JgFAS8PpzPyXRAUAMHytugnVcR0EULARNlq-bcybXDpxdIK=s900-c-k-c0x00ffffff-no-rj', type: 'Artistas' },
                { id: 3, title: '9Lana Complete Collection', subtitle: 'Playlist • 9Lana', image: 'https://i.scdn.co/image/ab67706c0000da84523447936214ed037d80016e', type: 'Playlists' },
                { id: 4, title: 'Ado', subtitle: 'Artista', image: 'https://i.scdn.co/image/ab6761610000e5eb94632a93b843393392654874', type: 'Artistas' },
                { id: 5, title: 'Ado\'s Best Adobum', subtitle: 'Álbum • Ado', image: 'https://i.scdn.co/image/ab67616d0000b2737618de441a5f6cf81a3818de', type: 'Álbumes' },
                { id: 6, title: 'Ado\'s Utattemita Album', subtitle: 'Álbum • Ado', image: 'https://i.scdn.co/image/ab67616d0000b27391a27e738ed7b155979b44c2', type: 'Álbumes' },
                { id: 7, title: 'Anime Openings Y Endings', subtitle: 'Playlist • Putupau', image: 'https://i.scdn.co/image/ab67706c0000da84e7159d332b5f6368b6b105a6', type: 'Playlists' },
            ],

            username: 'SiriusW',
            madeForYou: [ /* ... */ ],
            recent: [ /* ... */ ]
        };
    },
    computed: {
        filteredLibraryItems() {
            let categoryFiltered = this.allLibraryItems.filter(item => item.type === this.activeLibraryFilter);
            const searchQuery = this.librarySearchQuery.trim().toLowerCase();

            if (!searchQuery) {
                return categoryFiltered;
            }
            return categoryFiltered.filter(item =>
                item.title.toLowerCase().includes(searchQuery) ||
                item.subtitle.toLowerCase().includes(searchQuery)
            );
        },
        mainSearchResults() {
            const searchQuery = this.mainSearchQuery.trim().toLowerCase();
            if (!searchQuery) {
                return [];
            }
            return this.allLibraryItems.filter(item =>
                item.title.toLowerCase().includes(searchQuery) ||
                item.subtitle.toLowerCase().includes(searchQuery)
            );
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
        async startLibrarySearch() {
            this.isLibrarySearching = true;
            await this.$nextTick();
            this.$refs.librarySearchInput.focus();
        },
        stopLibrarySearch() {
            if (!this.librarySearchQuery) {
                this.isLibrarySearching = false;
            }
        },
        clearLibrarySearch() {
            this.librarySearchQuery = '';
            this.$refs.librarySearchInput.focus();
        },
        // --- AÑADIDO: Método para limpiar la búsqueda principal ---
        clearMainSearch() {
            this.mainSearchQuery = '';
            this.$refs.mainSearchInput.focus();
        },
        setLibraryFilter(filter) {
            this.activeLibraryFilter = filter;
        },
        toggleUserMenu() {
            this.isUserMenuOpen = !this.isUserMenuOpen;
        },
        logout() {
            console.log('Cerrando sesión...');
            this.isUserMenuOpen = false;
            // this.$router.replace('/');
        },
        closeOnClickOutside(event) {
            if (this.$refs.userMenuContainer && !this.$refs.userMenuContainer.contains(event.target)) {
                this.isUserMenuOpen = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.closeOnClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeOnClickOutside);
    }
};
</script>

<style>
/* ... tus estilos ... */
</style>
