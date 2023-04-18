import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC3DPsLoXKVzCiPFCx1aOsP8g4QGUNrhKs",
    authDomain: "whatsapp-clone-44a8f.firebaseapp.com",
    projectId: "whatsapp-clone-44a8f",
    storageBucket: "whatsapp-clone-44a8f.appspot.com",
    messagingSenderId: "333891223070",
    appId: "1:333891223070:web:9e38dd2f431efb1a11f80f"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()
  const provider = new GoogleAuthProvider()


  export  {app,auth,provider}