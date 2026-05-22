# Task: Auditoria del proyecto

- Debes cargar inicialmente si no lo tienes cargado el AGENT.md del proyecto
- Antes de cada punto de los comentados abajo quiero revisar que se ha modificado para yo hacer un commit a la rama

## Context

- **Stack**: React 19 + JavaScript + Vite 
- **Repo**: `src/`
- **State management**: Zustand para UI state (si aplica)

---

## Mejoras a añadir
  
## Objetivo

Mejorar el rendimiento y buenas prácticas del proyecto para que sea lo mas profesional posiible y este estructurado de la mejor forma posible

---
## 1. Performance

- Revisar si en la aplicación se puede mejorar el rendimiento utilizando `(react.memo, useMemo, useOptimistic, useCallback)`
- Revisa el Network de devtools de `http://localhost:5173/` para ver si se puede mejorar algo de rendimiento


---  
## 2. Estructura

- Reubicar archivos si no estan en el sitio adecuado
- Reutilización de código y intentar estructurar mejor los componentes para la reutilización utilizando {children} por ejemplo los devices que estan en una especie de Card, hacer que Card sea mas generico y se pueda reutilizar en un futuro (si lo crees necesario basandote en las skills que tienes)
- Mejorar y organizar mejor el scss


---  

  ## 3. Estructura

- Añadir el control de errores con `ErrorBoundary` en los casos necesarios


---  
### 4. **Accesibilidad (a11y)**

- Revisar contraste de colores, etiquetas `aria-*`, navegación por teclado
- Asegurar que todos los elementos interactivos sean accesibles
- Revisa las etiquetas de html avamzadas sean las correctas, y en caso de que veas algun <div> que se pueda modificar por una etiqueta avanzada de html modificalo

---

### 5. **Optimización de assets**

- Revisar lazy loading de imágenes (`loading="lazy"`)
- Optimizar imágenes (formatos modernos como WebP/AVIF si aplica)
- Code splitting con `React.lazy()` y `Suspense` para rutas pesadas
---

### 6. **UX / Feedback al usuario**

- Estados de loading skeletons en lugar de spinners genéricos
- Manejo de estados vacíos (empty states)
- Toasts o notificaciones para acciones del usuario (éxito/error)

---
### 7. **i18n (Internacionalización)**

- Preparar la app para múltiples idiomas si tiene potencial de escalar

---

### 11. **Documentación**

- README profesional con instrucciones de instalación, estructura del proyecto, convenciones
- Storybook para documentar componentes reutilizables (si el proyecto crece)

---

## Acceptance Criteria (Definition of Done)


5. `npm run build` pasa sin errores

6. `npm run lint` pasa sin errores