import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCh2fNcrB9IgLF91kLNNnWfVa1oSwgHgGs",
  authDomain: "create-account-251e0.firebaseapp.com",
  projectId: "create-account-251e0",
  storageBucket: "create-account-251e0.appspot.com",
  messagingSenderId: "236042891397",
  appId: "1:236042891397:web:b2b48def7b08d23768b9ec",
  measurementId: "G-B7S22S789D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = document.getElementById("login");

login.addEventListener("click", async function (event) {
  event.preventDefault();
 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email
    }));

    window.location.href = "main.html";

  } catch (error) {
    alert("Invalid Email or Password ");
  }
});
