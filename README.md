# DOBLEPAR - Sitio Web

Sitio web institucional y portfolio audiovisual de DOBLEPAR, una agencia creativa especializada en la creación de contenido visual con inteligencia artificial.

## Concepto

**"Convertimos ideas en universos coexistentes"**

DOBLEPAR entiende las marcas como ecosistemas capaces de expandirse a través de imágenes, experiencias, espacios, entretenimiento, narrativas, tecnología y comunidad.

## Stack Técnico

- **Framework:** Next.js 14 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** CSS Modules
- **Deploy:** Vercel (recomendado)

## Estructura del Proyecto

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal con metadata
│   ├── page.tsx             # Página Home
│   ├── trabajos/
│   │   └── page.tsx        # Página de Trabajos
│   ├── nosotros/
│   │   └── page.tsx        # Página Nosotros
│   ├── hablemos/
│   │   └── page.tsx        # Página Contacto
│   └── globals.css          # Estilos globales
├── components/
│   ├── layout/              # Componentes de layout
│   │   ├── Navbar/         # Navegación principal
│   │   └── Footer/         # Pie de página
│   ├── sections/
│   │   ├── home/           # Secciones de Home
│   │   │   ├── HomeHero/
│   │   │   ├── FeaturedWorks/
│   │   │   ├── HomeAboutPreview/
│   │   │   └── HomeContactCTA/
│   │   ├── trabajos/       # Secciones de Trabajos
│   │   │   ├── WorkHero/
│   │   │   └── WorksGrid/
│   │   ├── nosotros/       # Secciones de Nosotros
│   │   │   ├── AboutHero/
│   │   │   ├── ManifestoBlock/
│   │   │   └── PhilosophySection/
│   │   └── hablemos/       # Secciones de Contacto
│   │       ├── ContactHero/
│   │       ├── ContactForm/
│   │       └── ContactInfo/
│   └── ui/                  # Componentes reutilizables
│       ├── Button/         # Botones
│       ├── VideoCard/      # Tarjetas de video
│       └── SectionTitle/   # Títulos de sección
├── data/
│   └── works.ts            # Mock data de trabajos
├── types/
│   └── work.ts             # Tipos TypeScript
└── styles/
    └── variables.css       # Variables CSS globales
```

## Instalación y Uso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

### 3. Build para producción

```bash
npm run build
npm start
```

## Páginas

El sitio está estructurado como una web multipágina:

### **Home** (`/`)
- Hero visual con video de fondo
- Claim principal: "Convertimos ideas en universos coexistentes"
- Preview de trabajos destacados (3 proyectos)
- Preview de Nosotros
- CTA hacia contacto

### **Trabajos** (`/trabajos`)
- Hero de página
- Grilla completa de proyectos audiovisuales
- Soporte para videos horizontales (16:9) y verticales (9:16)
- Cards interactivas con hover effects

### **Nosotros** (`/nosotros`)
- Hero con concepto principal
- Manifiesto de marca
- Filosofía de trabajo (4 pilares)
- Valores y forma de trabajar

### **Hablemos** (`/hablemos`)
- Hero de contacto
- Formulario de contacto funcional
- Información de contacto (email, WhatsApp, ubicación)
- Links a redes sociales

## Características

### Diseño

- ✅ Diseño premium y cinematográfico
- ✅ Tema oscuro con alto contraste
- ✅ Totalmente responsive (mobile, tablet, desktop)
- ✅ Animaciones y transiciones suaves
- ✅ Optimizado para performance

### Componentes

- **Navbar:** Navegación entre páginas con menú móvil responsive
- **Footer:** Footer con links de navegación y redes sociales
- **HomeHero:** Hero principal con video de fondo y CTA
- **FeaturedWorks:** Preview de trabajos destacados en Home
- **HomeAboutPreview:** Preview del manifiesto en Home
- **HomeContactCTA:** Call-to-action de contacto en Home
- **WorkHero:** Hero de la página Trabajos
- **WorksGrid:** Grilla completa de proyectos audiovisuales
- **AboutHero:** Hero de la página Nosotros
- **ManifestoBlock:** Bloque con el manifiesto de marca
- **PhilosophySection:** Sección de filosofía y valores
- **ContactHero:** Hero de la página Hablemos
- **ContactForm:** Formulario de contacto
- **ContactInfo:** Información y datos de contacto
- **VideoCard:** Tarjeta de video reutilizable con hover effects
- **Button:** Botón reutilizable con variantes y tamaños
- **SectionTitle:** Títulos de sección consistentes

### Videos

- Soporte para videos horizontales (16:9) y verticales (9:16)
- Lazy loading y optimización de carga
- Placeholders mientras cargan
- Autoplay en hover (desktop)

## Personalización

### Agregar nuevos trabajos

Editar el archivo `src/data/works.ts`:

```typescript
export const works: Work[] = [
  {
    id: '1',
    title: 'Nombre del Proyecto',
    client: 'Cliente',
    category: 'Audiovisual',
    description: 'Descripción del proyecto',
    videoUrl: '/videos/project-1.mp4',
    thumbnailUrl: '/images/project-1-thumb.jpg',
    orientation: 'horizontal', // o 'vertical'
    year: 2026,
  },
  // ... más trabajos
];
```

### Cambiar colores y estilos

Editar las variables en `src/styles/variables.css`:

```css
:root {
  --color-bg-primary: #0a0a0a;
  --color-text-primary: #ffffff;
  /* ... más variables */
}
```

### Modificar metadata SEO

Editar `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Tu Título',
  description: 'Tu Descripción',
  // ...
};
```

## Próximos Pasos

1. **Agregar videos reales:** Reemplazar los placeholders en `/public/videos/`
2. **Agregar imágenes:** Agregar thumbnails en `/public/images/`
3. **Configurar dominio:** Conectar con Vercel
4. **Analytics:** Agregar Google Analytics o similar
5. **Formulario de contacto:** Implementar formulario funcional
6. **Animaciones avanzadas:** Agregar scroll animations con Framer Motion (opcional)

## Deploy en Vercel

1. Push del código a GitHub
2. Importar el repositorio en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente Next.js
4. Deploy automático en cada push

## Licencia

© 2026 DOBLEPAR. Todos los derechos reservados.