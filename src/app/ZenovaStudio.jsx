import React, { useState } from "react";


/*
============================================================
ZENOVA NOTE STUDIO
MAIN SOFTWARE WORKSPACE
============================================================

This is the main workspace of ZENOVA NOTE STUDIO.

V1 currently contains:

    • Application top bar
    • Content tools
    • A4 document area
    • Document information
    • Single / two-column selection
    • Special-box creation entry points

IMPORTANT:

This file is the workspace shell.

The actual engines will be separated later:

    editor/
    document/
    blocks/
    typography/
    firebase/

We are intentionally not putting the complete editor
inside this file.
============================================================
*/


function ZenovaStudio() {


  /*
  ----------------------------------------------------------
  DOCUMENT INFORMATION
  ----------------------------------------------------------

  These values represent the information that appears on
  the note page.

  Later this object will become part of the document model
  and will be saved to Firebase Firestore.
  ----------------------------------------------------------
  */

  const [documentInfo, setDocumentInfo] = useState({

    institution:
      "ZENOVA EDUCATIONS",

    subject:
      "PHYSICS",

    chapterNumber:
      "02",

    chapterName:
      "MOTION IN A STRAIGHT LINE",

    subtopic:
      "VELOCITY"

  });


  /*
  ----------------------------------------------------------
  PAGE LAYOUT
  ----------------------------------------------------------

  V1 supports:

      single column
      two columns
  ----------------------------------------------------------
  */

  const [pageLayout, setPageLayout] =
    useState("single");


  /*
  ----------------------------------------------------------
  UPDATE DOCUMENT INFORMATION
  ----------------------------------------------------------
  */

  function updateDocumentInfo(
    field,
    value
  ) {

    setDocumentInfo(
      (previous) => ({

        ...previous,

        [field]: value

      })
    );

  }


  /*
  ----------------------------------------------------------
  SPECIAL BOX BUTTON
  ----------------------------------------------------------

  For now this only records which box the user selected.

  The actual Box Creation system will be connected in
  the next stages.
  ----------------------------------------------------------
  */

  function openBoxCreator(
    boxType
  ) {

    console.log(
      "Create Zenova Box:",
      boxType
    );

  }


  return (

    <div className="zenova-workspace">


      {/* ==================================================
          TOP BAR
      ================================================== */}

      <header className="zenova-topbar">

        <div className="zenova-topbar-inner">


          {/* BRAND */}

          <div className="zenova-software-brand">

            <div className="zenova-software-logo">

              ZEN<span>O</span>VA

            </div>

            <div className="zenova-software-name">

              NOTE STUDIO

            </div>

          </div>


          {/* DOCUMENT TITLE */}

          <div className="zenova-current-document">

            <strong>

              {documentInfo.chapterName}

            </strong>

            <span>

              {documentInfo.subject}
              {" · "}
              Chapter {documentInfo.chapterNumber}

            </span>

          </div>


          {/* ACTIONS */}

          <div className="zenova-topbar-actions">

            <button
              type="button"
              title="Undo"
            >
              ↶
            </button>

            <button
              type="button"
              title="Redo"
            >
              ↷
            </button>

            <button
              type="button"
              className="zenova-save-button"
            >
              Save
            </button>

          </div>


        </div>

      </header>



      {/* ==================================================
          MAIN SOFTWARE AREA
      ================================================== */}

      <div className="zenova-main-area">


        {/* =================================================
            LEFT CONTENT TOOL PANEL
        ================================================= */}

        <aside className="zenova-left-panel">


          <div className="zenova-panel-heading">

            CONTENT

          </div>


          {/* TEXT */}

          <button
            type="button"
            className="zenova-content-tool"
          >

            <span className="zenova-tool-symbol">
              T
            </span>

            <span>
              Text
            </span>

          </button>


          <div className="zenova-tool-section-title">

            NOTE BOXES

          </div>


          {/* IMPORTANT */}

          <button
            type="button"
            className="zenova-content-tool"
            onClick={() =>
              openBoxCreator("important")
            }
          >

            <span
              className="zenova-tool-symbol important"
            >
              ★
            </span>

            <span>
              Important
            </span>

          </button>


          {/* FORMULA */}

          <button
            type="button"
            className="zenova-content-tool"
            onClick={() =>
              openBoxCreator("formula")
            }
          >

            <span
              className="zenova-tool-symbol formula"
            >
              ∑
            </span>

            <span>
              Formula
            </span>

          </button>


          {/* CONCEPT */}

          <button
            type="button"
            className="zenova-content-tool"
            onClick={() =>
              openBoxCreator("concept")
            }
          >

            <span
              className="zenova-tool-symbol concept"
            >
              ◆
            </span>

            <span>
              Concept
            </span>

          </button>


          {/* EXAMPLE */}

          <button
            type="button"
            className="zenova-content-tool"
            onClick={() =>
              openBoxCreator("example")
            }
          >

            <span
              className="zenova-tool-symbol example"
            >
              ✓
            </span>

            <span>
              Example
            </span>

          </button>


          {/* QUESTION */}

          <button
            type="button"
            className="zenova-content-tool"
            onClick={() =>
              openBoxCreator("question")
            }
          >

            <span
              className="zenova-tool-symbol question"
            >
              ?
            </span>

            <span>
              Question
            </span>

          </button>


          {/* TO REMEMBER */}

          <button
            type="button"
            className="zenova-content-tool"
            onClick={() =>
              openBoxCreator("remember")
            }
          >

            <span
              className="zenova-tool-symbol remember"
            >
              ★
            </span>

            <span>
              To Remember
            </span>

          </button>


          <div className="zenova-tool-section-title">

            MEDIA

          </div>


          {/* IMAGE */}

          <button
            type="button"
            className="zenova-content-tool"
          >

            <span className="zenova-tool-symbol">
              ▧
            </span>

            <span>
              Image
            </span>

          </button>


          {/* TABLE */}

          <button
            type="button"
            className="zenova-content-tool"
          >

            <span className="zenova-tool-symbol">
              ▦
            </span>

            <span>
              Table
            </span>

          </button>


        </aside>



        {/* =================================================
            EDITOR AREA
        ================================================= */}

        <section className="zenova-editor-area">


          {/* EDITOR TOOLBAR */}

          <div className="zenova-editor-toolbar">


            <div className="zenova-toolbar-left">

              <span>
                PAGE
              </span>

              <strong>
                A4
              </strong>

            </div>


            <div className="zenova-layout-controls">

              <span>
                LAYOUT
              </span>


              <button
                type="button"
                className={
                  pageLayout === "single"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPageLayout("single")
                }
              >

                Single Column

              </button>


              <button
                type="button"
                className={
                  pageLayout === "two"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPageLayout("two")
                }
              >

                Two Columns

              </button>

            </div>


            <div className="zenova-page-indicator">

              PAGE 01

            </div>


          </div>



          {/* PAGE AREA */}

          <div className="zenova-page-area">


            {/* =================================================
                A4 PAGE
            ================================================= */}

            <article className="zenova-a4-page">


              {/* PAGE HEADER */}

              <header className="zenova-document-header">


                <div className="zenova-document-institution">

                  {documentInfo.institution}

                </div>


                <div className="zenova-document-subject">

                  <strong>
                    {documentInfo.subject}
                  </strong>

                  <span>
                    CHAPTER {documentInfo.chapterNumber}
                  </span>

                </div>


                <div className="zenova-document-chapter">

                  {documentInfo.chapterName}

                </div>


              </header>



              {/* PAGE CONTENT */}

              <div
                className={
                  pageLayout === "two"
                    ? "zenova-document-body two-column-layout"
                    : "zenova-document-body"
                }
              >


                {/* FIRST COLUMN */}

                <section className="zenova-document-column">


                  {/* SUBTOPIC */}

                  <div className="zenova-subtopic-heading">

                    <span>
                      {documentInfo.chapterNumber}.1
                    </span>

                    <h1>
                      {documentInfo.subtopic}
                    </h1>

                  </div>


                  {/* EDITABLE TEXT */}

                  <div
                    className="zenova-note-editor"
                    contentEditable
                    suppressContentEditableWarning
                    spellCheck="true"
                  >

                    Start writing your notes here...

                  </div>


                </section>



                {/* SECOND COLUMN */}

                {pageLayout === "two" && (

                  <section
                    className="
                      zenova-document-column
                      zenova-second-column
                    "
                  >

                    <div
                      className="zenova-note-editor"
                      contentEditable
                      suppressContentEditableWarning
                      spellCheck="true"
                    >

                      Continue your notes here...

                    </div>

                  </section>

                )}


              </div>



              {/* FOOTER */}

              <footer className="zenova-document-footer">

                <span>
                  {documentInfo.institution}
                </span>

                <span>
                  CONCEPT → UNDERSTAND → APPLY → MASTER
                </span>

                <span>
                  PAGE 01
                </span>

              </footer>


            </article>


          </div>


        </section>



        {/* =================================================
            RIGHT DOCUMENT PANEL
        ================================================= */}

        <aside className="zenova-right-panel">


          <div className="zenova-panel-heading">

            DOCUMENT

          </div>


          {/* INSTITUTION */}

          <label className="zenova-property">

            <span>
              Institution
            </span>

            <input
              type="text"
              value={documentInfo.institution}
              onChange={(event) =>
                updateDocumentInfo(
                  "institution",
                  event.target.value
                )
              }
            />

          </label>


          {/* SUBJECT */}

          <label className="zenova-property">

            <span>
              Subject
            </span>

            <input
              type="text"
              value={documentInfo.subject}
              onChange={(event) =>
                updateDocumentInfo(
                  "subject",
                  event.target.value
                )
              }
            />

          </label>


          {/* CHAPTER NUMBER */}

          <label className="zenova-property">

            <span>
              Chapter Number
            </span>

            <input
              type="text"
              value={documentInfo.chapterNumber}
              onChange={(event) =>
                updateDocumentInfo(
                  "chapterNumber",
                  event.target.value
                )
              }
            />

          </label>


          {/* CHAPTER NAME */}

          <label className="zenova-property">

            <span>
              Chapter Name
            </span>

            <input
              type="text"
              value={documentInfo.chapterName}
              onChange={(event) =>
                updateDocumentInfo(
                  "chapterName",
                  event.target.value
                )
              }
            />

          </label>


          {/* SUBTOPIC */}

          <label className="zenova-property">

            <span>
              Subtopic
            </span>

            <input
              type="text"
              value={documentInfo.subtopic}
              onChange={(event) =>
                updateDocumentInfo(
                  "subtopic",
                  event.target.value
                )
              }
            />

          </label>


          <div className="zenova-property-divider" />


          <div className="zenova-panel-heading">

            PAGE

          </div>


          <div className="zenova-page-setting">

            <span>
              Paper
            </span>

            <strong>
              A4
            </strong>

          </div>


          <div className="zenova-page-setting">

            <span>
              Orientation
            </span>

            <strong>
              Portrait
            </strong>

          </div>


          <div className="zenova-page-setting">

            <span>
              Layout
            </span>

            <strong>
              {pageLayout === "two"
                ? "Two Columns"
                : "Single Column"}
            </strong>

          </div>


        </aside>


      </div>


    </div>

  );

}


export default ZenovaStudio;
