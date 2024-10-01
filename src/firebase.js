import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Twoje dane konfiguracyjne Firebase (pobierz z Firebase Console)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Token:', currentToken);
        // Zapisz token, aby wysyłać powiadomienia
      } else {
        console.log('Brak tokenu powiadomień. Prośba o uprawnienia nie powiodła się.');
      }
    })
    .catch((err) => {
      console.log('Błąd podczas pobierania tokenu.', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
