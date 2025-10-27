import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
}

/**
 * Componente Badge según el sistema de diseño FitOffice
 * Variantes con colores semánticos según la guía de estilos
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const variantClasses = 
      variant === 'success' ? 'badge-success' :
      variant === 'warning' ? 'badge-warning' :
      variant === 'error' ? 'badge-error' :
      variant === 'info' ? 'badge-info' :
      'bg-surface-2 text-text-secondary';

    return (
      <span
        ref={ref}
        className={`badge-base ${variantClasses} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

