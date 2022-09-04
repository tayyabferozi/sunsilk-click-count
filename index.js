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
  apiKey: "AIzaSyAoVy8g-eDYBBG6RZJWxxcRLzZOvkQnZiI",
  authDomain: "sunsilk-b17e2.firebaseapp.com",
  projectId: "sunsilk-b17e2",
  storageBucket: "sunsilk-b17e2.appspot.com",
  messagingSenderId: "341828047752",
  appId: "1:341828047752:web:21d43068d8e8e9a451203d",
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
