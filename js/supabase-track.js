// Supabase tracking - visitas y formularios
const SUPABASE_URL = 'https://pojkzeitnccrzmmfplaq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_chNtOK7xA5R1UF57BHiB-A_emqKCWze';

// Obtener país del visitante
async function getCountry() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return data.country_name || 'Desconocido';
    } catch {
        return null;
    }
}

// Registrar visita al cargar la página
(async function trackVisit() {
    try {
        const country = await getCountry();
        const visitData = {
            page: window.location.pathname,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            language: navigator.language,
            screen_resolution: `${screen.width}x${screen.height}`,
            country: country
        };

        await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(visitData)
        });
    } catch (err) {
        console.error('Error tracking visit:', err);
    }
})();

// Función global para enviar formularios a Supabase
window.trackFormSubmission = async function(formType, formData) {
    try {
        const data = {
            form_type: formType,
            name: formData.name || formData.nombre || null,
            email: formData.email || null,
            phone: formData.phone || null,
            service: formData.service || null,
            priority: formData.priority || null,
            message: formData.message || null,
            consulta_tipo: formData.consulta_tipo || null,
            producto: formData.producto || null,
            licencia: formData.licencia || null,
            source: window.location.hostname,
            extra_data: formData
        };

        await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error('Error tracking form:', err);
    }
};
