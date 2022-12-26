import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAvvoU80CVCxzB-a0WA_LbSAi2aEki-7YA",
  authDomain: "web-final-project-c154c.firebaseapp.com",
  projectId: "web-final-project-c154c",
  storageBucket: "web-final-project-c154c.appspot.com",
  messagingSenderId: "394191602574",
  appId: "1:394191602574:web:f5856f578ca419328cdadf",
  measurementId: "G-KBM4D45TD8"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;