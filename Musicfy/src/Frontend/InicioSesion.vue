<template>
    <div class="fondo">
        <div class="inicio-sesion">
            <h2>Inicia Sesión en Musicfy</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" id="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

            <p>
                ¿No tienes cuenta? <router-link to="/registro">Regístrate</router-link>
            </p>
        </div>

        <footer class="pie-pagina">
            <p>&copy; 2025 Producciones ChickenPepe´s. Todos los derechos reservados.</p>
        </footer>

    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                // Lógica de inicio de sesión
            } catch (error) {
                this.errorMessage = 'Error al iniciar sesión';
            }
        }
    }
};
</script>

<style scoped>
body {
    background-color: var(--background-base);
    color: var(--text-base);
    overflow: hidden;
}

.fondo {
    min-height: 100vh;
    width: 100%;
    background-image: linear-gradient(to bottom,
            rgb(42, 42, 42),
            #703700 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Franklin Gothic', sans-serif;
}

.inicio-sesion {
    max-width: 400px;
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #f4f3f3;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.8);
    color: whitesmoke;
    text-align: center;
    /* Centra el h2 y el botón */
}

h2 {
    margin-bottom: 20px;
    font-weight: bold;

    /* Sombra de Texto para crear el efecto de brillo (Glow) */
    text-shadow:
        /* Primera sombra: más definida */
        0 0 5px rgba(255, 255, 255, 0.6),
        /* Segunda sombra: más difusa para el aura */
        0 0 10px rgba(255, 255, 255, 0.4),
        /* Tercera sombra: la más grande y suave */
        0 0 20px rgba(255, 255, 255, 0.2);
}

.form-group {
    margin-bottom: 20px;
    text-align: center;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    text-transform: uppercase;
    font-size: 14px;
    color: #ffffff;
}

.form-group input {
    width: 100%;
    padding: 12px;
    background-color: #1e1e1e;
    /* Fondo oscuro para el input */
    border: 2px solid #b8860b;
    /* Borde dorado/marrón */
    border-radius: 8px;
    /* Bordes redondeados */
    color: #ffffff;
    /* Color del texto dentro del input */
    box-sizing: border-box;
    /* Asegura que el padding no afecte el ancho total */
    text-align: center;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #b8860b;
    color: white;
    border: none;
    border-radius: 18px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
}

button:hover {
    background-color: #daa520;
}

.error {
    color: red;
    margin-top: 15px;
}


/* Extras */
.pie-pagina {
    background-color: #1e1e1e;
    color: #ffffff;
    text-align: center;
    padding: 12px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>