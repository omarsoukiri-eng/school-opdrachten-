async function getHolidays() {
    try {
        const response = await fetch('https://date.nager.at/api/v3/NextPublicHolidays/NL');
        
        if (!response.ok) {
            throw new Error('API fout');
        }
        
        const holidays = await response.json();
        displayHolidays(holidays);
    } catch (error) {
        document.getElementById('holidays').innerHTML = `<div class="error">Fout bij laden: ${error.message}</div>`;
    }
}

function displayHolidays(holidays) {
    if (holidays.length === 0) {
        document.getElementById('holidays').innerHTML = '<div class="empty">Geen feestdagen gevonden</div>';
        return;
    }

    let html = '';
    holidays.forEach(holiday => {
        const date = new Date(holiday.date).toLocaleDateString('nl-NL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        html += `
            <div class="holiday">
                <div class="holiday-date">${date}</div>
                <div class="holiday-name">${holiday.localName}</div>
            </div>
        `;
    });

    document.getElementById('holidays').innerHTML = html;
}

getHolidays();