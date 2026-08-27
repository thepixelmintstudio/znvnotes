import React from "react";


/*
============================================================
ZENOVA NOTE STUDIO
UNIVERSAL NOTE BOX
VERSION 1
============================================================

This is the visual representation of a Zenova NoteBox.

The same component handles:

    IMPORTANT
    FORMULA
    CONCEPT
    EXAMPLE
    EXAM TIP
    QUESTION
    TO REMEMBER
    CUSTOM

The appearance comes from the block data.

The block itself does not know anything about Firebase.

The flow is:

    Document Store
          ↓
       NoteBox
          ↓
      Browser Page

Later:

    Document Store
          ↓
      Firebase Service
          ↓
       Firestore


============================================================
*/


/*
------------------------------------------------------------
DEFAULT BOX CONFIGURATION
------------------------------------------------------------
*/

const BOX_CONFIG = {

  important: {

    background: "#FFF1F6",

    borderColor: "#ED8FAA",

    headerBackground: "#FFE2EC",

    headerColor: "#C92557"

  },


  formula: {

    background: "#FFF8DE",

    borderColor: "#E6B84E",

    headerBackground: "#FFF0B8",

    headerColor: "#9A6700"

  },


  concept: {

    background: "#EEF6FF",

    borderColor: "#91BCEB",

    headerBackground: "#DDEEFF",

    headerColor: "#1265BD"

  },


  example: {

    background: "#EEF9F1",

    borderColor: "#91CEA0",

    headerBackground: "#DDF2E3",

    headerColor: "#25854A"

  },


  "exam-tip": {

    background: "#FFF4E3",

    borderColor: "#EDB65E",

    headerBackground: "#FFEAC5",

    headerColor: "#B96700"

  },


  question: {

    background: "#FFF0F1",

    borderColor: "#E99BA5",

    headerBackground: "#FFE0E3",

    headerColor: "#C32B3F"

  },


  remember: {

    background: "#F4EEFF",

    borderColor: "#BBA0E9",

    headerBackground: "#E9DDFF",

    headerColor: "#7043BB"

  },


  custom: {

    background: "#FFFFFF",

    borderColor: "#CBD4E0",

    headerBackground: "#F1F4F8",

    headerColor: "#34415A"

  }

};


/*
------------------------------------------------------------
GET BOX CONFIGURATION
------------------------------------------------------------
*/

function getBoxConfig(
  boxType
) {

  return (
    BOX_CONFIG[boxType] ||
    BOX_CONFIG.custom
  );

}


/*
============================================================
NOTE BOX COMPONENT
============================================================
*/

