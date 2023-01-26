import React from 'react';
import ReactModal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai';

interface CustomModalProps {
  content: JSX.Element
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Customizable model application window
 * @param {JSX.Element} content components that will be located in
 * the emerging modal window
 * @param {boolean} isOpen a property that determines whether the window
 * is closed or not
 * @param {Function} setIsOpen a function that changes the properties of
 * {@link isOpen}
 * @constructor
 */
function CustomModal({content, isOpen, setIsOpen}: CustomModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="flex flex-row justify-end items-center bg-white px-1
      py-0.5">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose className="text-xl"/>
        </button>
      </div>
      <div className="p-2 flex flex-col w-full h-full">
        {content}
      </div>
    </ReactModal>
  );
}

export default CustomModal;
