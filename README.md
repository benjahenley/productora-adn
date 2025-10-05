# Productora ADN - Sitio Web

Una Single Page Application (SPA) moderna construida con React, Vite y React Router para Productora ADN.

## 🚀 Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router v6** - Enrutamiento del lado del cliente
- **CSS Modules** - Estilos modulares y encapsulados

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   ├── Footer.jsx      # Footer con información de contacto
│   ├── Hero.jsx        # Sección hero con video/imagen
│   ├── ServicesGrid.jsx # Grid de servicios
│   ├── ServiceCard.jsx # Tarjeta individual de servicio
│   ├── Gallery.jsx     # Galería de trabajos
│   ├── Lightbox.jsx    # Modal para ver media
│   └── ContactForm.jsx # Formulario de contacto
├── pages/              # Páginas principales
│   ├── Home.jsx        # Página de inicio
│   ├── Servicios.jsx   # Página de servicios
│   ├── Trabajos.jsx    # Galería de trabajos
│   ├── Nosotros.jsx    # Información de la empresa
│   └── Contacto.jsx    # Formulario de contacto
├── data/               # Datos de la aplicación
│   ├── navbar.js       # Items de navegación
│   ├── services.js     # Lista de servicios
│   ├── gallery.js      # Items de la galería
│   └── company.js      # Información de la empresa
├── styles/             # Estilos globales
│   └── global.css      # Variables CSS y estilos base
├── utils/              # Utilidades
│   └── format.js       # Funciones de formateo
└── constants/          # Constantes
    └── forms.js        # Configuración de formularios
```

## 🎨 Características

### ✅ Implementadas

- **SPA con React Router** - Navegación del lado del cliente
- **Responsive Design** - Optimizado para móviles, tablets y desktop
- **Componentes Modulares** - Arquitectura reutilizable y mantenible
- **Data-Driven** - Contenido gestionado desde archivos de datos
- **Accesibilidad** - Navegación por teclado, ARIA labels, focus management
- **Performance** - Lazy loading de imágenes, optimizaciones de CSS
- **SEO Ready** - Meta tags, Open Graph, estructura semántica

### 🎯 Funcionalidades

1. **Navegación**

   - Header sticky con logo y menú
   - Menú hamburguesa para móviles
   - Estados activos en navegación

2. **Hero Section**

   - Soporte para video de fondo (autoplay, muted, loop)
   - Fallback a imagen de fondo
   - Overlay con gradiente
   - Botones de acción

3. **Servicios**

   - Grid responsive de servicios
   - Cards con hover effects
   - Imágenes lazy loading

4. **Galería de Trabajos**

   - Grid responsive con thumbnails
   - Lightbox modal para ver media completa
   - Soporte para imágenes, videos y YouTube embeds
   - Navegación por teclado (Escape para cerrar)

5. **Formulario de Contacto**

   - Validación del lado del cliente
   - Integración con Formspree (configurable)
   - Estados de loading/success/error
   - Información de contacto y enlaces sociales

6. **Footer**
   - Información de contacto completa
   - Enlaces a redes sociales
   - Copyright dinámico

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd productora-adn

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 📱 Rutas Disponibles

- `/` - Página de inicio con hero y preview de servicios
- `/servicios` - Lista completa de servicios con proceso
- `/trabajos` - Galería de trabajos realizados
- `/nosotros` - Información de la empresa, valores y logros
- `/contacto` - Formulario de contacto e información

## 🎨 Personalización

### Datos de la Empresa

Editar `src/data/company.js` para actualizar:

- Información de contacto
- Descripción de la empresa
- Redes sociales
- Highlights y estadísticas

### Servicios

Editar `src/data/services.js` para:

- Agregar/remover servicios
- Actualizar descripciones
- Cambiar imágenes

### Galería

Editar `src/data/gallery.js` para:

- Agregar nuevos trabajos
- Configurar tipo de media (image/video/youtube)
- Actualizar descripciones

### Estilos

- Variables CSS en `src/styles/global.css`
- Estilos específicos en archivos `.module.css`
- Fácil personalización de colores, tipografías y espaciados

## 📁 Assets

Los assets deben colocarse en `/public/assets/`:

```
public/assets/
├── logo.png              # Logo de la empresa
├── hero-bg.jpg           # Imagen de fondo del hero
├── hero.mp4              # Video de fondo del hero (opcional)
├── og-image.jpg          # Imagen para Open Graph
├── services/             # Imágenes de servicios
├── gallery/              # Imágenes y videos de trabajos
└── about-team.jpg        # Imagen del equipo
```

## 🔧 Configuración de Formularios

### Formspree (Recomendado)

1. Crear cuenta en [Formspree](https://formspree.io)
2. Crear nuevo formulario
3. Actualizar endpoint en `src/constants/forms.js`

### Netlify Forms (Alternativo)

1. Configurar variable de entorno: `VITE_NETLIFY_FORMS=true`
2. Agregar atributos `netlify` al formulario

## 📊 Performance

- **Lazy Loading** - Imágenes cargadas bajo demanda
- **CSS Optimizado** - Módulos CSS para mejor tree-shaking
- **Bundle Size** - Sin dependencias pesadas, solo lo esencial
- **Responsive Images** - Imágenes optimizadas para diferentes dispositivos

## ♿ Accesibilidad

- **Navegación por Teclado** - Todos los elementos interactivos accesibles
- **ARIA Labels** - Etiquetas descriptivas para screen readers
- **Focus Management** - Estados de foco visibles y consistentes
- **Contraste** - Colores con suficiente contraste
- **Semántica HTML** - Estructura semántica correcta

## 🌐 SEO

- **Meta Tags** - Título, descripción, keywords
- **Open Graph** - Para redes sociales
- **Estructura Semántica** - HTML5 semántico
- **URLs Limpias** - Rutas descriptivas

## 🚀 Deployment

### Netlify (Recomendado)

1. Conectar repositorio a Netlify
2. Configurar build command: `npm run build`
3. Configurar publish directory: `dist`
4. Agregar variables de entorno si es necesario

### Vercel

1. Conectar repositorio a Vercel
2. Configurar automáticamente detectado
3. Deploy automático en cada push

### Otros

Cualquier hosting estático que soporte SPAs:

- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📝 Notas de Desarrollo

- **Hot Reload** - Cambios reflejados automáticamente
- **ESLint** - Configurado para React y mejores prácticas
- **CSS Modules** - Evita conflictos de nombres
- **Componentes Funcionales** - Uso de hooks de React
- **Props Tipadas** - Documentación clara de interfaces

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

**Productora ADN** - Soluciones integrales para eventos inolvidables
