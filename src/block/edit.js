import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";

import CodeMirror, { EditorView } from "@uiw/react-codemirror";

import { __ } from "@wordpress/i18n";
import Settings from "./Components/Backend/Settings/Settings";
import Styles from "./Components/Common/Styles";
import { themeMap } from "./utils/functions";

import {
  BlockControls,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { GiCheckMark, IoCopyOutline } from "./utils/icons";

// Map selected language to its CodeMirror extension
const languageExtensionsMap = {
  javascript: javascript({ jsx: true }),
  html: html(),
  css: css(),
};

const Edit = ({ attributes, setAttributes, clientId }) => {
  const { HTML, options, mainEditor, headingStyles, uniqueId } = attributes;
  const {
    copyBtnType,
    language,
    theme,
    height,
    copyBtnText,
    textAfterCopied,
  } = mainEditor;
  const {
    showLineNumbers,
    foldGutter,
    tabSize,
    highlightActiveLine,
    autocompletion,
    wrapEnabled,
  } = options;

  const [mode, setMode] = useState("html");
  const [copied, setCopied] = useState(false);
  const [deltaPosition, setDeltaPosition] = useState({ x: 100, y: 50 });
  const editorViewRef = useRef(null);

  useEffect(() => {
    clientId && setAttributes({ uniqueId: `ch${clientId.substring(0, 8)}` });
  }, [clientId]); // Set & Update clientId to cId

  const handleCopyClick = () => {
    // If the editor view is available, copy from it
    if (editorViewRef.current) {
      const editorView = editorViewRef.current;
      navigator.clipboard
        .writeText(editorView.state.doc.toString()) // Copy editor content
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("Failed to copy:", err);
        });
    }
  };

  const extensions = [
    languageExtensionsMap[language],
    wrapEnabled ? EditorView.lineWrapping : [],
  ];

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  return (
    <>
      <Styles attributes={attributes} />
      <Settings
        attributes={attributes}
        setAttributes={setAttributes}
      />

      <div
        {...useBlockProps({ draggable: false })}
        id={`main-wrapper-${uniqueId}`}
      >
        {mode === "preview_html" && (
          <Draggable onDrag={handleDrag} position={deltaPosition}>
            <div
              className={mode}
              dangerouslySetInnerHTML={{ __html: HTML }}
            ></div>
          </Draggable>
        )}

        {(mode === "html" || mode === "preview_html") && (
          <>
            <div className="heading">
              <RichText
                tagName="p"
                placeholder="Write Headline"
                value={headingStyles.headlineText}
                onChange={(headlineText) =>
                  setAttributes({
                    headingStyles: { ...headingStyles, headlineText },
                  })
                }
              />

              {copyBtnType == "text" ? (
                <button
                  className={`copy-btn ${copied ? "copied" : ""}`}
                  onClick={handleCopyClick}
                  style={{ zIndex: 5999 }}
                >
                  {copied ? textAfterCopied : copyBtnText}
                </button>
              ) : (
                <div onClick={handleCopyClick} className="copy-btn-icon">
                  {copied ? (
                    <GiCheckMark />
                  ) : (
                    <IoCopyOutline title="Copy Code" />
                  )}
                </div>
              )}
            </div>

            <CodeMirror
              className="code-editor"
              value={HTML}
              height={height}
              extensions={extensions}
              theme={themeMap[theme]}
              onChange={(value) => {
                setAttributes({ HTML: value });
              }}
              basicSetup={{
                lineNumbers: showLineNumbers,
                foldGutter,
                highlightActiveLine,
                tabSize,
                autocompletion,
              }}
              onCreateEditor={(view) => {
                editorViewRef.current = view; // Store editor view
              }}
            />
          </>
        )}

        {mode === "preview" && (
          <div
            className={mode}
            dangerouslySetInnerHTML={{ __html: HTML }}
          ></div>
        )}
      </div>

      <BlockControls>
        <ToolbarGroup className="bPlToolbar">
          <ToolbarButton
            label={__("Preview", "advance-custom-html")}
            onClick={() => setMode("preview")}
            isPressed={mode === "preview"}
          >
            {__("Preview", "advance-custom-html")}
          </ToolbarButton>
          <ToolbarButton
            label={__("Preview", "advance-custom-html")}
            onClick={() => setMode("html")}
            isPressed={mode === "html"}
          >
            {__("HTML", "advance-custom-html")}
          </ToolbarButton>
          <ToolbarButton
            label={__("Preview", "advance-custom-html")}
            onClick={() => setMode("preview_html")}
            isPressed={mode === "preview_html"}
          >
            {__("HTML with Preview", "advance-custom-html")}
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
    </>
  );
};

export default Edit;
