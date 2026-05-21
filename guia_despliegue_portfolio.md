# Guía de Despliegue — Portfolio Iker Hdez

## Archivos creados

| Archivo | Descripción |
|---|---|
| `Dockerfile` | Build multi-stage: Node 20 compila → nginx sirve estáticos |
| `nginx.conf` | Nginx con SPA fallback y caché de assets |
| `docker-compose.yml` | Servicio portfolio en puerto 3000 |
| `.dockerignore` | Excluye node_modules, dist, .env, etc. |
| `.github/workflows/deploy.yml` | CI/CD: push a main → deploy automático |
| `.env.example` | Plantilla de variables EmailJS |

---

## PASO 1 — GitHub Secrets (3 secretos)

> Si ya los configuraste para **agenda-iker**, no tienes que hacer nada. Se comparten.

Ve a tu repo en GitHub → **Settings → Secrets and variables → Actions → New repository secret**

| Nombre del Secret | Valor |
|---|---|
| `VPS_HOST` | `212.227.227.231` |
| `VPS_USER` | `root` |
| `SSH_PRIVATE_KEY` | Contenido completo de la clave privada SSH (desde `-----BEGIN OPENSSH PRIVATE KEY-----` hasta `-----END OPENSSH PRIVATE KEY-----` inclusive) |

---

## PASO 2 — Configurar el servidor (solo una vez)

Conéctate por SSH:
```bash
ssh root@212.227.227.231
```

### 2.1 Clonar el repositorio

```bash
mkdir -p /root/apps && cd /root/apps
git clone https://github.com/devikerhdez/Portfolio_Iker_Hdez.git
cd Portfolio_Iker_Hdez
```

### 2.2 Crear el `.env` (opcional, solo si necesitas sobreescribir EmailJS)

```bash
cp .env.example .env
nano .env
```

> Las variables EmailJS ya están integradas en el build de Vite. Solo necesitas `.env` si quieres cambiarlas en el servidor sin tocar el código.

### 2.3 Primer despliegue manual

```bash
docker compose up -d --build
```

Esto tarda ~1-2 minutos la primera vez. Verifica:
```bash
docker compose ps
# Deberías ver "portfolio" en estado "Up"
```

### 2.4 Verificar que funciona

Abre en el navegador: `http://212.227.227.231:8443`

---

## PASO 3 — CI/CD automático

A partir de ahora, cada vez que hagas:
```bash
git push origin main
```

GitHub Actions automáticamente:
1. Conecta al servidor via SSH
2. Hace `git pull`
3. Ejecuta `docker compose up -d --build`
4. Limpia imágenes antiguas

Puedes ver el progreso en: **GitHub → tu repo → Actions**

---

## OPCIONAL — Configurar dominio con Nginx Proxy Manager

Si tienes un dominio (ej: `ikerhdez.com`), puedes apuntarlo al portfolio:

1. Abre NPM: `http://212.227.227.231:81`
2. **Add Proxy Host**
   - Domain: `ikerhdez.com` (o `portfolio.tudominio.com`)
   - Forward Hostname: `host.docker.internal` o la IP del contenedor
   - Forward Port: `3000`
3. Activa **SSL con Let's Encrypt**
4. Accede por `https://ikerhdez.com`

---

## Arquitectura final

```
Servidor 212.227.227.231
├── Puerto 80/443 → Nginx Proxy Manager (ya existe)
│   ├── agenda-iker (frontend + backend)
│   └── portfolio → :8443
├── Puerto 8443 → Portfolio (contenedor Docker)
├── Puerto 8080 → Agenda Backend (contenedor Docker)
└── Puerto 22 → SSH
```
Servidor 212.227.227.231
├── Puerto 80/443 → Nginx Proxy Manager
│   ├── agenda-iker (frontend + backend)
│   └── portfolio → :3000
├── Puerto 81 → NPM Admin Panel
├── Puerto 3000 → Portfolio (contenedor Docker)
├── Puerto 8080 → Agenda Backend (contenedor Docker)
└── Puerto 22 → SSH
```

---

## Trabajo en LOCAL

```bash
npm run dev
# Abre http://localhost:5173
```

No necesitas cambiar ningún archivo para trabajar en local.