function NoteBox({

  block,

  isSelected = false,

  onSelect,

  onChange,

  onDelete

}) {


  /*
  ----------------------------------------------------------
  SAFETY
  ----------------------------------------------------------
  */

  if (!block) {

    return null;

  }


  /*
  ----------------------------------------------------------
  BOX CONFIGURATION
  ----------------------------------------------------------
  */

  const config =
    getBoxConfig(
      block.boxType
    );


  /*
  ----------------------------------------------------------
  TYPOGRAPHY
  ----------------------------------------------------------
  */

  const typography =
    block.typography || {};


  const headerStyle =
    block.headerStyle || {};


  const blockStyle =
    block.style || {};


  /*
  ----------------------------------------------------------
  VISUAL STYLE
  ----------------------------------------------------------

  The important point here is that width/height and
  typography are separate.

  Later the resize engine can modify:

      block.size.width
      block.size.height

  without destroying the content.
  ----------------------------------------------------------
  */

  const width =
    block.size?.width;


  const height =
    block.size?.height;


  const boxStyle = {

    background:
      blockStyle.background ||
      config.background,

    borderColor:
      blockStyle.borderColor ||
      config.borderColor,

    borderWidth:
      `${blockStyle.borderWidth ?? 1}px`,

    borderStyle:
      blockStyle.borderStyle ||
      "solid",

    borderRadius:
      `${blockStyle.borderRadius ?? 8}px`,

    paddingTop:
      `${blockStyle.paddingTop ?? 0}px`,

    paddingRight:
      `${blockStyle.paddingRight ?? 0}px`,

    paddingBottom:
      `${blockStyle.paddingBottom ?? 0}px`,

    paddingLeft:
      `${blockStyle.paddingLeft ?? 0}px`,

    width:
      width
        ? `${width}px`
        : "100%",

    height:
      height !== "auto" && height
        ? `${height}px`
        : "auto",

    position:
      "relative"

  };


  /*
  ----------------------------------------------------------
  HEADER STYLE
  ----------------------------------------------------------
  */

  const boxHeaderStyle = {

    background:
      headerStyle.background ||
      config.headerBackground,

    color:
      headerStyle.color ||
      config.headerColor,

    fontFamily:
      headerStyle.fontFamily ||
      "Poppins",

    fontSize:
      `${headerStyle.fontSize ?? 10}px`,

    fontWeight:
      headerStyle.fontWeight ||
      700,

    fontStyle:
      headerStyle.fontStyle ||
      "normal",

    textAlign:
      headerStyle.textAlign ||
      "left"

  };


  /*
  ----------------------------------------------------------
  CONTENT STYLE
  ----------------------------------------------------------
  */

  const boxContentStyle = {

    fontFamily:
      typography.fontFamily ||
      "Inter",

    fontSize:
      `${typography.fontSize ?? 13}px`,

    fontWeight:
      typography.fontWeight ??
      400,

    fontStyle:
      typography.fontStyle ||
      "normal",

    textDecoration:
      typography.textDecoration ||
      "none",

    lineHeight:
      typography.lineHeight ??
      1.55,

    textAlign:
      typography.textAlign ||
      "left",

    color:
      typography.color ||
      "#293750",

    overflowWrap:
      "anywhere",

    whiteSpace:
      "pre-wrap"

  };


  /*
  ----------------------------------------------------------
  SELECT BOX
  ----------------------------------------------------------
  */

  function handleSelect(
    event
  ) {

    event.stopPropagation();


    if (onSelect) {

      onSelect(
        block.id
      );

    }

  }


  /*
  ----------------------------------------------------------
  HEADING EDIT
  ----------------------------------------------------------

  This is intentionally a controlled editor.

  Later we can replace this with a richer inline
  typography editor without changing the NoteBox model.
  ----------------------------------------------------------
  */

  function handleHeadingChange(
    event
  ) {

    event.stopPropagation();


    if (!onChange) {

      return;

    }


    onChange(

      block.id,

      {

        heading:
          event.target.innerText

      }

    );

  }


  /*
  ----------------------------------------------------------
  CONTENT EDIT
  ----------------------------------------------------------
  */

  function handleContentChange(
    event
  ) {

    event.stopPropagation();


    if (!onChange) {

      return;

    }


    onChange(

      block.id,

      {

        content:
          event.target.innerText

      }

    );

  }


  /*
  ----------------------------------------------------------
  DELETE
  ----------------------------------------------------------
  */

  function handleDelete(
    event
  ) {

    event.stopPropagation();


    if (onDelete) {

      onDelete(
        block.id
      );

    }

  }


  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (

    <div

      className={
        isSelected
          ? "zenova-note-box selected"
          : "zenova-note-box"
      }

      style={boxStyle}

      onClick={handleSelect}

      data-block-id={block.id}

      data-block-type={block.boxType}

    >


      {/* ==================================================
          SELECTION CONTROLS
      ================================================== */}

      {isSelected && (

        <>

          <div className="zenova-box-selection-label">

            {block.boxType || "NOTE"}

          </div>


          <button

            type="button"

            className="zenova-box-delete"

            onClick={handleDelete}

            title="Delete box"

          >

            ×

          </button>


          {/*

            Resize handles will be connected to the
            resize engine in the next stage.

          */}

          <div className="zenova-resize-handle top-left" />

          <div className="zenova-resize-handle top-right" />

          <div className="zenova-resize-handle bottom-left" />

          <div className="zenova-resize-handle bottom-right" />

        </>

      )}



      {/* ==================================================
          BOX HEADER
      ================================================== */}

      {headerStyle.enabled !== false && (

        <div

          className="zenova-note-box-header"

          style={boxHeaderStyle}

        >

          <span

            contentEditable

            suppressContentEditableWarning

            spellCheck="false"

            onInput={
              handleHeadingChange
            }

            onClick={
              (event) =>
                event.stopPropagation()
            }

          >

            {block.heading || "NOTE"}

          </span>


        </div>

      )}



      {/* ==================================================
          BOX CONTENT
      ================================================== */}

      <div

        className="zenova-note-box-content"

        style={boxContentStyle}

        contentEditable

        suppressContentEditableWarning

        spellCheck="true"

        onInput={
          handleContentChange
        }

        onClick={
          (event) =>
            event.stopPropagation()
        }

      >

        {block.content}

      </div>


    </div>

  );

}


export default NoteBox;
