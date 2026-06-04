import {
  AlignmentToolbar,
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";
import { generalStyleTabs } from "../../../utils/options";
import General from "./General/General";
import Styles from "./Styles/Styles";

const Settings = ({ attributes, setAttributes }) => {
  const { alignment } = attributes;


  return (
    <>
      <InspectorControls>
        <TabPanel
          className="bPlTabPanel"
          activeClass="activeTab"
          tabs={generalStyleTabs}
        >
          {(tab) => (
            <>
              {"general" == tab.name && (
                <General
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              )}

              {"style" == tab.name && (
                <Styles
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      <BlockControls>
        <AlignmentToolbar
          value={alignment}
          onChange={(value) => setAttributes({ alignment: value })}
        />
      </BlockControls> 
    </>
  );
};
export default Settings;
