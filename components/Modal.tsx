import React, { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from './Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled }) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* The inset CSS property is a shorthand that corresponds to the top, right, bottom, and/or left properties */}
      <div className=" focus:outline-none bg-neutral-800 bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center overflow-hidden overflow-y-auto outline-none">
        <div className="lg:w-3/6 lg:max-w-3xl lg:h-auto relative w-full h-full mx-auto my-6">
          {/* CONTENT */}
          <div className="lg:h-auto focus:outline-none relative flex flex-col w-full h-full bg-black border-0 rounded-lg shadow-lg outline-none">
            {/* HEADER */}
            <div className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button onClick={handleClose} className="hover:opacity-70 p-1 ml-auto text-white transition border-0">
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* BODY */}
            <div className="relative flex-auto p-10">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-10">
              <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
