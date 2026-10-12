// Supabase tracking - visitas y formularios
const SUPABASE_URL = 'https://pojkzeitnccrzmmfplaq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_chNtOK7xA5R1UF57BHiB-A_emqKCWze';

// Obtener país e IP del visitante (con fallback)
async function getGeoData() {
    // Intentar con ipapi.co
    try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
            const data = await res.json();
            if (data.ip) {
                return {
                    country: data.country_name || 'Desconocido',
                    ip: data.ip
                };
            }
        }
    } catch {}
    // Fallback: ipwho.is
    try {
        const res = await fetch('https://ipwho.is/');
        if (res.ok) {
            const data = await res.json();
            if (data.ip) {
                return {
                    country: data.country || 'Desconocido',
                    ip: data.ip
                };
            }
        }
    } catch {}
    // Fallback: api.ipify.org (solo IP, sin país)
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        if (res.ok) {
            const data = await res.json();
            if (data.ip) {
                return { country: null, ip: data.ip };
            }
        }
    } catch {}
    return { country: null, ip: null };
}

// Registrar visita al cargar la página
(async function trackVisit() {
    try {
        const geo = await getGeoData();
        const visitData = {
            page: window.location.pathname,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            language: navigator.language,
            screen_resolution: `${screen.width}x${screen.height}`,
            country: geo.country,
            ip: geo.ip
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
