import React, { ReactNode } from 'react';
import { Button } from '@/components/atoms/Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby="modal-description"
    >
      <div
        className="bg-bg-light dark:bg-card-bg rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border-color">
            <h2
              id="modal-title"
              className="text-xl font-bold text-text-dark dark:text-text-light"
            >
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Fechar modal"
            >
              ✕
            </Button>
          </div>
        )}
        <div id="modal-description" className="p-6">
          {children}
        </div>
        {footer && (
          <div className="p-6 border-t border-border-color">{footer}</div>
        )}
      </div>
    </div>
  );
};
