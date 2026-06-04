import {
  PanelBody,
  ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Notice } from "../../../../../../../bpl-tools/Components";

const PanelIcon = (
  <svg viewBox="0 0 24 24">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DisplayBehavior = ({ attributes, setAttributes }) => {
  const { options } = attributes;
  const {
    displayHeading,
    displayCopyButton,
  } = options;

  return (
    <PanelBody
      className="bPlPanelBody"
      title={
        <div className="achb-panel-title">
          {PanelIcon}
          {__("Display & Behavior Settings", "advance-custom-html")}
        </div>
      }
      initialOpen={true}
    >
      <ToggleControl
        className="mt20"
        label={__("Show Title Bar", "advance-custom-html")}
        checked={displayHeading}
        onChange={(displayHeading) =>
          setAttributes({ options: { ...options, displayHeading } })
        }
      />

      <ToggleControl
        className="mt10"
        label={__("Enable Copy Code Button", "advance-custom-html")}
        checked={displayCopyButton}
        onChange={(displayCopyButton) =>
          setAttributes({ options: { ...options, displayCopyButton } })
        }
      />

      <Notice status="premium" isIcon={true}>
        {__("Show code to visitors, run code inside a safe sandbox (iframe), adjust copy button appearance, customize button text, and set custom button position—available exclusively in Premium.", "advance-custom-html")}
      </Notice>
    </PanelBody>
  );
};

export default DisplayBehavior;

