import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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
const db = getFirestore(app);

const submit = document.getElementById("submit");

submit.addEventListener("click", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      displayName: username
    });

    alert("Account created!");
    window.location.href = "index.html";

  } catch (error) {
    alert("Invalid Input Please Try Again 🥺");
  }
});
