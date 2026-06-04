import React from "react";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { themeMap } from "../../utils/functions";
import Styles from "../Common/Styles";
import { GiCheckMark, IoCopyOutline } from "../../utils/icons";

const CustomHtml = ({ attributes }) => {
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

  const [copied, setCopied] = React.useState(false);
  const editorViewRef = React.useRef(null);

  // Map selected language to its CodeMirror extension
  const languageExtensionsMap = {
    javascript: javascript({ jsx: true }),
    html: html(),
    css: css(),
  };

  const extensions = [
    languageExtensionsMap[language],
    wrapEnabled ? EditorView.lineWrapping : [],
  ];

  const handleCopyClick = () => {
    if (editorViewRef.current) {
      const editorView = editorViewRef.current;
      navigator.clipboard
        .writeText(editorView.state.doc.toString())
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
        .catch(() => {
          // console.error("Failed to copy:", err);
        });
    }
  };

  return (
    <>
      <Styles attributes={attributes} />

      <div id={`main-wrapper-${uniqueId}`}>
        <div className="heading">
          <p>{headingStyles.headlineText}</p>

          {copyBtnType === "text" ? (
            <button
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopyClick}
              style={{ zIndex: 5999 }}
            >
              {copied ? textAfterCopied : copyBtnText}
            </button>
          ) : (
            <div onClick={handleCopyClick} className="copy-btn-icon">
              {copied ? <GiCheckMark /> : <IoCopyOutline title="Copy Code" />}
            </div>
          )}
        </div>

        <CodeMirror
          className="code-editor"
          value={HTML}
          height={height}
          extensions={extensions}
          theme={themeMap[theme]}
          readOnly={true}
          basicSetup={{
            lineNumbers: showLineNumbers,
            foldGutter,
            highlightActiveLine,
            tabSize,
            autocompletion,
          }}
          onCreateEditor={(view) => {
            editorViewRef.current = view;
          }}
        />
      </div>
    </>
  );
};

export default CustomHtml;
