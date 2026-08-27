/*
============================================================
ZENOVA NOTE STUDIO
DOCUMENT MODEL
VERSION 1
============================================================

This file defines what a Zenova document actually IS.

We are NOT storing the page as a screenshot.

We are NOT storing the page as one giant HTML string.

We store structured information.

That means:

    Institution
    Subject
    Chapter
    Subtopic
    Page layout
    Text blocks
    Note boxes
    Position
    Size
    Typography
    Styling

This structure will later be stored in Firebase Firestore.

============================================================
*/


/*
------------------------------------------------------------
DOCUMENT VERSION
------------------------------------------------------------

Keeping a version number allows us to change the document
structure in future versions without destroying old notes.
------------------------------------------------------------
*/

export const DOCUMENT_VERSION = 1;


/*
------------------------------------------------------------
CREATE UNIQUE ID
------------------------------------------------------------

Every block and page needs its own ID.
------------------------------------------------------------
*/

export function createId(prefix = "item") {

  const randomPart =
    Math.random()
      .toString(36)
      .substring(2, 10);


  const timePart =
    Date.now()
      .toString(36);


  return `${prefix}_${timePart}_${randomPart}`;

}


/*
------------------------------------------------------------
CREATE DOCUMENT
------------------------------------------------------------

Creates a completely new Zenova note document.
------------------------------------------------------------
*/

export function createDocument(
  information = {}
) {

  return {

    /*
    --------------------------------------------------------
    DOCUMENT ID
    --------------------------------------------------------
    */

    id: createId("document"),


    /*
    --------------------------------------------------------
    DOCUMENT VERSION
    --------------------------------------------------------
    */

    version: DOCUMENT_VERSION,


    /*
    --------------------------------------------------------
    DOCUMENT INFORMATION
    --------------------------------------------------------
    */

    metadata: {

      institution:
        information.institution ||
        "ZENOVA EDUCATIONS",

      subject:
        information.subject ||
        "",

      chapterNumber:
        information.chapterNumber ||
        "",

      chapterName:
        information.chapterName ||
        "",

      subtopic:
        information.subtopic ||
        "",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

    },


    /*
    --------------------------------------------------------
    PAGE SETTINGS
    --------------------------------------------------------
    */

    page: {

      size: "A4",

      orientation: "portrait",

      layout: "single",

      marginTop: 18,

      marginRight: 18,

      marginBottom: 18,

      marginLeft: 18,

      columnGap: 8,

      showColumnDivider: true

    },


    /*
    --------------------------------------------------------
    HEADER
    --------------------------------------------------------
    */

    header: {

      enabled: true,

      institution: true,

      subject: true,

      chapter: true

    },


    /*
    --------------------------------------------------------
    FOOTER
    --------------------------------------------------------
    */

    footer: {

      enabled: true,

      institution: true,

      slogan:
        "CONCEPT → UNDERSTAND → APPLY → MASTER",

      pageNumber: true

    },


    /*
    --------------------------------------------------------
    BLOCKS
    --------------------------------------------------------

    Every piece of content on the page will eventually be
    represented as a block.

    Example:

        text
        noteBox
        image
        table

    --------------------------------------------------------
    */

    blocks: []

  };

}


/*
------------------------------------------------------------
CREATE TEXT BLOCK
------------------------------------------------------------

A normal paragraph/note is a block.
------------------------------------------------------------
*/

export function createTextBlock(
  content = ""
) {

  return {

    id:
      createId("text"),

    type:
      "text",

    content,

    position: {

      column:
        "auto"

    },

    style: {

      fontFamily:
        "Inter",

      fontSize:
        13,

      fontWeight:
        400,

      fontStyle:
        "normal",

      textDecoration:
        "none",

      lineHeight:
        1.6,

      textAlign:
        "left",

      color:
        "#293750"

    }

  };

}


/*
------------------------------------------------------------
CREATE NOTE BOX
------------------------------------------------------------

This is the important part.

All special boxes use the same underlying structure.

For example:

    IMPORTANT
    FORMULA
    CONCEPT
    EXAMPLE
    QUESTION
    TO REMEMBER

They are not separate systems.

They are configurations of the same NoteBox.
------------------------------------------------------------
*/

