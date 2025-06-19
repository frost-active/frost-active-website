import React from "react";
import clsx from "clsx"; // Optional, see note below

export default function Separator({ orientation = "horizontal", className = "", ...props }) {
  const baseClasses = orientation === "horizontal" ? "h-px w-full" : "w-px h-full";
  return (
    <div
      role="separator"
      className={clsx("shrink-0 bg-gray-300", baseClasses, className)}
      {...props}
    />
  );
}

export { Separator };