import React from 'react';

const Card = ({ children, header, footer, className = "" }) => (
  <div className={`bg-white dark:bg-gray-900 rounded shadow p-4 dark:bg-gray-900 dark:border-blue-600 ${className} transition-colors duration-300`}>
    {header && (
      <div className="mb-4">
        <span className="text-gray-900 dark:text-gray-100">{header}</span>
      </div>
    )}
    <div>{children}</div>
    {footer && <div className="mt-4">{footer}</div>}
  </div>
);

export default Card;