/*
============================================================
ZENOVA NOTE STUDIO
DOCUMENT STORE
VERSION 1
============================================================

The document store keeps the currently edited Zenova
document in application memory.

It is responsible for:

    • Creating a document
    • Reading the document
    • Updating document information
    • Changing page layout
    • Adding blocks
    • Updating blocks
    • Removing blocks
    • Selecting a block
    • Tracking whether the document has unsaved changes

IMPORTANT:

This file does NOT directly talk to Firebase.

Firebase will later have its own service layer.

The flow will be:

    Editor
       ↓
    Document Store
       ↓
    Firebase Service
       ↓
    Firestore

============================================================
*/


import {
  createDocument,
  createTextBlock,
  createNoteBox,
  addBlock,
  updateBlock,
  removeBlock,
  updateDocumentMetadata,
  updatePageLayout
} from "./documentModel.js";


/*
============================================================
CREATE INITIAL DOCUMENT
============================================================
*/

export function createInitialDocument() {

  return createDocument({

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

}


/*
============================================================
CREATE STORE

This is a small custom document store for V1.

We are deliberately keeping it simple.

Later, if the software becomes very large, we can replace
the internal state mechanism without changing the document
model itself.
============================================================
*/

export function createDocumentStore(
  initialDocument = null
) {


  /*
  ----------------------------------------------------------
  CURRENT DOCUMENT
  ----------------------------------------------------------
  */

  let document =
    initialDocument ||
    createInitialDocument();


  /*
  ----------------------------------------------------------
  CURRENT SELECTION
  ----------------------------------------------------------

  null means nothing is selected.

  Otherwise this contains the ID of the selected block.
  ----------------------------------------------------------
  */

  let selectedBlockId =
    null;


  /*
  ----------------------------------------------------------
  UNSAVED STATE
  ----------------------------------------------------------
  */

  let isDirty =
    false;


  /*
  ----------------------------------------------------------
  SUBSCRIBERS
  ----------------------------------------------------------

  React components can subscribe to changes.

  Whenever the document changes, all subscribers are
  notified.
  ----------------------------------------------------------
  */

  const subscribers =
    new Set();


  /*
  ----------------------------------------------------------
  NOTIFY
  ----------------------------------------------------------
  */

  function notify() {

    subscribers.forEach(
      (listener) => {

        listener({
          document,
          selectedBlockId,
          isDirty
        });

      }
    );

  }


  /*
  ----------------------------------------------------------
  SUBSCRIBE
  ----------------------------------------------------------
  */

  function subscribe(
    listener
  ) {

    subscribers.add(
      listener
    );


    /*
    Immediately provide the
    current state.
    */

    listener({

      document,

      selectedBlockId,

      isDirty

    });


    /*
    Return unsubscribe function.
    */

    return function unsubscribe() {

      subscribers.delete(
        listener
      );

    };

  }


  /*
  ----------------------------------------------------------
  GET CURRENT STATE
  ----------------------------------------------------------
  */

  function getState() {

    return {

      document,

      selectedBlockId,

      isDirty

    };

  }


  /*
  ----------------------------------------------------------
  REPLACE DOCUMENT
  ----------------------------------------------------------

  Useful when opening a saved document from Firebase.
  ----------------------------------------------------------
  */

  function setDocument(
    newDocument
  ) {

    document =
      newDocument;

    selectedBlockId =
      null;

    isDirty =
      false;

    notify();

  }


  /*
  ----------------------------------------------------------
  UPDATE DOCUMENT INFORMATION
  ----------------------------------------------------------
  */

  function updateMetadata(
    changes
  ) {

    document =
      updateDocumentMetadata(
        document,
        changes
      );


    isDirty =
      true;


    notify();

  }


  /*
  ----------------------------------------------------------
  CHANGE PAGE LAYOUT
  ----------------------------------------------------------
  */

  function setPageLayout(
    layout
  ) {

    /*
      Only these two layouts are allowed in V1.
    */

    if (
      layout !== "single" &&
      layout !== "two"
    ) {

      return;

    }


    document =
      updatePageLayout(
        document,
        layout
      );


    isDirty =
      true;


    notify();

  }


  /*
  ----------------------------------------------------------
  ADD TEXT BLOCK
  ----------------------------------------------------------
  */

  function addText(
    content = ""
  ) {

    const block =
      createTextBlock(
        content
      );


    document =
      addBlock(
        document,
        block
      );


    /*
      Automatically select the newly created block.
    */

    selectedBlockId =
      block.id;


    isDirty =
      true;


    notify();


    return block;

  }


  /*
  ----------------------------------------------------------
  ADD NOTE BOX
  ----------------------------------------------------------

  The BoxModal will eventually send its data here.

  Example:

      addNoteBox({
        type: "important",
        heading: "IMPORTANT",
        content: "Velocity is a vector quantity.",
        fontFamily: "Inter",
        fontSize: 13
      });
  ----------------------------------------------------------
  */

  function addNoteBox(
    data = {}
  ) {

    const block =
      createNoteBox(
        data
      );


    document =
      addBlock(
        document,
        block
      );


    selectedBlockId =
      block.id;


    isDirty =
      true;


    notify();


    return block;

  }


  /*
  ----------------------------------------------------------
  UPDATE BLOCK
  ----------------------------------------------------------
  */

  function changeBlock(
    blockId,
    changes
  ) {

    document =
      updateBlock(
        document,
        blockId,
        changes
      );


    isDirty =
      true;


    notify();

  }


  /*
  ----------------------------------------------------------
  UPDATE BLOCK STYLE
  ----------------------------------------------------------

  This helper is useful because styles are nested.

  Example:

      updateBlockStyle(
        blockId,
        {
          background: "#FFF1F6",
          borderRadius: 12
        }
      );
  ----------------------------------------------------------
  */

  function updateBlockStyle(
    blockId,
    styleChanges
  ) {

    const block =
      document.blocks.find(
        (item) =>
          item.id === blockId
      );


    if (!block) {

      return;

    }


    changeBlock(

      blockId,

      {

        style: {

          ...(block.style || {}),

          ...styleChanges

        }

      }

    );

  }


  /*
  ----------------------------------------------------------
  UPDATE BLOCK TYPOGRAPHY
  ----------------------------------------------------------
  */

  function updateBlockTypography(
    blockId,
    typographyChanges
  ) {

    const block =
      document.blocks.find(
        (item) =>
          item.id === blockId
      );


    if (!block) {

      return;

    }


    changeBlock(

      blockId,

      {

        typography: {

          ...(block.typography || {}),

          ...typographyChanges

        }

      }

    );

  }


  /*
  ----------------------------------------------------------
  UPDATE NOTE BOX HEADER STYLE
  ----------------------------------------------------------
  */

  function updateBlockHeaderStyle(
    blockId,
    headerChanges
  ) {

    const block =
      document.blocks.find(
        (item) =>
          item.id === blockId
      );


    if (!block) {

      return;

    }


    changeBlock(

      blockId,

      {

        headerStyle: {

          ...(block.headerStyle || {}),

          ...headerChanges

        }

      }

    );

  }


  /*
  ----------------------------------------------------------
  UPDATE BLOCK SIZE
  ----------------------------------------------------------

  Width and height are deliberately kept separate from
  typography.

  This allows us to implement:

      Auto height
      Fixed height
      Manual resizing

  later in the layout engine.
  ----------------------------------------------------------
  */

  function updateBlockSize(
    blockId,
    sizeChanges
  ) {

    const block =
      document.blocks.find(
        (item) =>
          item.id === blockId
      );


    if (!block) {

      return;

    }


    changeBlock(

      blockId,

      {

        size: {

          ...(block.size || {}),

          ...sizeChanges

        }

      }

    );

  }


  /*
  ----------------------------------------------------------
  UPDATE BLOCK POSITION
  ----------------------------------------------------------
  */

  function updateBlockPosition(
    blockId,
    positionChanges
  ) {

    const block =
      document.blocks.find(
        (item) =>
          item.id === blockId
      );


    if (!block) {

      return;

    }


    changeBlock(

      blockId,

      {

        position: {

          ...(block.position || {}),

          ...positionChanges

        }

      }

    );

  }


  /*
  ----------------------------------------------------------
  REMOVE BLOCK
  ----------------------------------------------------------
  */

  function deleteBlock(
    blockId
  ) {

    document =
      removeBlock(
        document,
        blockId
      );


    /*
      If the deleted block was selected,
      clear selection.
    */

    if (
      selectedBlockId === blockId
    ) {

      selectedBlockId =
        null;

    }


    isDirty =
      true;


    notify();

  }


  /*
  ----------------------------------------------------------
  SELECT BLOCK
  ----------------------------------------------------------
  */

  function selectBlock(
    blockId
  ) {

    selectedBlockId =
      blockId;


    notify();

  }


  /*
  ----------------------------------------------------------
  CLEAR SELECTION
  ----------------------------------------------------------
  */

  function clearSelection() {

    selectedBlockId =
      null;


    notify();

  }


  /*
  ----------------------------------------------------------
  MARK SAVED
  ----------------------------------------------------------

  Firebase will call this after successfully saving.
  ----------------------------------------------------------
  */

  function markSaved() {

    isDirty =
      false;


    notify();

  }


  /*
  ----------------------------------------------------------
  RESET DOCUMENT
  ----------------------------------------------------------
  */

  function reset() {

    document =
      createInitialDocument();

    selectedBlockId =
      null;

    isDirty =
      false;

    notify();

  }


  /*
  ----------------------------------------------------------
  PUBLIC STORE API
  ----------------------------------------------------------
  */

  return {

    subscribe,

    getState,

    setDocument,

    updateMetadata,

    setPageLayout,

    addText,

    addNoteBox,

    changeBlock,

    updateBlockStyle,

    updateBlockTypography,

    updateBlockHeaderStyle,

    updateBlockSize,

    updateBlockPosition,

    deleteBlock,

    selectBlock,

    clearSelection,

    markSaved,

    reset

  };

}


/*
============================================================
DEFAULT STORE

The application can import this store and use it as the
current document state.

Firebase will eventually load a saved document and replace
the document using:

    store.setDocument(savedDocument)
============================================================
*/

export const documentStore =
  createDocumentStore();
