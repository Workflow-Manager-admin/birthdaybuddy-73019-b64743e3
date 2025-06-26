import React from "react";

export function ArrowLeftIcon({ className = "", ...props }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 8H17a1 1 0 110 2H4.414l2.879 2.879a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
