import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  inputSize?: 'sm' | 'md' | 'lg';
}

/**
 * Componente Input según el sistema de diseño FitOffice
 * - Altura: 48px (lg) / 40px (md) / 32px (sm)
 * - Padding: 12px horizontal
 * - Borde: border 1px, radio 12px
 * - Focus: borde primary + ring
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, inputSize = 'md', className = '', ...props }, ref) => {
    const sizeClasses = inputSize === 'sm' ? 'input-sm' : inputSize === 'lg' ? 'input-lg' : 'input-md';
    const errorClasses = error ? 'input-error' : '';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-small font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input-base ${sizeClasses} ${errorClasses} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-body-small text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-body-small text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

