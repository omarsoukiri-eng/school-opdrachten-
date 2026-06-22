async function getHolidays() {
    const year = new Date().getFullYear();
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/NL`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    const today = new Date();
    const result = document.getElementById('result');
    
    data.forEach(holiday => {
        const holidayDate = new Date(holiday.date);
        const days = Math.ceil((holidayDate - today) / (1000 * 60 * 60 * 24));
        
        if (days > 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${holiday.name}</td>
                <td>${holiday.date}</td>
                <td>${days}</td>
            `;
            result.appendChild(row);
        }
    });
}

getHolidays();