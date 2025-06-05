importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDJHmgaPOqD7ZFamramOJv2PcLUuGjU0l8",
  authDomain: "taskpinoymart.firebaseapp.com",
  projectId: "taskpinoymart",
  storageBucket: "taskpinoymart.firebasestorage.app",
  messagingSenderId: "636185685332",
  appId: "1:636185685332:web:24267acff148820baeecc1",
  measurementId: "G-JPC0BJ3FV4"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});