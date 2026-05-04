importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBQaBmm1Ydr8rx2KWop8cQrOn4n30hAixQ",
  authDomain: "lewi-b41e7.firebaseapp.com",
  projectId: "lewi-b41e7",
  storageBucket: "lewi-b41e7.firebasestorage.app",
  messagingSenderId: "411640151338",
  appId: "1:411640151338:web:21b6e8e059b20d69163253"
});

const messaging = firebase.messaging();

// Handle background notifications (when app is closed)
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Mine', {
    body: body || 'You have a new notification',
    icon: icon || '/icon.png',
    badge: '/icon.png',
    data: payload.data,
    vibrate: [200, 100, 200],
    tag: 'mine-notification'
  });
});

// Click on notification opens the app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('lewshare.vercel.app') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('https://lewshare.vercel.app');
    })
  );
});
