import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./styles.css";


/*
============================================================
ZENOVA NOTE STUDIO
MAIN APPLICATION ENTRY
============================================================

This is the starting point of the browser-based
ZENOVA NOTE STUDIO software.

index.html
     ↓
main.jsx
     ↓
App.jsx
     ↓
ZENOVA NOTE STUDIO SOFTWARE


IMPORTANT ARCHITECTURE

Firebase will NOT be written directly inside this file.

Later our Firebase layer will be separated:

src/
└── firebase/
    ├── config.js
    ├── auth.js
    ├── firestore.js
    └── storage.js

This keeps the editor independent from the database.
============================================================
*/


/*
------------------------------------------------------------
FIND THE APPLICATION ROOT
------------------------------------------------------------
*/

const rootElement =
  document.getElementById("root");


/*
------------------------------------------------------------
SAFETY CHECK
------------------------------------------------------------
*/

if (!rootElement) {

  throw new Error(
    "ZENOVA NOTE STUDIO: Application root was not found."
  );

}


/*
------------------------------------------------------------
START REACT APPLICATION
------------------------------------------------------------
*/

ReactDOM
  .createRoot(rootElement)
  .render(

    <React.StrictMode>

      <App />

    </React.StrictMode>

  );
