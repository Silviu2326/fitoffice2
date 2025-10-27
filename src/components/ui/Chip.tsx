import React from 'react';
import { X } from 'lucide-react';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

/**
 * Componente Chip según el sistema de diseño FitOffice
 * - Padding: 8px 16px
 * - Radio: 20px (pill shape)
 * - Estados: default y selected
 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ selected = false, onRemove, className = '', children, ...props }, ref) => {
    const classes = `chip-base ${selected ? 'chip-selected' : ''} ${className}`;

    return (
      <div ref={ref} className={classes} {...props}>
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 hover:opacity-70 transition-opacity"
            aria-label="Eliminar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

