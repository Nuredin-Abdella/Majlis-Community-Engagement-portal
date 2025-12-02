// Prayer Times Component JavaScript

class PrayerTimesApp {
    constructor() {
        this.prayerTimes = null;
        this.location = null;
        this.notificationsEnabled = false;
        this.countdownInterval = null;
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkStoredLocation();
        this.startAutoUpdate();
    }

    setupEventListeners() {
        // Change location button
        document.getElementById('changeLocationBtn').addEventListener('click', () => {
            this.showLocationModal();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.hideLocationModal();
        });

        // Use geolocation
        document.getElementById('useGeolocationBtn').addEventListener('click', () => {
            this.getGeolocation();
        });

        // Manual location
        document.getElementById('manualLocationBtn').addEventListener('click', () => {
            this.setManualLocation();
        });

        // Notification toggle
        document.getElementById('notificationBtn').addEventListener('click', () => {
            this.toggleNotifications();
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('locationModal');
            if (e.target === modal) {
                this.hideLocationModal();
            }
        });
    }

    checkStoredLocation() {
        const stored = localStorage.getItem('prayerLocation');
        if (stored) {
            this.location = JSON.parse(stored);
            this.updateLocationDisplay();
            this.fetchPrayerTimes();
        } else {
            this.getGeolocation();
        }
    }

    getGeolocation() {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            this.showLocationModal();
            return;
        }

