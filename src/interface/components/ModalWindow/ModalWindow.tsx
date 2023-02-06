import React from 'react';
import {motion} from 'framer-motion';
import ReactModal from 'react-modal';
import ModalHeader from '../ModalHeader/ModalHeader.lazy';

interface ModalWindowProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: JSX.Element,
  content: JSX.Element,
}

/**
 * A component containing a custom window without any templates
 * @param {boolean} isOpen a property that determines whether a modal
 * window is open or not
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * a function that changes the value of the {@link isOpen} property
 * @param {JSX.Element} title the title of the modal window displayed
 * at the top of it
 * @param {JSX.Element} content content of the modal window
 * @constructor
 */
function ModalWindow(
    {
      isOpen,
      setIsOpen,
      title,
      content,
    }: ModalWindowProps,
) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      className="bg-transparent"
      overlayClassName="bg-transparent"
    >
      <motion.div
        initial={{
          rotateX: 90,
        }}
        animate={{
          rotateX: isOpen ? 0 : 90,
        }}
        className="fixed top-0 left-0 w-screen h-screen
        bg-black/50 centered z-[100] text-white flex
        flex-col"
        data-testid="ModalWindow"
      >
        <div className="bg-[#efefef] rounded-md text-black sm:max-w-[50vw]
        lg:max-w-[60rem] max-w-[90vw]">
          <ModalHeader
            content={title}
            setIsOpen={setIsOpen}
          />
          <div className="p-2">
            {content}
          </div>
        </div>
      </motion.div>
    </ReactModal>
  );
}

export default ModalWindow;
