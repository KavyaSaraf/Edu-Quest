"use client"

import React, { useEffect } from 'react';

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'my-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
          'project-id': string;
        }, HTMLElement>;
      }
    }
  }

const MyWidget: React.FC = () => {
  useEffect(() => {
    // Ensure the script is loaded once the component is rendered
    const scriptId = "nexx-widget-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://nexx-widget.vercel.app/widget.umd.js";
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <my-widget project-id="377"></my-widget>;
};

export default MyWidget;
