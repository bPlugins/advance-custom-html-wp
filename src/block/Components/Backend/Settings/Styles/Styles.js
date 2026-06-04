import {
  PanelBody,
  RangeControl,
  BorderControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React from "react";

import {
  ColorControl,
  Typography,
  Notice,
} from "../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../utils/functions";

const PanelIconEditor = (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
    <path d="M3 9h18" />
  </svg>
);

const PanelIconHeading = (
  <svg viewBox="0 0 24 24">
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

const PanelIconCopy = (
  <svg viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const PanelIconPreview = (
  <svg viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const Styles = ({ attributes, setAttributes }) => {
  const { options, headingStyles, btnStyle, mainEditor } = attributes;
  const {
    copyBtnType,
    borderRadius,
    border,
  } = mainEditor;
  const { titleColor, titleTypo, backgroundColor } = headingStyles;
  const {
    displayHeading,
    displayCopyButton,
    displayCodeToFrontend,
  } = options;

  const colors = [
    { name: "White", color: "#ffffff" },
    { name: "Black", color: "#00000" },
    { name: "Sky Blue", color: "#bbccfc" },
  ];

  return (
    <div>
      {/* Code Editor */}
      <PanelBody
        className="bPlPanelBody"
        title={
          <div className="achb-panel-title">
            {PanelIconEditor}
            {__("Editor Box Sizing & Border", "advance-custom-html")}
          </div>
        }
        initialOpen={false}
      >
        <BorderControl
          colors={colors}
          label={__("Box Border Style", "advance-custom-html")}
          onChange={(val) =>
            setAttributes({ mainEditor: updateData(mainEditor, val, "border") })
          }
          value={border}
        />

        <RangeControl
          className="mt20"
          label={__("Round Box Corners", "advance-custom-html")}
          value={borderRadius}
          onChange={(size) =>
            setAttributes({
              mainEditor: updateData(mainEditor, size, "borderRadius"),
            })
          }
          min={0}
          max={50}
        />

        <Notice status="premium" isIcon={true}>
          {__("Set custom editor box width and height—available exclusively in Premium.", "advance-custom-html")}
        </Notice>
      </PanelBody>

      {/* Heading Style */}
      {displayHeading && (
        <PanelBody
          className="bPlPanelBody"
          title={
            <div className="achb-panel-title">
              {PanelIconHeading}
              {__("Header Title Style", "advance-custom-html")}
            </div>
          }
          initialOpen={false}
        >
          {/* Title Typography */}
          <Typography
            label={__("Text Font & Size", "advance-custom-html")}
            value={titleTypo}
            onChange={(titleTypo) =>
              setAttributes({ headingStyles: { ...headingStyles, titleTypo } })
            }
          />

          {/* Heading Title Color */}
          <ColorControl
            className="mt10"
            label={__("Text Color", "advance-custom-html")}
            value={titleColor}
            onChange={(titleColor) =>
              setAttributes({ headingStyles: { ...headingStyles, titleColor } })
            }
          />

          {/* Background Color */}
          <ColorControl
            label={__("Header Background Color", "advance-custom-html")}
            value={backgroundColor}
            onChange={(backgroundColor) =>
              setAttributes({
                headingStyles: { ...headingStyles, backgroundColor },
              })
            }
          />
        </PanelBody>
      )}

      {/* Copy Button Style */}
      {displayCopyButton && (
        <>
          {copyBtnType == "text" && (
            <PanelBody
              className="bPlPanelBody"
              title={
                <div className="achb-panel-title">
                  {PanelIconCopy}
                  {__("Copy Button Style", "advance-custom-html")}
                </div>
              }
              initialOpen={false}
            >
              {/* Font Size */}
              <Typography
                label={__("Button Font & Size", "advance-custom-html")}
                value={btnStyle.typo}
                onChange={(typo) =>
                  setAttributes({ btnStyle: { ...btnStyle, typo } })
                }
              />

              {/* Text Color */}
              <ColorControl
                className="mt10"
                label={__("Button Text Color", "advance-custom-html")}
                value={btnStyle.textColor}
                onChange={(textColor) =>
                  setAttributes({ btnStyle: { ...btnStyle, textColor } })
                }
              />

              {/* Background Color */}
              <ColorControl
                label={__("Button Background Color", "advance-custom-html")}
                value={btnStyle.backgroundColor}
                onChange={(backgroundColor) =>
                  setAttributes({ btnStyle: { ...btnStyle, backgroundColor } })
                }
              />
            </PanelBody>
          )}
        </>
      )}

      {/* Copy Button Style For Icon */}
      {displayCopyButton && (
        <>
          {copyBtnType === "icon" && (
            <PanelBody
              className="bPlPanelBody"
              title={
                <div className="achb-panel-title">
                  {PanelIconCopy}
                  {__("Copy Button Style", "advance-custom-html")}
                </div>
              }
              initialOpen={false}
            >
              {/* Icon Color */}
              <ColorControl
                label={__("Icon Color", "advance-custom-html")}
                value={btnStyle.copyBtnIconColor}
                onChange={(color) =>
                  setAttributes({
                    btnStyle: updateData(btnStyle, color, "copyBtnIconColor"),
                  })
                }
              />

              {/* Icon Size */}
              <RangeControl
                label={__("Icon Size", "advance-custom-html")}
                value={btnStyle.copyBtnIconSize}
                onChange={(size) =>
                  setAttributes({
                    btnStyle: updateData(btnStyle, size, "copyBtnIconSize"),
                  })
                }
              />
            </PanelBody>
          )}
        </>
      )}

      {/* Preview Height Width */}
      {!displayCodeToFrontend && (
        <PanelBody
          className="bPlPanelBody"
          title={
            <div className="achb-panel-title">
              {PanelIconPreview}
              {__("Sandbox Preview Size", "advance-custom-html")}
            </div>
          }
          initialOpen={false}
        >
          <Notice status="premium" isIcon={true}>
            {__("Customize sandbox preview width and height—available exclusively in Premium.", "advance-custom-html")}
          </Notice>
        </PanelBody>
      )}
    </div>
  );
};

export default Styles;
