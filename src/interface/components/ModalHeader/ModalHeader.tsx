import React from 'react';
import {AiFillCloseSquare} from 'react-icons/ai';

interface ModalHeaderProps {
    content: JSX.Element
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * The component that displays the title of the modal window
 * @param {JSX.Element} content header content
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * the function that is executed when you click on the close button
 * of the modal window
 * @constructor
 */
function ModalHeader({content, setIsOpen}: ModalHeaderProps) {
    return (
        <div
            className="flex justify-between items-center border-b-[1px]
      border-b-gray-300 shadow-md px-2 py-1 font-bold"
            data-testid="ModalHeader"
        >
            {content}
            <button
                type="button"
                onClick={() => setIsOpen(false)}
            >
                <AiFillCloseSquare className="text-2xl text-red-600"/>
            </button>
        </div>
    );
}

export default ModalHeader;