        document.getElementById('locationDisplay').textContent = 'Getting location...';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    type: 'coordinates'
                };
                localStorage.setItem('prayerLocation', JSON.stringify(this.location));
                this.hideLocationModal();
                this.fetchPrayerTimes();
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to get your location. Please enter manually.');
                this.showLocationModal();
            }
        );
    }

    setManualLocation() {
        const city = document.getElementById('cityInput').value.trim();
        const country = document.getElementById('countryInput').value.trim();

        if (!city || !country) {
            alert('Please enter both city and country');
            return;
        }

        this.location = {
            city: city,
            country: country,
            type: 'manual'
        };

        localStorage.setItem('prayerLocation', JSON.stringify(this.location));
        this.hideLocationModal();
        this.fetchPrayerTimes();
    }

    async fetchPrayerTimes() {
        try {
            let url;
            const today = new Date();
            const timestamp = Math.floor(today.getTime() / 1000);

            if (this.location.type === 'coordinates') {
                url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${this.location.latitude}&longitude=${this.location.longitude}&method=2`;
            } else {
                url = `https://api.aladhan.com/v1/timingsByCity/${timestamp}?city=${encodeURIComponent(this.location.city)}&country=${encodeURIComponent(this.location.country)}&method=2`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 200) {
                this.prayerTimes = data.data;
                this.updateLocationDisplay();
                this.displayPrayerTimes();
                this.displayDates();
                this.displayCalculationMethod();
                this.startCountdown();
            } else {
                throw new Error('Failed to fetch prayer times');
            }
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            alert('Error loading prayer times. Please check your location and try again.');
            this.showLocationModal();
        }
    }

    updateLocationDisplay() {
        const display = document.getElementById('locationDisplay');
        if (this.location.type === 'manual') {
            display.textContent = `${this.location.city}, ${this.location.country}`;
        } else if (this.prayerTimes && this.prayerTimes.meta) {
            const meta = this.prayerTimes.meta;
            display.textContent = meta.timezone || 'Location detected';
        } else {
            display.textContent = 'Location detected';
        }
    }

    displayPrayerTimes() {
        const timings = this.prayerTimes.timings;
        
        // Main prayer times
        document.getElementById('fajrTime').textContent = this.formatTime(timings.Fajr);
        document.getElementById('dhuhrTime').textContent = this.formatTime(timings.Dhuhr);
        document.getElementById('asrTime').textContent = this.formatTime(timings.Asr);
        document.getElementById('maghribTime').textContent = this.formatTime(timings.Maghrib);
        document.getElementById('ishaTime').textContent = this.formatTime(timings.Isha);

        // Additional times
        document.getElementById('sunriseTime').textContent = this.formatTime(timings.Sunrise);
        document.getElementById('midnightTime').textContent = this.formatTime(timings.Midnight);

        this.highlightCurrentPrayer();
    }

    displayDates() {
        const date = this.prayerTimes.date;
        document.getElementById('hijriDate').textContent = `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`;
        document.getElementById('gregorianDate').textContent = date.readable;
    }

    displayCalculationMethod() {
        const method = this.prayerTimes.meta.method;
        document.getElementById('calculationMethod').textContent = `Calculation Method: ${method.name}`;
    }

    formatTime(time24) {
        // Remove timezone info if present
        const timeOnly = time24.split(' ')[0];
        const [hours, minutes] = timeOnly.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    parseTime(timeStr) {
        const timeOnly = timeStr.split(' ')[0];
        const [hours, minutes] = timeOnly.split(':');
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));
    }

    highlightCurrentPrayer() {
        const now = new Date();
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        const timings = this.prayerTimes.timings;
        
        // Remove all current highlights
        document.querySelectorAll('.prayer-card').forEach(card => {
            card.classList.remove('current');
        });

        // Find current prayer
        const prayerTimes = {
            fajr: this.parseTime(timings.Fajr),
            dhuhr: this.parseTime(timings.Dhuhr),
            asr: this.parseTime(timings.Asr),
            maghrib: this.parseTime(timings.Maghrib),
            isha: this.parseTime(timings.Isha)
        };

        let currentPrayer = null;
        for (let i = 0; i < prayers.length; i++) {
            const prayer = prayers[i];
            const nextPrayer = prayers[i + 1];
            
            if (now >= prayerTimes[prayer]) {
                if (nextPrayer && now < prayerTimes[nextPrayer]) {
                    currentPrayer = prayer;
                    break;
                } else if (!nextPrayer) {
                    currentPrayer = prayer;
                }
            }
        }

        if (currentPrayer) {
            const card = document.querySelector(`[data-prayer="${currentPrayer}"]`);
            if (card) card.classList.add('current');
        }
    }

    startCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        this.updateCountdown();
        this.countdownInterval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    updateCountdown() {
        const now = new Date();
        const timings = this.prayerTimes.timings;
        const prayers = [
            { name: 'Fajr', time: this.parseTime(timings.Fajr) },
            { name: 'Dhuhr', time: this.parseTime(timings.Dhuhr) },
            { name: 'Asr', time: this.parseTime(timings.Asr) },
            { name: 'Maghrib', time: this.parseTime(timings.Maghrib) },
            { name: 'Isha', time: this.parseTime(timings.Isha) }
        ];

        let nextPrayer = null;
        for (const prayer of prayers) {
            if (prayer.time > now) {
                nextPrayer = prayer;
                break;
            }
        }

        // If no prayer found today, next is Fajr tomorrow
        if (!nextPrayer) {
            const fajrTomorrow = new Date(prayers[0].time);
            fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
            nextPrayer = { name: 'Fajr', time: fajrTomorrow };
        }

        const diff = nextPrayer.time - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('nextPrayerName').textContent = nextPrayer.name;
        document.getElementById('countdownTimer').textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Check for notification (5 minutes before)
        if (this.notificationsEnabled && minutes === 4 && seconds === 59) {
            this.sendNotification(nextPrayer.name);
        }
    }

    async toggleNotifications() {
        if (!('Notification' in window)) {
            alert('This browser does not support notifications');
            return;
        }

        if (this.notificationsEnabled) {
            this.notificationsEnabled = false;
            this.updateNotificationButton();
        } else {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.notificationsEnabled = true;
                this.updateNotificationButton();
            } else {
                alert('Notification permission denied');
            }
        }
    }

    updateNotificationButton() {
        const btn = document.getElementById('notificationBtn');
        const text = document.getElementById('notificationText');
        
        if (this.notificationsEnabled) {
            btn.classList.add('enabled');
            text.textContent = 'Notifications On';
        } else {
            btn.classList.remove('enabled');
            text.textContent = 'Enable Notifications';
        }
    }

    sendNotification(prayerName) {
        if (this.notificationsEnabled && Notification.permission === 'granted') {
            new Notification('Prayer Time Reminder', {
                body: `${prayerName} prayer is in 5 minutes`,
                icon: '🕌',
                badge: '🕌'
            });
        }
    }

    startAutoUpdate() {
        // Update prayer times at midnight
        this.updateInterval = setInterval(() => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                this.fetchPrayerTimes();
            }
        }, 60000); // Check every minute
    }

    showLocationModal() {
        document.getElementById('locationModal').style.display = 'block';
    }

    hideLocationModal() {
        document.getElementById('locationModal').style.display = 'none';
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PrayerTimesApp();
});
