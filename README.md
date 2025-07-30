# FinDash - Dashboard de Finanzas Personales

FinDash es una aplicación web moderna para la gestión de finanzas personales, construida con SvelteKit, TypeScript y Tailwind CSS. Permite a los usuarios rastrear ingresos y gastos, establecer metas de ahorro y visualizar su salud financiera a través de un dashboard intuitivo y profesional.

## Características Principales

- **Dashboard Interactivo**: Visualiza un resumen completo de tus finanzas, incluyendo balance actual, flujo de caja, y gráficos de gastos.
- **Gestión de Transacciones**: Registra, filtra y busca transacciones por categoría, tipo y fecha.
- **Metas de Ahorro**: Crea y sigue el progreso de tus objetivos financieros con barras de progreso visuales.
- **Reportes Detallados**: Exporta tus datos a formatos CSV y PDF.
- **Diseño Responsive**: Accede y gestiona tus finanzas desde cualquier dispositivo.
- **Modo Oscuro**: Tema oscuro para una mejor experiencia visual en condiciones de poca luz.
- **Configuración Personalizable**: Ajusta la moneda, notificaciones y otras preferencias.

## Estructura del Proyecto

El proyecto sigue una arquitectura modular y organizada para facilitar el mantenimiento y la escalabilidad:

```
src/
  lib/
    components/         # Componentes reutilizables de Svelte
      dashboard/        # Widgets específicos del dashboard (KPIs, gráficos)
      shared/           # Componentes comunes (botones, tarjetas, modales)
      icons/            # Iconos SVG como componentes
    server/             # Lógica del lado del servidor (conexión a DB)
    types/              # Definiciones de tipos de TypeScript
    utils/              # Utilidades (exportación, formato)
  routes/               # Rutas de la aplicación (SvelteKit)
    api/                # Endpoints de la API
    (dashboard)/        # Páginas principales (Dashboard, Transacciones, etc.)
  static/               # Archivos estáticos
```

## Cómo Empezar

### Prerrequisitos

- Node.js (v18 o superior)
- npm
- Docker (para la base de datos local)

### Pasos de Instalación

1.  **Clona el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/personal-dashboard.git
    cd personal-dashboard
    ```

2.  **Crea un archivo `.env`** a partir del ejemplo `.env.example` y configura las variables de entorno para tu base de datos MongoDB.
    ```
    MONGODB_URI=mongodb://admin:password123@localhost:27017/personal_dashboard?authSource=admin
    DB_NAME=personal_dashboard
    ```

3.  **Instala las dependencias**:
    ```bash
    npm install
    ```

4.  **Inicia la base de datos con Docker**:
    El archivo `docker-compose.yml` levantará un contenedor de MongoDB con los datos de ejemplo del script `init-mongo.js`.
    ```bash
    docker-compose up -d
    ```

5.  **Ejecuta la aplicación en modo de desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la build de producción.
- `npm run deploy:cloudflare`: Despliega la aplicación en Cloudflare Pages.

## CI/CD con GitHub Actions

El repositorio está configurado con un workflow de GitHub Actions (`.github/workflows/deploy.yml`) para la integración y despliegue continuo en Cloudflare Pages. El workflow se dispara en cada `push` a la rama `main`.
