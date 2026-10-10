# SoporteTIC.shop

Sitio web de soporte técnico especializado en ciberseguridad, software y hardware.

## Estructura

```
soportetic/
├── index.html          # Landing page
├── css/
│   └── styles.css      # Estilos (tema dark cyber)
├── js/
│   └── main.js         # Lógica frontend
├── server/
│   ├── server.js       # Servidor Express
│   └── database.js     # Configuración SQLite
├── package.json
└── README.md
```

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

## Deploy en Hostinger

1. Sube todos los archivos al directorio `public_html` via FTP o File Manager
2. En Hostinger, crea una base de datos MySQL (alternativa a SQLite)
3. Si usas Node.js hosting en Hostinger:
   - Sube el proyecto completo
   - En hPanel → Advanced → Node.js, configura:
     - App root: `soportetic`
     - Entry point: `server/server.js`
   - Instala dependencias: `npm install`
   - Inicia la app

### Nameservers configurados
- `byte.dns-parking.com`
- `pixel.dns-parking.com`

## Base de datos

Usa SQLite (archivo `database/soportetic.db`) que se crea automáticamente al primer arranque.

Tablas:
- **tickets**: Tickets de soporte (id, ticket_id, name, email, phone, service, priority, message, status, timestamps)
- **contacts**: Mensajes de contacto (id, name, email, message, timestamp)
