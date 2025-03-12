// Firebase配置文件
const firebaseConfig = {
    apiKey: "AIzaSyB5YFqNIDP3uB0CZ-Vhq9uNCd_o0CcWa04",
    authDomain: "renovationbuddy-535ef.firebaseapp.com",
    projectId: "renovationbuddy-535ef",
    storageBucket: "renovationbuddy-535ef.firebasestorage.app",
    messagingSenderId: "265922553026",
    appId: "1:265922553026:web:9b9ca64ef7772d9d41c75b"
  };
  
  // 初始化 Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
  