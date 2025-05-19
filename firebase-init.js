<!-- Firebase App (core SDK) -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>

<!-- Firebase Analytics -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics-compat.js"></script>

<!-- Firebase Auth (nếu dùng đăng nhập) -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>

<!-- Firebase Firestore (nếu lưu dữ liệu người dùng, chương đã đọc, v.v.) -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>

<script>
  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDQAv89k6yp8C0yqCm5mgaw72B8WgODM7Q",
    authDomain: "truyenthuachilo.firebaseapp.com",
    projectId: "truyenthuachilo",
    storageBucket: "truyenthuachilo.firebasestorage.app",
    messagingSenderId: "321328276702",
    appId: "1:321328276702:web:6306e2ca67ed5e2f7ace4f",
    measurementId: "G-N1GHQ4JGNH"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

</script>
