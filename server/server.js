const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, generateTicketId } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// ===== API: Create Ticket =====
app.post('/api/tickets', (req, res) => {
    const { name, email, phone, service, priority, message } = req.body;

    if (!name || !email || !service || !message) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const ticketId = generateTicketId();

    try {
        db.prepare(`
            INSERT INTO tickets (ticket_id, name, email, phone, service, priority, message)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(ticketId, name, email, phone || '', service, priority || 'normal', message);

        res.status(201).json({ ticketId, message: 'Ticket creado correctamente' });
    } catch (err) {
        console.error('Error creating ticket:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// ===== API: Get All Tickets =====
app.get('/api/tickets', (req, res) => {
    try {
        const tickets = db.prepare('SELECT * FROM tickets ORDER BY created_at DESC').all();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener tickets' });
    }
});

// ===== API: Get Ticket by ID =====
app.get('/api/tickets/:ticketId', (req, res) => {
    try {
        const ticket = db.prepare('SELECT * FROM tickets WHERE ticket_id = ?').get(req.params.ticketId);
        if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener ticket' });
    }
});

// ===== API: Update Ticket Status =====
app.patch('/api/tickets/:ticketId/status', (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pendiente', 'en-proceso', 'resuelto', 'cerrado'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Estado no válido' });
    }

    try {
        const result = db.prepare(`
            UPDATE tickets SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE ticket_id = ?
        `).run(status, req.params.ticketId);

        if (result.changes === 0) return res.status(404).json({ error: 'Ticket no encontrado' });
        res.json({ message: 'Estado actualizado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar ticket' });
    }
});

// ===== API: Contact Form =====
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        db.prepare(`
            INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)
        `).run(name, email, message);
        res.status(201).json({ message: 'Mensaje enviado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al enviar mensaje' });
    }
});

// ===== Serve index.html for root =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🛡️  SoporteTIC.shop server running on http://localhost:${PORT}`);
});
