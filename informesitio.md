# Informe: Despliegue del sitio SoporteTIC.shop

## 1. Descripción general

Sitio web de soporte técnico especializado en ciberseguridad, desplegado de forma gratuita usando GitHub Pages, Formspree y el dominio gestionado en Hostinger.

**URL del sitio:** https://soportetic.shop

---

## 2. Arquitectura completa

```
┌─────────────────────────────────────────────────────────────────────┐
│                        soportetic.shop                              │
│                    (Dominio en Hostinger)                           │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    DNS Zone Editor (Hostinger)
                    ┌──────────┴──────────┐
                    │ Registros A → GitHub │
                    │ 185.199.108.153     │
                    │ 185.199.109.153     │
                    │ 185.199.110.153     │
                    │ 185.199.111.153     │
                    │ CNAME www → GitHub   │
                    └──────────┬──────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    GitHub Pages (Hosting)                            │
│              cercador1001999-code.github.io/SoporteTiC               │
│                                                                     │
│  Repo: github.com/cercador1001999-code/SoporteTiC (Público)         │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │  index.html        → Landing page (HTML)                   │     │
│  │  css/styles.css    → Estilos (tema cyber dark)             │     │
│  │  js/main.js        → JS frontend + envío a Formspree       │     │
│  │  logo_nobg.png     → Logo sin fondo                        │     │
│  │  0b355b4c...gif    → GIF animado del hero                  │     │
│  │  server/           → Backend (no se usa en Pages)          │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                     │
│  SSL: Certificado automático (Let's Encrypt)                        │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    Formulario de soporte
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Formspree (Backend del formulario)                │
│                  https://formspree.io/f/mwlvbpjg                    │
│                                                                     │
│  Recibe los datos del formulario:                                   │
│  - Nombre, Email, Teléfono                                          │
│  - Tipo de servicio, Prioridad                                      │
│  - Mensaje                                                          │
│                                                                     │
│  Entrega a: Tu email configurado en Formspree                        │
│  Panel: https://formspree.io/forms                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Estructura de archivos del proyecto

```
soportetic/
├── index.html              # Landing page completa
├── css/
│   └── styles.css          # Estilos (tema dark cyber con gradientes cyan/purple)
├── js/
│   └── main.js             # Navbar, animaciones, terminal animado, form submission
├── server/
│   ├── server.js           # Express API (tickets CRUD + contacto) — para uso local
│   └── database.js         # SQLite con tablas tickets y contacts — para uso local
├── logo.png                # Logo original
├── logo_nobg.png           # Logo con fondo removido (usado en el sitio)
├── 0b355b4c7d2e5ba6.gif   # GIF animado del hero (escudo de ciberseguridad)
├── 1791587054629.jpg       # Imagen del logo alternativa
├── package.json            # Dependencias Node.js (express, better-sqlite3, cors)
├── render.yaml             # Configuración para Render (alternativa de deploy)
├── .gitignore              # Archivos ignorados por git
└── README.md               # Instrucciones del proyecto
```

---

## 4. Flujo paso a paso del despliegue

### PASO 1: Crear el sitio web
- `index.html` — Landing page con secciones: hero, servicios, ciberseguridad, por qué nosotros, contacto, footer
- `css/styles.css` — Tema dark con variables CSS, gradientes cyan/purple, responsive
- `js/main.js` — Navbar scroll effect, mobile menu, smooth scroll, terminal animation, scroll reveal
- `logo_nobg.png` — Logo original con fondo removido usando Python/PIL
- `0b355b4c7d2e5ba6.gif` — GIF animado en el hero section
- `server/` — Backend Express + SQLite para uso local

### PASO 2: Adaptar para hosting gratis
- Cambiar el formulario de backend propio (Express) a Formspree
- Eliminar la dependencia de servidor para que funcione en GitHub Pages (estático)
- El backend en `server/` queda disponible para uso local o deploy en VPS/Render

### PASO 3: Subir a GitHub
- `git init` + `git commit` en la carpeta del proyecto
- Crear repositorio público: `github.com/cercador1001999-code/SoporteTiC`
- Configurar git con usuario `cercador1001999-code` y email `cercador1001999@gmail.com`
- `git push` para subir el código

### PASO 4: Activar GitHub Pages
- Settings → Pages → Source: Deploy from a branch
- Branch: `main` → carpeta `/ (root)`
- URL temporal: `https://cercador1001999-code.github.io/SoporteTiC/`
- El repo debe ser **público** para que Pages funcione gratis

