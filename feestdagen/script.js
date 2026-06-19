/**
 * API-integratie voor Nederlandse feestdagen
 * Bron: https://date.nager.at/Api
 */

class HolidayAPI {
    constructor() {
        this.baseUrl = 'https://date.nager.at/api/v3';
        this.countryCode = 'NL';
        this.cache = null;
        this.cacheTime = null;
        this.CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 uur
    }

    /**
     * Haal alle feestdagen van dit jaar op
     */
    async getHolidaysThisYear() {
        const year = new Date().getFullYear();
        return this.getHolidaysByYear(year);
    }

    /**
     * Haal feestdagen voor specifiek jaar op
     */
    async getHolidaysByYear(year) {
        // Check cache
        if (this.cache && this.cacheTime && Date.now() - this.cacheTime < this.CACHE_DURATION) {
            return this.cache;
        }

        try {
            const url = `${this.baseUrl}/PublicHolidays/${year}/${this.countryCode}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const holidays = await response.json();
            
            // Cache het resultaat
            this.cache = holidays;
            this.cacheTime = Date.now();
            
            return holidays;
        } catch (error) {
            console.error('Fout bij ophalen feestdagen:', error);
            return [];
        }
    }

    /**
     * Geef volgende X schooldagen (exclusief feestdagen)
     */
    async getUpcomingSchoolDays(count = 3) {
        const holidays = await this.getHolidaysThisYear();
        const holidayDates = holidays.map(h => h.date);
        
        const schoolDays = [];
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        while (schoolDays.length < count) {
            const dateString = currentDate.toISOString().split('T')[0];
            const dayOfWeek = currentDate.getDay();

            // Voeg toe als: niet weekend (0=zondag, 6=zaterdag) EN geen feestdag
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidayDates.includes(dateString)) {
                schoolDays.push({
                    date: dateString,
                    daysFromNow: this.getDaysFromNow(currentDate),
                    dayName: this.getDutchDayName(dayOfWeek),
                    isHoliday: false
                });
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return schoolDays;
    }

    /**
     * Geef volgende X feestdagen
     */
    async getUpcomingHolidays(count = 5) {
        const holidays = await this.getHolidaysThisYear();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return holidays
            .filter(h => new Date(h.date) >= today)
            .slice(0, count)
            .map(h => ({
                ...h,
                daysFromNow: this.getDaysFromNow(new Date(h.date)),
                dayName: this.getDutchDayName(new Date(h.date).getDay()),
                isHoliday: true
            }));
    }

    /**
     * Helper: bereken hoeveel dagen vanaf nu
     */
    getDaysFromNow(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        return diff;
    }

    /**
     * Helper: Nederlandse dagnamen
     */
    getDutchDayName(dayOfWeek) {
        const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
        return days[dayOfWeek];
    }
}

// Globale instantie
const holidayAPI = new HolidayAPI();