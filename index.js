// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  increment,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMjYLmqBKqPMuCCUMxIzYX8ZF1pvRBhhg",
  authDomain: "sunsilk-9175d.firebaseapp.com",
  projectId: "sunsilk-9175d",
  storageBucket: "sunsilk-9175d.appspot.com",
  messagingSenderId: "1008151482240",
  appId: "1:1008151482240:web:e9f9d8c3f370d7774bbb65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const buttons = document.querySelectorAll(".buy_now_btn_warper");

buttons.forEach((el) => {
  el.addEventListener("click", async function (e) {
    const prod = e.target.getAttribute("data-prod-name");
    const docRef = ref(db, "products/" + prod);

    set(docRef, { count: increment(1) });
  });
});

onValue(ref(db, "products/"), (snapshot) => {
  const data = snapshot.val();

  let markup = "";
  for (const key in data) {
    console.log(data[key]);
    markup += `
      <div>${key} : ${data[key].count}</div>
    `;
  }

  const el = document.querySelector(".listing");

  if (el) el.innerHTML = markup;
});
