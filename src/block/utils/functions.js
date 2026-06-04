import { produce } from "immer";
// Themes
import { basicLight, basicDark } from '@uiw/codemirror-theme-basic';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { oneDark } from "@codemirror/theme-one-dark";



export const updateData = (attr, value, ...props) => {
  if (props.length === 0) {
    return value;
  }
  const [currentProp, ...remainingProps] = props;
  if (remainingProps.length === 0) {
    return produce(attr, draft => {
      draft[currentProp] = value;
    });
  }
  return produce(attr, draft => {
    if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
      draft[currentProp] = {};
    }
    draft[currentProp] = updateData(draft[currentProp], value, ...remainingProps);
  });
};

export const themeMap = {
  basicLight,
  basicDark,
  eclipse,
  oneDark
};
