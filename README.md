# SPA Devices

Aplicación SPA para la visualización y gestión de dispositivos.

## 🚀 Instalación y ejecución

Ejecuta los siguientes comandos en el terminal:

```bash
npm install         # Instala las dependencias
npm run dev         # Ejecuta la aplicación en modo desarrollo
npm run test        # Ejecuta los tests unitarios
```


## 🛠️ Tecnologías utilizadas

- **React**
- **React Query**
- **SCSS**
- **Vitest** (testing)
- **@testing-library/react** (testing)
- **LocalStorage**

## 📦 Estructura del proyecto

```
src/
  components/
  hooks/
  pages/
  services/
  style/
  ...
```

## 📝 Funcionalidades implementadas

- 📄 Se han creado dos páginas diferentes: una para visualizar los distintos dispositivos y otra para ver los detalles de cada dispositivo.

- ⚡ Para cachear las llamadas y mejorar el rendimiento, se ha utilizado react-query, y se ha almacenado en el localStorage la cantidad de productos añadidos al carrito, con una caducidad de los datos de 1 hora.

- 🎨 Para el diseño de la aplicación se ha utilizado SCSS. Se ha creado un mixin de ejemplo para contenedores flexibles y se han añadido estilos CSS para que la aplicación sea lo más responsive posible.

- ⌨️ Se ha utilizado un hook externo (useDebounce) para el filtrado de productos, de manera que solo se filtren cuando el usuario deja de escribir.

- 🧪 Se han realizado pruebas unitarias de un componente y de un custom hook de ejemplo.
