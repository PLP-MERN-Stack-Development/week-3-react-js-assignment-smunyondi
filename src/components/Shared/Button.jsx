import React from 'react';

const base = "px-4 py-2 rounded-full font-semibold transition focus:outline-none flex items-center gap-2";
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button = ({ children, variant = "primary", icon: Icon, loading, disabled, ...props }) => (
  <button
    className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={disabled || loading}
    {...props}
  >
    {loading && <span className="animate-spin mr-2">⏳</span>}
    {Icon && <Icon className="w-5 h-5" />}  {/* Use w-5 h-5 for a good size */}
    {children}
  </button>
);

export default Button;