import React from 'react';
import { getTypoCSS, isValidCSS } from '../../../../../bpl-tools/utils/getCSS';

const Styles = ({ attributes }) => {
  const { options, headingStyles, btnStyle, mainEditor, fontSize, uniqueId, alignment } = attributes;
  const { copyBtnPosition, width, borderRadius, border } = mainEditor;
  const { displayHeading, displayCopyButton } = options;
  const { titleColor, titleTypo, backgroundColor } = headingStyles;

  const mainWrapper = `#main-wrapper-${uniqueId}`;
  const codeEditor = `${mainWrapper} .code-editor`;
  const heading = `${mainWrapper} .heading`;
  const copyBtn = `${heading} .copy-btn`;
  const copyBtnIcon = `${heading} .copy-btn-icon`;


  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ${getTypoCSS("", titleTypo)?.googleFontLink}
  	      ${getTypoCSS(`${heading} p`, titleTypo)?.styles}

		      ${getTypoCSS("", btnStyle.typo)?.googleFontLink}
  	      ${getTypoCSS(`${copyBtn}`, btnStyle.typo)?.styles}


          ${mainWrapper} {
            ${isValidCSS("width", width)}
            ${alignment === 'center' ? 'margin: 0 auto;' : ''}
            ${alignment === 'left' ? 'margin-left: 0; margin-right: auto;' : ''}
            ${alignment === 'right' ? 'margin-left: auto; margin-right: 0;' : ''}
            position: relative;
          }
			    ${codeEditor} .cm-editor {
            font-size: ${fontSize}px;
            border-radius: ${displayHeading ? `0 0 ${borderRadius}px ${borderRadius}px` : `${borderRadius}px`};
            border: ${border?.width} ${border?.style} ${border?.color};
            ${displayHeading && "border-top: none"}
          }
          ${codeEditor} .cm-editor.cm-focused {
            outline: none;
          }
          ${codeEditor} .cm-editor .cm-scroller {
            border-radius: ${displayHeading ? `0 0 ${borderRadius}px ${borderRadius}px` : `${borderRadius}px`};
          }
          ${codeEditor} .cm-editor .cm-scroller::-webkit-scrollbar {
            display: none;
          }
          ${codeEditor} .cm-editor .cm-scroller .cm-content {
            padding: 15px 0;
          }

          ${copyBtnIcon} {
            cursor: pointer;
            ${isValidCSS("color", btnStyle.copyBtnIconColor)}
            font-size: ${btnStyle.copyBtnIconSize}px;
            position: ${displayHeading ? "static" : "absolute"};
            ${copyBtnPosition === "topright" && !displayHeading ? "top: 20px; right: 20px" : "bottom: 20px; right: 20px"};
            z-index: 5000;
            display: ${displayCopyButton ? "flex" : "none"};
            margin-right: ${displayHeading ? "10px" : "0"};
          }
          ${copyBtn} {
            cursor: pointer;
            display: ${displayCopyButton ? "block" : "none"};
            position: ${displayHeading ? "static" : "absolute"};
            ${copyBtnPosition === "topright" && !displayHeading ? "top: 20px; right: 20px" : "bottom: 20px; right: 20px"};
            background-color: ${btnStyle.backgroundColor};
            color: ${btnStyle.textColor};
            margin-right: ${displayHeading ? "5px" : "0"};
            border: none;
          }
          ${heading}{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${displayHeading ? "5px 0 5px 20px" : "0"};
            background-color: ${backgroundColor};
            border-radius: ${borderRadius}px ${borderRadius}px 0 0;
            ${displayHeading && `
              border-top: ${border?.width} ${border?.style} ${border?.color};
              border-left: ${border?.width} ${border?.style} ${border?.color};
              border-right: ${border?.width} ${border?.style} ${border?.color};
            `}
          }
          ${heading} p {
            display: ${displayHeading ? "flex" : "none"};
            color: ${titleColor};
            margin: 0;
          }

      `.replace(/\s+/g, " "),
        }}
      />
    </>
  );
};
export default Styles;