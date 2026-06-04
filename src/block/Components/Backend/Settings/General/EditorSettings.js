import {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Notice } from "../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../utils/functions";
import { languageOptions, themeOptions } from "../../../../utils/options";

const PanelIcon = (
  <svg viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const EditorSettings = ({ attributes, setAttributes }) => {
  const { fontSize, options, mainEditor } = attributes;
  const { language, theme } = mainEditor;
  const {
    showLineNumbers,
    wrapEnabled,
  } = options;
  
  return (
    <PanelBody
      className="bPlPanelBody"
      title={
        <div className="achb-panel-title">
          {PanelIcon}
          {__("Editor Preferences", "advance-custom-html")}
        </div>
      }
      initialOpen={false}
    >
      <RangeControl
        className="mt20"
        label={__("Editor Font Size", "advance-custom-html")}
        value={fontSize}
        onChange={(fontSize) => setAttributes({ fontSize })}
        min={10}
        max={40}
        allowReset={true}
        resetFallbackValue={15}
        initialPosition={15}
      />

      <SelectControl
        className="mt20"
        label={__("Editor Color Theme", "advance-custom-html")}
        value={theme}
        options={themeOptions}
        onChange={(val) => {
          setAttributes({
            mainEditor: updateData(mainEditor, val, "theme"),
          });
        }}
      />

      <SelectControl
        className="mt20"
        label={__("Choose Coding Language", "advance-custom-html")}
        value={language}
        options={languageOptions}
        onChange={(val) => {
          setAttributes({
            mainEditor: updateData(mainEditor, val, "language"),
          });
        }}
      />

      <ToggleControl
        className="mt20"
        label={__("Display Line Numbers", "advance-custom-html")}
        checked={showLineNumbers}
        onChange={(showLineNumbers) =>
          setAttributes({ options: { ...options, showLineNumbers } })
        }
      />

      <ToggleControl
        className="mt10"
        label={__("Enable Word Wrap", "advance-custom-html")}
        checked={wrapEnabled}
        onChange={(wrapEnabled) =>
          setAttributes({ options: { ...options, wrapEnabled } })
        }
      />

      <Notice status="premium" isIcon={true}>
        {__("Customize tab indent size, highlight line under cursor, allow code folding, enable code suggestions, and unlock all premium themes/languages—available exclusively in Premium.", "advance-custom-html")}
      </Notice>
    </PanelBody>
  );
};

export default EditorSettings;
