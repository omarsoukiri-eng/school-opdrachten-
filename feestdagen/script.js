// 1. Feestdagen ophalen via API
async function getNextHolidaysNederland() {
  const year = new Date().getFullYear();
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/NL`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API fout: ${response.status}`);
    
    const holidays = await response.json();
    return filterUpcomingHolidays(holidays);
  } catch (error) {
    console.error('Kon feestdagen niet ophalen:', error);
    return [];
  }
}

// 2. Filter: alleen toekomstige feestdagen
function filterUpcomingHolidays(holidays) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Geen tijd-deel
  
  return holidays
    .filter(h => new Date(h.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5); // Volgende 5 feestdagen
}

// 3. In het Dashboard tonen
async function showHolidaysOnDashboard() {
  const holidays = await getNextHolidaysNederland();
  const container = document.getElementById('holidays-container');
  
  if (holidays.length === 0) {
    container.innerHTML = '<p>Geen feestdagen geplanificeerd.</p>';
    return;
  }
  
  const html = holidays.map(h => {
    const daysLeft = daysUntil(h.date);
    return `
      <div class="holiday-item">
        <strong>${h.name}</strong>
        <span>${new Date(h.date).toLocaleDateString('nl-NL')}</span>
        <small>${daysLeft} dagen</small>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
}

// 4. Helper: bereken dagen tot feestdag
function daysUntil(dateString) {
  const today = new Date();
  const target = new Date(dateString);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Vandaag!' : `Over ${diff}`;
}

// Start
showHolidaysOnDashboard();