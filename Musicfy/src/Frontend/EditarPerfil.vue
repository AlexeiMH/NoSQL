<template>
    <div class="fondo">
        <div class="edit-profile-container">
            <header class="profile-header">
                <h1>Editar perfil</h1>

                <router-link to="/inicio" class="sidebar-button">
                    <Home />
                </router-link>
            </header>

            <form @submit.prevent="saveProfile" class="profile-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" :value="userProfile.email" readonly disabled>
                </div>

                <div class="form-group">
                    <label for="name">Nombre</label>
                    <input id="name" type="text" v-model="userProfile.name" placeholder="Añade tu nombre">
                </div>

                <div class="form-group">
                    <label for="region">País o región</label>
                    <select id="region" v-model="userProfile.region">
                        <option v-for="region in regions" :key="region.code" :value="region.code">
                            {{ region.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="language">Lenguaje</label>
                    <select id="language" v-model="userProfile.language">
                        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                            {{ lang.name }}
                        </option>
                    </select>
                    <p class="form-hint">El lenguaje que se usará en la aplicación.</p>
                </div>

                <div class="form-group-checkbox">
                    <div class="checkbox-content">
                        <label for="explicit">Contenido explícito</label>
                        <p class="form-hint">Permitir la reproducción de contenido con etiqueta "explicit".</p>
                    </div>
                    <label class="switch">
                        <input id="explicit" type="checkbox" v-model="userProfile.allowExplicit">
                        <span class="slider"></span>
                    </label>
                </div>

                <header class="profile-header">
                    <h2>Cambiar contraseña</h2>
                </header>

                <div>
                    <div class="form-group">
                        <label for="new-password">Nueva contraseña</label>
                        <input id="new-password" type="password" v-model="passwordChange.newPassword">
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirmar nueva contraseña</label>
                        <input id="confirm-password" type="password" v-model="passwordChange.confirmPassword">
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="save-button">Guardar perfil</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Home } from 'lucide-vue-next'; // <-- AÑADIDO: Importar el icono

export default {
    name: 'EditProfile',
    components: {
        Home // <-- AÑADIDO: Registrar el componente del icono
    },
    data() {
        return {
            userProfile: {
                email: 'chickenpepe@example.com',
                name: '',
                region: '',
                language: '',
                allowExplicit: true,
            },
            passwordChange: {
                newPassword: '',
                confirmPassword: '',
            },
            regions: [
                { code: 'MX', name: 'México' },
                { code: 'US', name: 'Estados Unidos' },
                { code: 'ES', name: 'España' },
                { code: 'GB', name: 'Reino Unido' },
                { code: 'JP', name: 'Japón' },
                { code: 'BR', name: 'Brasil' },
                { code: 'FR', name: 'Francia' },
                { code: 'CN', name: 'China' },
                { code: 'DE', name: 'Alemania' },
                { code: 'AR', name: 'Argentina' },
                { code: 'RU', name: 'Rusia' },
                { code: 'IT', name: 'Italia' },
                { code: 'AU', name: 'Australia' },
                { code: 'KR', name: 'Corea del Sur' },
                { code: 'CA', name: 'Canadá' },
                { code: 'EG', name: 'Egipto' },
                { code: 'NZ', name: 'Nueva Zelanda' },
                { code: 'BG', name: 'Bulgaria' },
                { code: 'IE', name: 'Irlanda' },
                { code: 'SE', name: 'Suecia' },
                { code: 'CO', name: 'Colombia' },
                { code: 'TR', name: 'Turquía' },
                { code: 'NL', name: 'Países Bajos' },
                { code: 'AE', name: 'Emiratos Árabes Unidos' },
            ],
            languages: [
                { code: 'es', name: 'Español' },
                { code: 'en', name: 'English' },
                { code: 'ja', name: '日本語' },
                { code: 'pt', name: 'Português' },
                { code: 'fr', name: 'Français' },
                { code: 'zh', name: '中文' },
                { code: 'de', name: 'Deutsch' },
                { code: 'ar', name: 'العربية' },
                { code: 'ru', name: 'Русский' },
                { code: 'it', name: 'Italiano' },
                { code: 'ko', name: '한국어' },
                { code: 'bg', name: 'Български' },
                { code: 'sv', name: 'Svenska' },
                { code: 'tr', name: 'Türkçe' },
                { code: 'nl', name: 'Nederlands' },
            ],
        };
    },
    methods: {
        async saveProfile() {
            const profileDataToSave = { ...this.userProfile };

            if (this.passwordChange.newPassword.length > 0) {
                if (this.passwordChange.newPassword !== this.passwordChange.confirmPassword) {
                    alert('ERROR: La nueva contraseña y la confirmación no coinciden.');
                    return;
                }
                // Aquí deberías enviar la nueva contraseña en una petición separada o incluirla en el payload adecuado.
                console.log('Se enviará la nueva contraseña para guardarse.');
            }

            try {
                console.log('Datos finales enviados al Backend:', profileDataToSave);
                alert('Perfil y/o contraseña guardados (simulación).');
                this.passwordChange.newPassword = '';
                this.passwordChange.confirmPassword = '';
            } catch (error) {
                alert('Error al guardar el perfil. Inténtalo de nuevo.');
                console.error('Error de API:', error);
            }
        },
    },
};
</script>

<style scoped>
.fondo {
    min-height: 100vh;
    width: 100%;
    background-image: linear-gradient(to bottom,
            rgb(42, 42, 42),
            #703700 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Franklin Gothic', sans-serif;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto; /* <-- Permite el scroll vertical en toda la página */
}

.edit-profile-container {
    background-color: var(--background-dark, #121212);
    color: var(--text-primary, #ffffff);
    font-family: 'Franklin Gothic', sans-serif;
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    padding: 24px;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;
    /* --- Scrollbar personalizado --- */
    scrollbar-width: thin;
    scrollbar-color: #daa520 #333333;
}

/* Scrollbar para navegadores Webkit (Chrome, Edge, Safari) */
.edit-profile-container::-webkit-scrollbar {
    width: 10px;
    border-radius: 8px;
    background: #333333;
}

.edit-profile-container::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #daa520 40%, #b8860b 100%);
    border-radius: 8px;
    border: 2px solid #121212;
}

.edit-profile-container::-webkit-scrollbar-track {
    background: #333333;
    border-radius: 8px;
}

.profile-header {
    margin-bottom: 24px;
    /* --- MODIFICADO: Añadido Flexbox --- */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.profile-header h1,
.profile-header h2 {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
}

.profile-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label,
.form-group-checkbox label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
}

.form-group input,
.form-group select {
    background-color: var(--input-background, #333333);
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--text-primary, #ffffff);
    padding: 12px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    /* --- Añade estas líneas --- */
    max-height: 200px;
    overflow-y: auto;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--spotify-green, #b8860b);
}

.form-group input:disabled {
    background-color: #282828;
    color: #757575;
    cursor: not-allowed;
}

.form-hint {
    font-size: 12px;
    color: var(--text-secondary, #b3b3b3);
    margin-top: 8px;
}

.form-group-checkbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.checkbox-content {
    flex-grow: 1;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}

.save-button {
    background-color: var(--spotify-green, #daa520);
    color: #ffffff;
    border: none;
    border-radius: 50px;
    padding: 12px 32px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
}

.save-button:hover {
    transform: scale(1.05);
    background-color: #b8860b;
}

.divider {
    border: none;
    height: 1px;
    background-color: #333333;
    margin: 40px 0;
}

/* Estilo para el interruptor (checkbox) */
.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    flex-shrink: 0;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #535353;
    transition: .4s;
    border-radius: 28px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: var(--spotify-green, #daa520);
}

input:checked+.slider:before {
    transform: translateX(22px);
}

.sidebar-button {
    background-color: rgb(42, 42, 42);
    border: none;
    color: #fff;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;
}
</style>
