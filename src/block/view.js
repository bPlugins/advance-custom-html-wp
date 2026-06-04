import { createRoot } from "react-dom/client";
import CustomHtml from "./Components/Frontend/CustomHtml";

document.addEventListener("DOMContentLoaded", () => {
  const customHtmlEls = document.querySelectorAll(
    ".wp-block-bplugins-custom-html"
  );
  customHtmlEls.forEach((customHtmlEl) => {
    if (!customHtmlEl.dataset.attributes) return;

    const attributes = JSON.parse(customHtmlEl.dataset.attributes);

    createRoot(customHtmlEl).render(
      <>
        <CustomHtml attributes={attributes} />
      </>
    );

    customHtmlEl?.removeAttribute("data-attributes");
  });
});