export function createNoteBox(
  data = {}
) {

  const type =
    data.type ||
    "custom";


  return {

    id:
      createId("box"),


    /*
    --------------------------------------------------------
    BLOCK TYPE
    --------------------------------------------------------
    */

    type:
      "noteBox",


    /*
    --------------------------------------------------------
    BOX VARIANT
    --------------------------------------------------------
    */

    boxType:
      type,


    /*
    --------------------------------------------------------
    HEADING
    --------------------------------------------------------
    */

    heading:
      data.heading ||
      "NOTE",


    /*
    --------------------------------------------------------
    CONTENT
    --------------------------------------------------------
    */

    content:
      data.content ||
      "",


    /*
    --------------------------------------------------------
    POSITION
    --------------------------------------------------------

    The layout engine will later convert this into actual
    page coordinates.

    "auto" means the engine decides the initial location.
    --------------------------------------------------------
    */

    position: {

      column:
        data.column ||
        "auto",

      x:
        data.x ??
        null,

      y:
        data.y ??
        null

    },


    /*
    --------------------------------------------------------
    SIZE
    --------------------------------------------------------

    Width may be controlled by the editor.

    Height starts as "auto".

    This is important because the box should initially
    calculate its height from its content.
    --------------------------------------------------------
    */

    size: {

      width:
        data.width ??
        null,

      height:
        data.height ??
        "auto",

      widthMode:
        "fixed",

      heightMode:
        "auto"

    },


    /*
    --------------------------------------------------------
    APPEARANCE
    --------------------------------------------------------
    */

    style: {

      background:
        data.background ||
        "#FFFFFF",

      borderColor:
        data.borderColor ||
        "#D5DDE8",

      borderWidth:
        data.borderWidth ??
        1,

      borderStyle:
        data.borderStyle ||
        "solid",

      borderRadius:
        data.borderRadius ??
        8,

      paddingTop:
        data.paddingTop ??
        12,

      paddingRight:
        data.paddingRight ??
        14,

      paddingBottom:
        data.paddingBottom ??
        12,

      paddingLeft:
        data.paddingLeft ??
        14

    },


    /*
    --------------------------------------------------------
    HEADER STYLE
    --------------------------------------------------------
    */

    headerStyle: {

      enabled:
        true,

      background:
        data.headerBackground ||
        "#EEF2F7",

      color:
        data.headerColor ||
        "#17233D",

      fontFamily:
        data.headerFontFamily ||
        "Poppins",

      fontSize:
        data.headerFontSize ??
        10,

      fontWeight:
        data.headerFontWeight ||
        700,

      fontStyle:
        "normal",

      textAlign:
        "left"

    },


    /*
    --------------------------------------------------------
    CONTENT TYPOGRAPHY
    --------------------------------------------------------
    */

    typography: {

      fontFamily:
        data.fontFamily ||
        "Inter",

      fontSize:
        data.fontSize ??
        13,

      fontWeight:
        data.fontWeight ??
        400,

      fontStyle:
        data.fontStyle ||
        "normal",

      textDecoration:
        data.textDecoration ||
        "none",

      lineHeight:
        data.lineHeight ??
        1.55,

      textAlign:
        data.textAlign ||
        "left",

      color:
        data.textColor ||
        "#293750"

    }

  };

}


/*
------------------------------------------------------------
ADD BLOCK TO DOCUMENT
------------------------------------------------------------
*/

export function addBlock(
  document,
  block
) {

  return {

    ...document,

    blocks: [

      ...document.blocks,

      block

    ],

    metadata: {

      ...document.metadata,

      updatedAt:
        new Date().toISOString()

    }

  };

}


/*
------------------------------------------------------------
UPDATE BLOCK
------------------------------------------------------------
*/

export function updateBlock(
  document,
  blockId,
  changes
) {

  return {

    ...document,

    blocks:
      document.blocks.map(
        (block) => {

          if (
            block.id !== blockId
          ) {

            return block;

          }


          return {

            ...block,

            ...changes

          };

        }
      ),

    metadata: {

      ...document.metadata,

      updatedAt:
        new Date().toISOString()

    }

  };

}


/*
------------------------------------------------------------
REMOVE BLOCK
------------------------------------------------------------
*/

export function removeBlock(
  document,
  blockId
) {

  return {

    ...document,

    blocks:
      document.blocks.filter(
        (block) =>
          block.id !== blockId
      ),

    metadata: {

      ...document.metadata,

      updatedAt:
        new Date().toISOString()

    }

  };

}


/*
------------------------------------------------------------
UPDATE DOCUMENT METADATA
------------------------------------------------------------
*/

export function updateDocumentMetadata(
  document,
  changes
) {

  return {

    ...document,

    metadata: {

      ...document.metadata,

      ...changes,

      updatedAt:
        new Date().toISOString()

    }

  };

}


/*
------------------------------------------------------------
CHANGE PAGE LAYOUT
------------------------------------------------------------
*/

export function updatePageLayout(
  document,
  layout
) {

  return {

    ...document,

    page: {

      ...document.page,

      layout

    },

    metadata: {

      ...document.metadata,

      updatedAt:
        new Date().toISOString()

    }

  };

}
