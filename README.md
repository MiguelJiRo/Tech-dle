# Tech-dle

Un juego diario de adivinanza de tecnologías inspirado en Wordle. Adivina la tecnología del día basándote en sus características.

## Características

- **Juego diario**: Una nueva tecnología para adivinar cada día
- **6 intentos**: Tienes 6 oportunidades para adivinar correctamente
- **Sistema de pistas**: Colores que indican qué tan cerca estás de la respuesta correcta
- **Estadísticas**: Rastrea tu progreso, rachas y distribución de intentos
- **Persistencia local**: Tu progreso se guarda automáticamente en el navegador
- **Compartir resultados**: Comparte tus victorias con emojis (sin spoilers)
- **Multiidioma**: Soporte para español e inglés con detección automática del idioma del navegador
- **Cambio de idioma**: Botón para cambiar entre idiomas en tiempo real

## Cómo jugar

1. **Escribe el nombre de una tecnología** en el campo de búsqueda
2. **Selecciona una opción** de las sugerencias que aparecen
3. **Observa las pistas** en colores:
   - 🟩 **Verde**: Coincidencia exacta
   - 🟨 **Amarillo**: Coincidencia parcial
   - 🟧 **Naranja**: Año incorrecto (↑ mayor / ↓ menor)
   - ⬛ **Gris**: No coincide
4. **Usa la información** de tus intentos anteriores para hacer mejores suposiciones

## Características que se comparan

- **Año**: Año de creación o lanzamiento
- **Tipo**: Lenguaje, Framework, Base de Datos, Herramienta
- **Paradigma**: Orientado a Objetos, Funcional, Multi-paradigma, etc.
- **Tipado**: Estático, Dinámico, Gradual, o No aplica

## Tecnologías utilizadas

- **React 18**: Biblioteca de UI
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Framework de CSS utility-first
- **LocalStorage**: Persistencia de datos del lado del cliente

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm preview
```

## Estructura del proyecto

```
Tech-dle/
├── src/
│   ├── components/         # Componentes de React
│   │   ├── Header.jsx
│   │   ├── GuessGrid.jsx
│   │   ├── TechnologyInput.jsx
│   │   ├── ColorGuide.jsx
│   │   ├── Modal.jsx
│   │   ├── StatsModal.jsx
│   │   └── HelpModal.jsx
│   ├── data/
│   │   └── technologies.js # Base de datos de tecnologías
│   ├── i18n/              # Sistema de internacionalización
│   │   ├── es.js          # Traducciones en español
│   │   ├── en.js          # Traducciones en inglés
│   │   └── LanguageContext.jsx  # Contexto de idioma
│   ├── utils/
│   │   ├── gameLogic.js   # Lógica de comparación
│   │   └── storage.js     # Gestión de localStorage
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Personalización

### Añadir más tecnologías

Edita el archivo `src/data/technologies.js` y añade nuevas entradas al array:

```javascript
{
  id: 41,
  name: "NuevaTech",
  year: 2023,
  type: "Framework",
  paradigm: "Declarativo",
  typing: "Estático"
}
```

### Modificar el número de intentos

Cambia el parámetro `maxGuesses` en `src/App.jsx`:

```javascript
<GuessGrid guesses={guesses} maxGuesses={6} />
```

### Añadir más idiomas

1. Crea un nuevo archivo en `src/i18n/` (por ejemplo, `fr.js` para francés)
2. Copia la estructura de `es.js` o `en.js` y traduce todos los textos
3. Importa el nuevo idioma en `src/i18n/LanguageContext.jsx`:

```javascript
import fr from './fr';

const translations = {
  es,
  en,
  fr  // Añadir el nuevo idioma
};
```

4. La detección automática funcionará si el idioma del navegador coincide con el código del idioma

## Roadmap

- [x] Sistema de internacionalización (i18n) con español e inglés
- [x] Detección automática del idioma del navegador
- [ ] Modo de práctica con tecnologías aleatorias
- [ ] Más categorías de tecnologías (Cloud, DevOps, etc.)
- [ ] Más idiomas (francés, alemán, portugués, etc.)
- [ ] Temas claro/oscuro
- [ ] Animaciones mejoradas
- [ ] PWA con soporte offline
- [ ] Modo multijugador

## Licencia

MIT License

## Créditos

Desarrollado como proyecto de portfolio. Inspirado en Wordle y otros juegos de adivinanza diarios.
