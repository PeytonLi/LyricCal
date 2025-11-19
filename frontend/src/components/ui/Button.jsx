// src/components/ui/Button.jsx
import React from "react";

export const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
  
  const variantStyles = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  };
  
  const sizeStyles = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-lg",
  };
  
  const styles = `${baseStyles} ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.default} ${className}`;
  
  return (
    <button
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
};
