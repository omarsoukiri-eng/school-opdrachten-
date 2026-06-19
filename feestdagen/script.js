/**
 * Hoofdapp - initialisatie en event listeners
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('App gestart');

    // Initialisatie
    displayToday();
    setTodayAsDefault();
    dashboard.loadSchoolDays();
    dashboard.updateStats();

    // NAVIGATIE
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            switchPage(page);
        });
    });

    // FORMULIER
    document.getElementById('register-form').addEventListener('submit', handleFormSubmit);

    // OVERZICHT TONEN
    document.addEventListener('click', function(e) {
        if (e.target.closest('.nav-link[data-page="overzicht"]')) {
            loadEntries();
        }
    });

    // Refresh schooldagen elke uur
    setInterval(() => dashboard.loadSchoolDays(), 60 * 60 * 1000);
});

/**
 * Wissel tussen pagina's
 */
function switchPage(page) {
    // Verberg alles
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Toon gekozen pagina
    document.getElementById(page).classList.add('active');
    
    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
}

/**
 * Handle formulier submit
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const date = document.getElementById('work-date').value;
    const hours = parseFloat(document.getElementById('hours').value);
    const description = document.getElementById('description').value;
    const messageDiv = document.getElementById('form-message');

    // Validatie
    if (!date || hours <= 0) {
        showMessage('messageDiv', 'Vul alle verplichte velden in', 'error');
        return;
    }

    // Opslaan
    try {
        saveEntry({ date, hours, description });
        
        // Reset formulier
        document.getElementById('register-form').reset();
        setTodayAsDefault();
        
        showMessage('form-message', '✅ Uren succesvol opgeslagen!', 'success');
        dashboard.updateStats();
    } catch (error) {
        showMessage('form-message', '❌ Fout bij opslaan', 'error');
    }
}

/**
 * Laad overzicht van geregistreerde uren
 */
function loadEntries() {
    const entries = getEntries();
    const container = document.getElementById('entries-list');

    if (entries.length === 0) {
        container.innerHTML = '<p>Nog geen uren geregistreerd.</p>';
        return;
    }

    const html = entries
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(entry => `
            <div class="entry-item">
                <strong>${formatDateNL(entry.date)}</strong>
                <span>${entry.hours} uur</span>
                ${entry.description ? `<small>${entry.description}</small>` : ''}
            </div>
        `).join('');

    container.innerHTML = html;
}

/**
 * Toon bericht
 */
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `message ${type}`;
    
    // Verwijder na 5 seconden
    setTimeout(() => {
        element.className = 'message';
    }, 5000);
}