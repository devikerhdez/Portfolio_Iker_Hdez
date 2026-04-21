🎯 Prompt Definitivo — Portfolio React + TypeScript
Iker Hernández Santana

CONTEXTO Y OBJETIVO
Crea un portfolio personal completo, funcional y desplegable en React + TypeScript con Tailwind CSS (sin CSS externo salvo lo imprescindible). El resultado debe ser un proyecto listo para ejecutar con npm run dev.

🎨 ESTÉTICA Y DIRECCIÓN DE DISEÑO
Inspírate en esta estética visual:

Fondo negro absoluto (#000000) como base dominante
Rojo sangre intenso (#CC0000 / #FF0000) como único color de acento
Tipografía de display grande y agresiva — usa Bebas Neue o Anton desde Google Fonts para los headings grandes. Para el body usa Space Mono o DM Mono.
Efecto glitch/píxel en los elementos de texto más grandes (keyframes CSS con clip-path o translate en múltiples capas)
Textura de ruido semitransparente superpuesta sobre el fondo (SVG inline o backdrop CSS)
Formas geométricas rojas flotando en el fondo con blur y opacidad baja (ambient glow)
Cursor personalizado rojo
Layout asimétrico, editorial, que rompe la cuadrícula — no centrado ni convencional
Todo en dark mode — sin opción de toggle


📦 STACK TÉCNICO
React 18 + TypeScript + Vite
Tailwind CSS v3 (toda la estilización aquí)
Framer Motion (animaciones)
Google Fonts: Bebas Neue + Space Mono
Instala las dependencias necesarias. El tailwind.config.ts debe extender con los colores y fuentes del proyecto.

🗂️ ESTRUCTURA DE SECCIONES (en orden)
1. NAVBAR

Logo o iniciales IHS a la izquierda en rojo con fuente de display
Links de navegación: About · Experience · Projects · Contact
Hora en tiempo real (actualiza cada segundo) a la derecha, como en la referencia
Fondo transparente que se vuelve bg-black/80 backdrop-blur al hacer scroll
Animación de entrada: fade-in + slide-down al cargar


2. HERO — "A LITTLE ABOUT ME"

Sección fullscreen (min-h-screen)
Foto de perfil (importada desde /src/assets/photo.jpg — usa un placeholder si no existe):

Forma irregular o con clip-path personalizado
Borde rojo glowing (box-shadow: 0 0 30px #cc0000)
Animación de entrada: scale desde 0.8 + fade-in (Framer Motion)


Texto de presentación corto al lado o debajo, algo como:

  Iker Hernández Santana
  Designer & Creative Developer
  "Every business has an identity led by emotions.
   I amplify them through visuals."

Texto enorme de fondo tipo watermark: IKER en rojo con opacidad muy baja (decorativo)
Letras del nombre con efecto glitch animado (keyframes: pequeños desplazamientos en X con color rojo/blanco)
Scroll indicator animado (flecha o línea pulsante) en la parte inferior


3. EXPERIENCE

Título de sección grande en rojo con fuente de display: EXPERIENCE
Lista de experiencias en formato timeline vertical:

Línea roja vertical a la izquierda
Punto/dot rojo en cada entrada
Empresa · Rol · Fechas
Descripción breve


Cada entrada aparece con animación al hacer scroll (Framer Motion whileInView, initial: {opacity:0, x:-40})
Usa datos de placeholder realistas (puedes poner 2-3 entradas de ejemplo que el usuario editará)


4. PROJECTS

Título de sección: PROJECTS en display rojo
Grid de tarjetas de proyectos (2 columnas en desktop, 1 en móvil)

Cada tarjeta de proyecto debe tener:

Preview del sitio desplegado — un <iframe> o imagen de captura dentro de la tarjeta con overflow-hidden y aspect ratio 16:9. Muestra la URL real embebida si existe, si no una imagen placeholder con efecto hover de zoom suave.
Nombre del proyecto en tipografía de display
Botón/toggle "Ver más info" que al hacer click despliega con animación (Framer Motion AnimatePresence + height: auto) un panel con:

Descripción completa del proyecto
Stack tecnológico (badges rojos)
Año


Botón "GitHub" — icono + texto, rojo, que abre el repo en nueva pestaña
Botón "Live Demo" si hay URL desplegada

Proyectos placeholder de ejemplo (el usuario los editará en un archivo data/projects.ts):
ts// src/data/projects.ts
export const projects = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Descripción completa del proyecto...",
    stack: ["React", "Node.js", "MongoDB"],
    year: "2024",
    github: "https://github.com/ikerhernandez/project-alpha",
    live: "https://project-alpha.vercel.app",
    preview: "https://project-alpha.vercel.app", // URL para iframe
  },
  // añade 2-3 más
]

Animación de entrada de tarjetas en stagger (cada una con delay incremental)
Hover en tarjeta: sutil borde rojo + ligero scale


5. FOOTER / COPYRIGHT

Fondo negro con línea roja superior
Texto centrado:

  © 2026 Iker Hernández Santana. All rights reserved.

Iconos de redes sociales (GitHub, LinkedIn, Instagram) con hover en rojo
Pequeño texto: Designed & built by Iker Hernández Santana
Animación: fade-in al entrar en viewport


✨ ANIMACIONES GLOBALES (imprescindibles)
Implementa todas estas con Framer Motion:
ElementoAnimaciónEntrada a la webPantalla negra que hace fade-out (page loader de 1.5s)Nombre en HeroEfecto glitch: micro-desplazamientos X rápidos en loopSecciones al scrollwhileInView con opacity: 0→1 + y: 40→0, once: trueTarjetas de proyectoStagger children con variants de FramerInfo desplegableAnimatePresence + height animadaHover en links navSubrayado rojo que crece desde izquierdaCursorPunto rojo custom que sigue el ratón con lag suave

🗃️ ESTRUCTURA DE ARCHIVOS
src/
├── assets/
│   └── photo.jpg          ← foto de perfil (placeholder OK)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── Footer.tsx
│   ├── CustomCursor.tsx
│   └── PageLoader.tsx
├── data/
│   ├── projects.ts        ← array de proyectos editables
│   └── experience.ts      ← array de experiencias editables
├── App.tsx
├── main.tsx
└── index.css              ← solo @tailwind directives + fuentes Google + glitch keyframes

⚙️ CONFIGURACIÓN TAILWIND
En tailwind.config.ts extiende con:
tstheme: {
  extend: {
    colors: {
      red: {
        primary: '#CC0000',
        glow: '#FF0000',
      }
    },
    fontFamily: {
      display: ['"Bebas Neue"', 'cursive'],
      mono: ['"Space Mono"', 'monospace'],
    },
    animation: {
      glitch: 'glitch 2s infinite',
      'pulse-red': 'pulse-red 2s ease-in-out infinite',
    },
    keyframes: {
      glitch: {
        '0%, 100%': { transform: 'translate(0)' },
        '20%': { transform: 'translate(-2px, 2px)', color: '#ff0000' },
        '40%': { transform: 'translate(2px, -2px)', color: '#fff' },
        '60%': { transform: 'translate(-1px, 1px)' },
        '80%': { transform: 'translate(1px, -1px)' },
      },
      'pulse-red': {
        '0%, 100%': { boxShadow: '0 0 20px #cc0000' },
        '50%': { boxShadow: '0 0 60px #ff0000, 0 0 100px #cc000060' },
      }
    }
  }
}

📋 NOTAS FINALES PARA EL AGENTE

No uses CSS externo salvo el index.css para las directivas de Tailwind y los @keyframes del glitch
Todos los textos son editables desde los archivos data/
El portfolio debe ser 100% responsivo (mobile-first)
Usa React.lazy + Suspense para las secciones pesadas si es necesario
Añade un README.md con instrucciones de cómo cambiar la foto y los datos
El proyecto debe arrancar limpio con npm install && npm run dev


Portfolio de Iker Hernández Santana — 2026