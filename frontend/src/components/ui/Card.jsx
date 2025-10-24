// src/components/ui/Card.jsx
import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 bg-white/20 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};
