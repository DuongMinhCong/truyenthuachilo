// Khởi tạo Firebase và gán auth, db vào window

if (!firebase?.apps?.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDQAv89k6yp8C0yqCm5mgaw72B8WgODM7Q",
    authDomain: "truyenthuachilo.firebaseapp.com",
    projectId: "truyenthuachilo",
    storageBucket: "truyenthuachilo.firebasestorage.app",
    messagingSenderId: "321328276702",
    appId: "1:321328276702:web:6306e2ca67ed5e2f7ace4f",
    measurementId: "G-N1GHQ4JGNH"
  });
}

if (!window.auth) {
  window.auth = firebase.auth();
  window.db = firebase.firestore();
}
