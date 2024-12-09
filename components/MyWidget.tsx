"use client"

import React, { useEffect, useRef } from 'react';

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
  const widgetRef = useRef(null);

  useEffect(() => {
    // Ensure the script is loaded once the component is rendered
    const scriptId = "nexx-widget-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://nexx-widget.vercel.app/widget.umd.js";
      script.id = scriptId;
      script.async = true;
      script.onload = () => {
        // Initialize the widget if it exists
        if (widgetRef.current) {
          (widgetRef.current as any).init();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return <my-widget ref={widgetRef} project-id="377"></my-widget>;
};

export default MyWidget;
