/// <reference types="vite/client" />

// Esta línea es la que le dice a TypeScript cómo manejar los archivos .vue
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}