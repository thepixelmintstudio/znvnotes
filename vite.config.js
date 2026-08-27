import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


/*
============================================================
ZENOVA NOTE STUDIO
Vite Configuration
============================================================

ZENOVA NOTE STUDIO is a browser-based professional
note-authoring software.

Vite handles:

- Development server
- React compilation
- Production build
- Asset handling
- Local development
============================================================
*/


export default defineConfig({

  /*
  ----------------------------------------------------------
  REACT
  ----------------------------------------------------------
  */

  plugins: [
    react()
  ],


  /*
  ----------------------------------------------------------
  DEVELOPMENT SERVER
  ----------------------------------------------------------

  The software will normally run at:

  http://localhost:5173
  */

  server: {

    port: 5173,

    host: true

  },


  /*
  ----------------------------------------------------------
  BUILD
  ----------------------------------------------------------

  Modern browser target.
  */

  build: {

    target: "es2022"

  }

});
