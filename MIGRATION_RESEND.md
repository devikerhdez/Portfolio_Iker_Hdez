# Migración de EmailJS a Resend

## Problema Original

EmailJS daba error: `EmailJS Error: The public key is required`. Esto ocurría porque las variables de entorno no se cargaban correctamente en el navegador.

## Solución Implementada

### Arquitectura

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐
│   Frontend  │ ───► │  Nginx (Proxy)   │ ───► │  Express    │
│  (Browser)  │      │  puerto 8443     │      │  puerto 3001│
└─────────────┘      └──────────────────┘      └─────────────┘
                                                    │
                                                    ▼
                                              ┌───────────┐
                                              │  Resend   │
                                              │   API     │
                                              └───────────┘
```

### Por qué esta arquitectura

1. **Nginx como reverse proxy**: Mantiene la configuración HTTPS existente y sirve de gateway unificado
2. **Express con API `/api/contact`**: Maneja el envío de emails de forma segura (la API key de Resend nunca sale del servidor)
3. **分离 de responsabilidades**: Nginx sirve archivos estáticos y forwardea peticiones API a Express

### Archivos modificados/creados

#### 1. `server.js` (NUEVO)
- Servidor Express minimalista
- Endpoint `POST /api/contact` que usa Resend para enviar emails
- En producción sirve archivos estáticos desde `/dist`
- **Nota**: Express 5 requiere sintaxis `{*path}` en lugar de `*` para catch-all routes

#### 2. `nginx.conf` (NUEVO)
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://api:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
- Todo el tráfico va al contenedor `api` en puerto 3001
- No sirve archivos directamente (Express los sirve)

#### 3. `docker-compose.yml` (NUEVO)
```yaml
services:
  api:
    build: Dockerfile
    environment:
      - RESEND_API_KEY=${RESEND_API_KEY}
      - RESEND_FROM=${RESEND_FROM}

  nginx:
    image: nginx:alpine
    ports:
      - "8443:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - api
```
- Dos servicios: `api` (Express) y `nginx`
- Variables de entorno para API key y email sender

#### 4. `Dockerfile` (MODIFICADO)
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD ["node", "server.js"]
```

#### 5. `.env` (MODIFICADO)
```
RESEND_API_KEY=re_xxx        # Tu API key de Resend
RESEND_FROM=portfolio@tudominio.com  # Email verificado en Resend
```

#### 6. `vite.config.ts` (MODIFICADO)
```typescript
server: {
  proxy: {
    '/api': 'http://localhost:3001'
  }
}
```
- Solo necesario para desarrollo local

#### 7. `src/components/Contact.tsx` (MODIFICADO)
- Cambiado de `emailjs.send()` a `fetch('/api/contact', ...)`
- El frontend ya no conoce las credenciales

## Errores comunes y soluciones

### Error: "Missing parameter name at index 1: *"
- **Causa**: Express 5 no acepta `*` como wildcard
- **Solución**: Usar `{*path}` en la route catch-all

### Error: "domain is not verified"
- **Causa**: El dominio en `RESEND_FROM` no está verificado en Resend
- **Solución**: Verificar el dominio exacto en resend.com/domains

### Error: "port is already allocated"
- **Causa**: Contenedores antiguos seguían corriendo
- **Solución**: `docker compose down` antes de `docker compose up -d`

## Desarrollo local

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

## Producción (VPS)

```bash
git pull origin main
docker compose build --no-cache
docker compose up -d
```

## Variables de entorno requeridas en VPS

```bash
RESEND_API_KEY=re_xxx
RESEND_FROM=portfolio@tudominio.com
```

## Por qué no EmailJS?

EmailJS funciona 100% en el cliente, pero:
- Requiere configuración de plantilla en su dashboard
- El public key queda expuesto en el frontend
- Limitaciones en el plan gratuito

## Por qué Resend?

- API moderna y simple
- Pricing generoso en tier gratuito
- Dominio propio para credibilidad
- API key segura en servidor