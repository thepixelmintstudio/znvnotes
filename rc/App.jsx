import React, { useState } from "react";


/*
============================================================
ZENOVA NOTE STUDIO
Main Application

V1 CURRENT SCOPE

This first version intentionally focuses on:

1. Institution header
2. Subject
3. Chapter number
4. Chapter name
5. Subtopic
6. A4 page
7. Single / two-column page layout
8. Normal note text
9. Add special note boxes through a popup
10. Firebase-ready architecture

We will NOT build AI, collaboration, question banks,
analytics, publishing workflow, etc. yet.
============================================================
*/


function App() {

  /*
  ----------------------------------------------------------
  DOCUMENT INFORMATION
  ----------------------------------------------------------
  */

  const [documentInfo, setDocumentInfo] = useState({
    institution: "ZENOVA EDUCATIONS",
    subject: "PHYSICS",
    chapterNumber: "02",
    chapterName: "MOTION IN A STRAIGHT LINE",
    subtopic: "VELOCITY"
  });


  /*
  ----------------------------------------------------------
  PAGE LAYOUT
  ----------------------------------------------------------

  false = single column
  true  = two columns
  */

  const [twoColumns, setTwoColumns] = useState(false);


  /*
  ----------------------------------------------------------
  BOX MODAL
  ----------------------------------------------------------
  */

  const [showBoxModal, setShowBoxModal] = useState(false);


  /*
  ----------------------------------------------------------
  BOX TYPE
  ----------------------------------------------------------

  The teacher will eventually be able to choose:

  Important
  Formula
  Concept
  Example
  Question
  To Remember
  Exam Tip
  Custom

  For now we prepare the structure.
  */

  const [boxType, setBoxType] = useState("important");


  /*
  ----------------------------------------------------------
  BOX HEADING
  ----------------------------------------------------------
  */

  const [boxHeading, setBoxHeading] = useState("IMPORTANT");


  /*
  ----------------------------------------------------------
  BOX CONTENT
  ----------------------------------------------------------
  */

  const [boxContent, setBoxContent] = useState("");


  /*
  ----------------------------------------------------------
  DOCUMENT INPUT HANDLER
  ----------------------------------------------------------
  */

  function updateDocumentInfo(field, value) {

    setDocumentInfo((previous) => ({
      ...previous,
      [field]: value
    }));

  }


  /*
  ----------------------------------------------------------
  CREATE BOX
  ----------------------------------------------------------
  */

  function createBox() {

    /*
      Actual box creation will be implemented in the
      editor engine.

      For now we simply close the modal.

      In the next stage this will create a real object
      containing:

      - type
      - heading
      - content
      - position
      - width
      - height
      - colours
      - fonts
      - typography
    */

    console.log({
      type: boxType,
      heading: boxHeading,
      content: boxContent
    });

    setShowBoxModal(false);

    setBoxContent("");

  }


  return (

    <div className="zenova-app">


      {/* ==================================================
          TOP APPLICATION BAR
      ================================================== */}

      <header className="zenova-topbar">


        {/* BRAND */}

        <div className="zenova-brand">

          <div className="zenova-logo">
            ZEN<span>O</span>VA
          </div>

          <div className="zenova-logo-subtitle">
            NOTE STUDIO
          </div>

        </div>


        {/* DOCUMENT NAME */}

        <div className="zenova-document-title">

          <strong>
            {documentInfo.institution}
          </strong>

          <span>
            {documentInfo.subject} · Chapter {documentInfo.chapterNumber}
          </span>

        </div>


        {/* TOP ACTIONS */}

        <div className="zenova-top-actions">

          <button type="button">
            Undo
          </button>

          <button type="button">
            Redo
          </button>

          <button type="button">
            Save
          </button>

          <button
            type="button"
            className="zenova-export-button"
          >
            Export PDF
          </button>

        </div>


      </header>



      {/* ==================================================
          MAIN WORKSPACE
      ================================================== */}

      <main className="zenova-workspace">


        {/* ==================================================
            LEFT TOOL PANEL
        ================================================== */}

        <aside className="zenova-left-panel">


          <div className="zenova-panel-title">
            NOTE CONTENT
          </div>


          {/* NORMAL TEXT */}

          <button
            type="button"
            className="zenova-tool-button"
          >

            <span className="tool-icon">
              T
            </span>

            <span>
              Text
            </span>

          </button>


          {/* SPECIAL BOX */}

          <div className="zenova-section-title">
            SPECIAL BOXES
          </div>


          <button
            type="button"
            className="zenova-tool-button pink"
            onClick={() => {

              setBoxType("important");
              setBoxHeading("IMPORTANT");
              setShowBoxModal(true);

            }}
          >

            <span className="tool-icon">
              ★
            </span>

            <span>
              Important
            </span>

          </button>


          <button
            type="button"
            className="zenova-tool-button yellow"
            onClick={() => {

              setBoxType("formula");
              setBoxHeading("FORMULA");
              setShowBoxModal(true);

            }}
          >

            <span className="tool-icon">
              ∑
            </span>

            <span>
              Formula
            </span>

          </button>


          <button
            type="button"
            className="zenova-tool-button blue"
            onClick={() => {

              setBoxType("concept");
              setBoxHeading("CONCEPT");
              setShowBoxModal(true);

            }}
          >

            <span className="tool-icon">
              ◆
            </span>

            <span>
              Concept
            </span>

          </button>


          <button
            type="button"
            className="zenova-tool-button green"
            onClick={() => {

              setBoxType("example");
              setBoxHeading("EXAMPLE");
              setShowBoxModal(true);

            }}
          >

            <span className="tool-icon">
              ✓
            </span>

            <span>
              Example
            </span>

          </button>


          <button
            type="button"
            className="zenova-tool-button orange"
            onClick={() => {

              setBoxType("exam-tip");
              setBoxHeading("EXAM TIP");
              setShowBoxModal(true);

            }}
          >

            <span className="tool-icon">
              ◎
            </span>

            <span>
              Exam Tip
            </span>

          </button>


          <button
            type="button"
            className="zenova-tool-button red"
            onClick={() => {

              setBoxType("question");
              setBoxHeading("QUESTION");
              setShowBoxModal(true);

            }}
          >

            <span className="tool-icon">
              ?
            </span>

            <span>
              Question
            </span>

          </button>


          <button
            type="button"
            className="zenova-tool-button purple"
            onClick={() => {

              setBoxType("remember");
              setBoxHeading("TO REMEMBER");
              setShowBoxModal(true);

            }}
          >

            <span className="tool-icon">
              ★
            </span>

            <span>
              To Remember
            </span>

          </button>


          <div className="zenova-section-title">
            MEDIA
          </div>


          <button
            type="button"
            className="zenova-tool-button"
          >

            <span className="tool-icon">
              ▧
            </span>

            <span>
              Image
            </span>

          </button>


          <button
            type="button"
            className="zenova-tool-button"
          >

            <span className="tool-icon">
              ▦
            </span>

            <span>
              Table
            </span>

          </button>


        </aside>



        {/* ==================================================
            CENTRE PAGE AREA
        ================================================== */}

        <section className="zenova-editor-area">


          {/* EDITOR TOOLBAR */}

          <div className="zenova-editor-toolbar">


            <div className="toolbar-group">

              <button type="button">
                −
              </button>

              <span>
                75%
              </span>

              <button type="button">
                +
              </button>

            </div>


            <div className="toolbar-layout">

              <span>
                PAGE LAYOUT
              </span>


              <button
                type="button"
                className={!twoColumns ? "active" : ""}
                onClick={() => setTwoColumns(false)}
              >
                Single Column
              </button>


              <button
                type="button"
                className={twoColumns ? "active" : ""}
                onClick={() => setTwoColumns(true)}
              >
                Two Columns
              </button>

            </div>


            <div className="toolbar-page-number">

              A4 · Page 01

            </div>


          </div>



          {/* PAGE WORKSPACE */}

          <div className="zenova-page-workspace">


            {/* A4 PAGE */}

            <article className="zenova-a4-page">


              {/* PAGE HEADER */}

              <div className="zenova-page-header">


                <div className="zenova-page-institution">

                  <strong>
                    {documentInfo.institution}
                  </strong>

                </div>


                <div className="zenova-page-subject">

                  <strong>
                    {documentInfo.subject}
                  </strong>

                  <span>
                    CHAPTER {documentInfo.chapterNumber}
                  </span>

                </div>


                <div className="zenova-page-chapter">

                  <strong>
                    {documentInfo.chapterName}
                  </strong>

                </div>


              </div>



              {/* PAGE BODY */}

              <div
                className={
                  twoColumns
                    ? "zenova-page-body two-columns"
                    : "zenova-page-body"
                }
              >


                {/* LEFT / MAIN COLUMN */}

                <div className="zenova-note-column">


                  <div className="zenova-subtopic">

                    <span>
                      {documentInfo.chapterNumber}.1
                    </span>

                    <h1>
                      {documentInfo.subtopic}
                    </h1>

                  </div>


                  <div
                    className="zenova-editable-text"
                    contentEditable
                    suppressContentEditableWarning
                  >

                    Start typing your notes here...

                  </div>


                </div>


                {/* SECOND COLUMN */}

                {twoColumns && (

                  <div className="zenova-note-column second-column">

                    <div
                      className="zenova-editable-text"
                      contentEditable
                      suppressContentEditableWarning
                    >

                      Add notes or special boxes here...

                    </div>

                  </div>

                )}


              </div>



              {/* PAGE FOOTER */}

              <footer className="zenova-page-footer">

                <span>
                  {documentInfo.institution}
                </span>

                <span>
                  CONCEPT → UNDERSTAND → APPLY → MASTER
                </span>

                <span>
                  Page 01
                </span>

              </footer>


            </article>


          </div>


        </section>



        {/* ==================================================
            RIGHT PROPERTIES PANEL
        ================================================== */}

        <aside className="zenova-right-panel">


          <div className="zenova-panel-title">
            PAGE INFORMATION
          </div>


          <label className="zenova-field">

            <span>
              Institution
            </span>

            <input
              value={documentInfo.institution}
              onChange={(event) =>
                updateDocumentInfo(
                  "institution",
                  event.target.value
                )
              }
            />

          </label>


          <label className="zenova-field">

            <span>
              Subject
            </span>

            <input
              value={documentInfo.subject}
              onChange={(event) =>
                updateDocumentInfo(
                  "subject",
                  event.target.value
                )
              }
            />

          </label>


          <label className="zenova-field">

            <span>
              Chapter Number
            </span>

            <input
              value={documentInfo.chapterNumber}
              onChange={(event) =>
                updateDocumentInfo(
                  "chapterNumber",
                  event.target.value
                )
              }
            />

          </label>


          <label className="zenova-field">

            <span>
              Chapter Name
            </span>

            <input
              value={documentInfo.chapterName}
              onChange={(event) =>
                updateDocumentInfo(
                  "chapterName",
                  event.target.value
                )
              }
            />

          </label>


          <label className="zenova-field">

            <span>
              Subtopic
            </span>

            <input
              value={documentInfo.subtopic}
              onChange={(event) =>
                updateDocumentInfo(
                  "subtopic",
                  event.target.value
                )
              }
            />

          </label>


          <div className="zenova-panel-divider" />


          <div className="zenova-panel-title">
            PAGE
          </div>


          <div className="zenova-page-option">

            <span>
              Layout
            </span>

            <strong>
              {twoColumns
                ? "Two Columns"
                : "Single Column"}
            </strong>

          </div>


          <div className="zenova-info-box">

            <strong>
              V1 Editor
            </strong>

            <p>
              Special boxes will be created through
              a popup and inserted automatically.
            </p>

          </div>


        </aside>


      </main>



      {/* ==================================================
          ADD BOX MODAL
      ================================================== */}

      {showBoxModal && (

        <div className="zenova-modal-overlay">


          <div className="zenova-box-modal">


            <div className="zenova-modal-header">

              <div>

                <span>
                  ADD ZENOVA BOX
                </span>

                <h2>
                  Create note box
                </h2>

              </div>


              <button
                type="button"
                onClick={() => setShowBoxModal(false)}
              >
                ×
              </button>

            </div>



            {/* BOX TYPE */}

            <label className="zenova-modal-field">

              <span>
                Box Type
              </span>

              <select
                value={boxType}
                onChange={(event) => {

                  const value = event.target.value;

                  setBoxType(value);

                  const headings = {
                    important: "IMPORTANT",
                    formula: "FORMULA",
                    concept: "CONCEPT",
                    example: "EXAMPLE",
                    "exam-tip": "EXAM TIP",
                    question: "QUESTION",
                    remember: "TO REMEMBER"
                  };

                  setBoxHeading(
                    headings[value] || "NOTE"
                  );

                }}
              >

                <option value="important">
                  Important
                </option>

                <option value="formula">
                  Formula
                </option>

                <option value="concept">
                  Concept
                </option>

                <option value="example">
                  Example
                </option>

                <option value="exam-tip">
                  Exam Tip
                </option>

                <option value="question">
                  Question
                </option>

                <option value="remember">
                  To Remember
                </option>

                <option value="custom">
                  Custom
                </option>

              </select>

            </label>



            {/* HEADING */}

            <label className="zenova-modal-field">

              <span>
                Box Heading
              </span>

              <input
                value={boxHeading}
                onChange={(event) =>
                  setBoxHeading(event.target.value)
                }
                placeholder="Example: IMPORTANT"
              />

            </label>



            {/* CONTENT */}

            <label className="zenova-modal-field">

              <span>
                Content
              </span>

              <textarea
                value={boxContent}
                onChange={(event) =>
                  setBoxContent(event.target.value)
                }
                placeholder="Type the information that should appear inside the box..."
                rows={7}
              />

            </label>



            {/* ACTIONS */}

            <div className="zenova-modal-actions">

              <button
                type="button"
                onClick={() => setShowBoxModal(false)}
              >
                Cancel
              </button>


              <button
                type="button"
                className="zenova-add-button"
                onClick={createBox}
              >
                Add to Page
              </button>

            </div>


          </div>

        </div>

      )}

    </div>

  );

}


export default App;
