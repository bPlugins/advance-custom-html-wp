import React, { useRef, useState, useEffect } from "react";

const Preview = ({
  displayCodeToFrontend,
  HTML,
  setEmbededContentHeightWidht,
  embeddedContentHeight,
  embeddedContentWidth,
}) => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState("300px"); // default height

  // Auto resize iframe height when content loads or changes
  useEffect(() => {
    if (displayCodeToFrontend) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    function resizeIframe() {
      try {
        if (
          iframe.contentWindow &&
          iframe.contentWindow.document &&
          iframe.contentWindow.document.body
        ) {
          const docBody = iframe.contentWindow.document.body;
          const newHeight = docBody.scrollHeight + 20;
          setIframeHeight(newHeight + "px");
        }
      } catch (e) {
        // Cross-origin or other access issues might occur; ignore silently
      }
    }

    iframe.addEventListener("load", resizeIframe);
    resizeIframe();

    const intervalId = setInterval(resizeIframe, 500);

    return () => {
      iframe.removeEventListener("load", resizeIframe);
      clearInterval(intervalId);
    };
  }, [HTML, displayCodeToFrontend]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={HTML}
      style={{
        width: setEmbededContentHeightWidht ? embeddedContentWidth : "100%",
        height: setEmbededContentHeightWidht
          ? embeddedContentHeight
          : iframeHeight,
        border: "none",
        overflow: "hidden",
      }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default Preview;
