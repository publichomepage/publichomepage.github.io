importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCjv3ujxdF38vu768k-uMeBhOmGbnS3KSc",
    authDomain: "publichomepage-5e16d.firebaseapp.com",
    projectId: "publichomepage-5e16d",
    storageBucket: "publichomepage-5e16d.firebasestorage.app",
    messagingSenderId: "456000203028",
    appId: "1:456000203028:web:a532f63076adc79615fa01"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/assets/img/apple-touch-icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