### PASO 5: Configurar Formspree
- Crear cuenta en `https://formspree.io` (gratis, sin tarjeta)
- Crear formulario → endpoint: `https://formspree.io/f/mwlvbpjg`
- Pegar endpoint en `js/main.js` (variable `FORMSPREE_ENDPOINT`)
- `git push` para actualizar GitHub Pages
- Los formularios llegan al email configurado en Formspree

### PASO 6: Conectar dominio soportetic.shop
- GitHub Pages → Settings → Custom domain: `soportetic.shop`
- Hostinger → Cambiar nameservers de parking a Hostinger:
  - `ns1.dns-parking.com`
  - `ns2.dns-parking.com`
- Hostinger → DNS Zone Editor:
  - 4 registros A apuntando a las IPs de GitHub Pages:
    - `@ → 185.199.108.153` (TTL: 3600)
    - `@ → 185.199.109.153` (TTL: 3600)
    - `@ → 185.199.110.153` (TTL: 3600)
    - `@ → 185.199.111.153` (TTL: 3600)
  - 1 registro CNAME:
    - `www → cercador1001999-code.github.io` (TTL: 3600)
- GitHub → Certificado SSL automático (Let's Encrypt) — tardó ~15 minutos
- **Resultado:** `https://soportetic.shop` funcionando

---

## 5. Servicios utilizados (todos gratuitos)

| Servicio | Función | Costo | Requiere tarjeta |
|-----------|---------|-------|------------------|
| **Hostinger** | Gestión del dominio + DNS | $0 (solo dominio) | No |
| **GitHub Pages** | Hosting del sitio web estático | $0 | No |
| **Formspree** | Procesar formularios de contacto | $0 (50 envíos/mes) | No |
| **Let's Encrypt** | Certificado SSL/HTTPS | $0 | No |

---

## 6. Secciones del sitio

| Sección | Descripción |
|---------|------------|
| **Navbar** | Logo SoporteTIC, menú de navegación, botón CTA |
| **Hero** | Badge 24/7, título principal, stats, GIF animado, shield card con features |
| **Trust Bar** | 5 iconos de garantías (soporte remoto, respuesta rápida, etc.) |
| **Servicios** | 6 tarjetas: Ciberseguridad (destacado), Software, Hardware, Redes, Datos, Consultoría IT |
| **Ciberseguridad** | Sección destacada con terminal animado simulando un security scan |
| **¿Por qué nosotros?** | 4 tarjetas numeradas con ventajas |
| **Contacto** | Formulario que envía a Formspree + datos de contacto |
| **Footer** | Logo, descripción, links de servicios, links de empresa, contacto |

---

## 7. Backend local (opcional)

El proyecto incluye un backend Node.js/Express con SQLite para uso local:

```bash
cd soportetic
npm install
npm start
# Servidor en http://localhost:3000
```

### API Endpoints (uso local)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/tickets` | Crear ticket de soporte |
| GET | `/api/tickets` | Listar todos los tickets |
| GET | `/api/tickets/:id` | Obtener ticket por ID |
| PATCH | `/api/tickets/:id/status` | Actualizar estado del ticket |
| POST | `/api/contact` | Formulario de contacto |

### Base de datos SQLite

Tablas:
- **tickets**: `id`, `ticket_id`, `name`, `email`, `phone`, `service`, `priority`, `message`, `status`, `created_at`, `updated_at`
- **contacts**: `id`, `name`, `email`, `message`, `created_at`

---

## 8. Cómo actualizar el sitio

Cualquier cambio en el código se sube con:

```bash
git add -A
git commit -m "Descripción del cambio"
git push
```

GitHub Pages se actualiza automáticamente en 1-2 minutos.

---

## 9. Información de cuentas

| Servicio | Usuario | Email |
|-----------|---------|-------|
| GitHub | cercador1001999-code | cercador1001999@gmail.com |
| Formspree | (email configurado) | cercador1001999@gmail.com |
| Hostinger | (cuenta del dominio) | — |

---

## 10. Fecha de despliegue

- **Fecha:** 9 de octubre, 2026
- **Estado:** Activo y funcionando en https://soportetic.shop
- **SSL:** Activo (Let's Encrypt)
