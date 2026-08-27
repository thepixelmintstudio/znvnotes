import React, {
  useEffect,
  useState
} from "react";

import {
  documentStore
} from "../document/documentStore.js";


/*
============================================================
ZENOVA NOTE STUDIO
EDITOR
VERSION 1
============================================================

The Editor is responsible for:

    • Connecting the document store to the UI
    • Displaying the current document
    • Displaying the A4 page
    • Displaying page layout
    • Managing block selection
    • Preparing the canvas for the block engine

The Editor itself does NOT define individual block designs.

Those will live inside:

    src/blocks/

============================================================
*/


function Editor() {


  /*
  ----------------------------------------------------------
  LOCAL EDITOR STATE
  ----------------------------------------------------------
  */

  const [
    editorState,
    setEditorState
  ] = useState(
    documentStore.getState()
  );


  /*
  ----------------------------------------------------------
  SUBSCRIBE TO DOCUMENT STORE
  ----------------------------------------------------------

  Whenever anything changes in the document store,
  the editor receives the new state.
  ----------------------------------------------------------
  */

  useEffect(() => {

    const unsubscribe =
      documentStore.subscribe(
        (newState) => {

          setEditorState(
            newState
          );

        }
      );


    return unsubscribe;

  }, []);


  /*
  ----------------------------------------------------------
  GET CURRENT DOCUMENT
  ----------------------------------------------------------
  */

  const {
    document,
    selectedBlockId
  } = editorState;


  /*
  ----------------------------------------------------------
  DOCUMENT DATA
  ----------------------------------------------------------
  */

  const {
    metadata,
    page,
    header,
    footer,
    blocks
  } = document;


  /*
  ----------------------------------------------------------
  PAGE LAYOUT
  ----------------------------------------------------------
  */

  const isTwoColumn =
    page.layout === "two";


  /*
  ----------------------------------------------------------
  HANDLE PAGE CLICK
  ----------------------------------------------------------

  Clicking an empty part of the page clears the current
  block selection.
  ----------------------------------------------------------
  */

  function handlePageClick(event) {

    /*
      Only clear selection if the page itself was clicked.

      Clicking a block will be handled by that block.
    */

    if (
      event.target ===
      event.currentTarget
    ) {

      documentStore.clearSelection();

    }

  }


  /*
  ----------------------------------------------------------
  HANDLE BLOCK CLICK
  ----------------------------------------------------------
  */

  function handleBlockClick(
    event,
    blockId
  ) {

    event.stopPropagation();

    documentStore.selectBlock(
      blockId
    );

  }


  /*
  ----------------------------------------------------------
  SPLIT BLOCKS BETWEEN COLUMNS
  ----------------------------------------------------------

  This is temporary V1 layout behaviour.

  Later the layout engine will calculate the actual position
  of every block based on its dimensions and content.
  ----------------------------------------------------------
  */

  const firstColumnBlocks =
    isTwoColumn
      ? blocks.filter(
          (_, index) =>
            index % 2 === 0
        )
      : blocks;


  const secondColumnBlocks =
    isTwoColumn
      ? blocks.filter(
          (_, index) =>
            index % 2 !== 0
        )
      : [];


  return (

    <section className="zenova-editor-area">


      {/* ==================================================
          EDITOR TOOLBAR
      ================================================== */}

      <div className="zenova-editor-toolbar">


        <div className="zenova-toolbar-left">

          <span>
            PAPER
          </span>

          <strong>
            {page.size}
          </strong>

          <span>
            {page.orientation}
          </span>

        </div>



        {/* ------------------------------------------------
            LAYOUT
        ------------------------------------------------ */}

        <div className="zenova-layout-controls">

          <span>
            LAYOUT
          </span>


          <button
            type="button"
            className={
              !isTwoColumn
                ? "active"
                : ""
            }
            onClick={() =>
              documentStore.setPageLayout(
                "single"
              )
            }
          >

            Single Column

          </button>


          <button
            type="button"
            className={
              isTwoColumn
                ? "active"
                : ""
            }
            onClick={() =>
              documentStore.setPageLayout(
                "two"
              )
            }
          >

            Two Columns

          </button>

        </div>



        {/* ------------------------------------------------
            PAGE
        ------------------------------------------------ */}

        <div className="zenova-page-indicator">

          PAGE 01

        </div>


      </div>



      {/* ==================================================
          A4 PAGE WORKSPACE
      ================================================== */}

      <div className="zenova-page-area">


        <article
          className="zenova-a4-page"
          onClick={handlePageClick}
        >


          {/* =================================================
              HEADER
          ================================================= */}

          {header.enabled && (

            <header className="zenova-document-header">


              {/* INSTITUTION */}

              {header.institution && (

                <div className="zenova-document-institution">

                  {metadata.institution}

                </div>

              )}


              {/* SUBJECT */}

              {header.subject && (

                <div className="zenova-document-subject">

                  <strong>
                    {metadata.subject}
                  </strong>

                  <span>
                    CHAPTER {metadata.chapterNumber}
                  </span>

                </div>

              )}


              {/* CHAPTER */}

              {header.chapter && (

                <div className="zenova-document-chapter">

                  {metadata.chapterName}

                </div>

              )}


            </header>

          )}



          {/* =================================================
              DOCUMENT BODY
          ================================================= */}

          <div
            className={
              isTwoColumn
                ? "zenova-document-body two-column-layout"
                : "zenova-document-body"
            }
          >


            {/* =================================================
                FIRST COLUMN
            ================================================= */}

            <section className="zenova-document-column">


              {/* SUBTOPIC */}

              <div className="zenova-subtopic-heading">


                <span>

                  {metadata.chapterNumber}.1

                </span>


                <h1>

                  {metadata.subtopic}

                </h1>


              </div>



              {/* BLOCKS */}

              <div className="zenova-block-list">


                {firstColumnBlocks.map(
                  (block) => (

                    <div
                      key={block.id}
                      className={
                        block.id === selectedBlockId
                          ? "zenova-block-wrapper selected"
                          : "zenova-block-wrapper"
                      }
                      onClick={(event) =>
                        handleBlockClick(
                          event,
                          block.id
                        )
                      }
                    >


                      {/*

                        Individual block renderer will
                        be inserted here.

                        For now we display a small
                        development representation.

                      */}

                      <div className="zenova-development-block">


                        <span className="zenova-development-type">

                          {block.type === "noteBox"
                            ? block.boxType
                            : block.type}

                        </span>


                        <div>

                          {block.type === "noteBox"
                            ? block.heading
                            : block.content}

                        </div>


                      </div>


                    </div>

                  )
                )}


              </div>



              {/* EMPTY DOCUMENT */}

              {firstColumnBlocks.length === 0 && (

                <div className="zenova-empty-document">

                  <div className="zenova-empty-icon">
                    T
                  </div>

                  <strong>
                    Start creating your notes
                  </strong>

                  <span>
                    Add text or insert a special note box.
                  </span>

                </div>

              )}


            </section>



            {/* =================================================
                SECOND COLUMN
            ================================================= */}

            {isTwoColumn && (

              <section
                className="
                  zenova-document-column
                  zenova-second-column
                "
              >


                <div className="zenova-block-list">


                  {secondColumnBlocks.map(
                    (block) => (

                      <div
                        key={block.id}
                        className={
                          block.id === selectedBlockId
                            ? "zenova-block-wrapper selected"
                            : "zenova-block-wrapper"
                        }
                        onClick={(event) =>
                          handleBlockClick(
                            event,
                            block.id
                          )
                        }
                      >


                        <div className="zenova-development-block">


                          <span className="zenova-development-type">

                            {block.type === "noteBox"
                              ? block.boxType
                              : block.type}

                          </span>


                          <div>

                            {block.type === "noteBox"
                              ? block.heading
                              : block.content}

                          </div>


                        </div>


                      </div>

                    )
                  )}


                </div>


              </section>

            )}


          </div>



          {/* =================================================
              FOOTER
          ================================================= */}

          {footer.enabled && (

            <footer className="zenova-document-footer">


              {footer.institution && (

                <span>

                  {metadata.institution}

                </span>

              )}


              {footer.slogan && (

                <span>

                  {footer.slogan}

                </span>

              )}


              {footer.pageNumber && (

                <span>

                  PAGE 01

                </span>

              )}


            </footer>

          )}


        </article>


      </div>


    </section>

  );

}


export default Editor;
