import React from "react";


/*
============================================================
ZENOVA NOTE STUDIO
APPLICATION ROOT
============================================================

This file is intentionally small.

App.jsx is the entry shell of the software.

The actual software will eventually be divided into:

    Application
        ↓
    Workspace
        ↓
    Editor
        ↓
    Document
        ↓
    Blocks
        ↓
    Firebase


We do NOT want all of that code inside App.jsx.

============================================================
*/


function App() {

  return (

    <div className="zenova-app">

      {/*

        The complete Zenova workspace will be mounted here.

        Later this area will contain:

        ┌─────────────────────────────────────────────┐
        │ ZENOVA NOTE STUDIO                          │
        ├────────────┬────────────────────┬───────────┤
        │            │                    │           │
        │ TOOLS      │     A4 EDITOR      │ PROPERTIES│
        │            │                    │           │
        │            │                    │           │
        └────────────┴────────────────────┴───────────┘

      */}

      <div className="zenova-loading">

        <div className="zenova-loading-logo">

          ZEN<span>O</span>VA

        </div>

        <div className="zenova-loading-text">

          NOTE STUDIO

        </div>

      </div>

    </div>

  );

}


export default App;
