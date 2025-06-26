import React from "react";

export function SparklesIcon({ className = "", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        d="M5 3.5l1.5 3.5L10 8.5 7.5 11l-1.5 3.5L5 11 2.5 8.5 5 7zm11 0l1.5 3.5L21 8.5 18.5 11l-1.5 3.5L16 11l-2.5-2.5L16 7zm-5.5 9l1.5 3.5L16 17.5 13.5 20l-1.5 3.5-1.5-3.5L8 17.5l2.5-2.5z"
      />
    </svg>
  );
}
