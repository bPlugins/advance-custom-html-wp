import DisplayBehavior from "./DisplayBehavior";
import EditorSettings from "./EditorSettings";

const General = ({ attributes, setAttributes }) => {
  return (
    <>
      <DisplayBehavior
        attributes={attributes}
        setAttributes={setAttributes}
      />
      <EditorSettings
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </>
  );
};

export default General;
