import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./styles.css";


/*
============================================================
ZENOVA NOTE STUDIO
Application Entry Point
============================================================

This file is responsible for starting the React application.

Firebase will NOT be initialized directly here.

Firebase will have its own dedicated files:

src/firebase/
    firebaseConfig.js
    auth.js
    firestore.js
    storage.js

This keeps the application clean and makes it easier to
expand Zenova later.
============================================================
*/


const rootElement = document.getElementById("root");


if (!rootElement) {
  throw new Error(
    "Zenova Note Studio could not find the React root element."
  );
}


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
