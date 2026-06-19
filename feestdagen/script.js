class HolidayDashboard {
  constructor() {
    this.apiUrl = 'https://date.nager.at/Api/v3/NextPublicHolidays/NL';
  }

  async init() {
    const response = await fetch(this.apiUrl);
    const holidays = await response.json();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let nextHoliday = null;
    for (let i = 0; i < holidays.length; i++) {
      const holidayDate = new Date(holidays[i].date);
      if (holidayDate >= today) {
        nextHoliday = holidays[i];
        break;
      }
    }
    
    if (!nextHoliday) {
      document.getElementById('holiday-dashboard').innerHTML = '<p>Geen feestdagen meer dit jaar</p>';
      return;
    }
    
    const date = new Date(nextHoliday.date);
    const timeDiff = date - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'];
    const monthName = months[date.getMonth()];
    
    const html = '<div style="border: 1px solid #ccc; padding: 15px; border-radius: 5px;">' +
                 '<h4>' + nextHoliday.name + '</h4>' +
                 '<p>' + date.getDate() + ' ' + monthName + '</p>' +
                 '<p>Nog ' + daysLeft + ' dagen</p>' +
                 '</div>';
    
    document.getElementById('holiday-dashboard').innerHTML = html;
  }
}