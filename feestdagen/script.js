async function getHolidays() {
    try {
        const response = await fetch('https://date.nager.at/api/v3/NextPublicHolidays/NL');
        const holidays = await response.json();
        
        let html = '<ul>';
        holidays.forEach(holiday => {
            const date = new Date(holiday.date).toLocaleDateString('nl-NL');
            html += `<li>${date} - ${holiday.localName}</li>`;
        });
        html += '</ul>';
        
        document.getElementById('holidays').innerHTML = html;
    } catch (error) {
        document.getElementById('holidays').innerHTML = '<p>Fout: ' + error.message + '</p>';
    }
}

getHolidays();