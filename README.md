# Personal Dashboard

Este proyecto es un esqueleto para construir una aplicación de finanzas personales utilizando **SvelteKit**, **Tailwind CSS** y **MongoDB Atlas**.

## Estructura

```
src/
  lib/
    components/        Componentes reutilizables
    server/            Código del lado del servidor (conexión a MongoDB)
    utils/             Utilidades como exportación a CSV o PDF
  routes/              Rutas de la aplicación y API
```

## Scripts

- `npm run dev` &ndash; Desarrollo
- `npm run build` &ndash; Compilar para producción
- `npm run preview` &ndash; Previsualizar la build
- `npm run deploy:cloudflare` &ndash; Desplegar en Cloudflare Pages

## Variables de entorno

Copie `.env.example` a `.env` y complete los valores para conectarse a MongoDB.

```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net
DB_NAME=mydb
```

## Nota

Debido a las restricciones de este entorno no se instalan las dependencias ni se ejecutan los comandos de `npm`. El código sirve como base para un proyecto completo según lo descrito en la documentación.
