import React from 'react';
import ModalWindow from '../ModalWindow/ModalWindow.lazy';

interface DeletingModalWindowProps {
    content: JSX.Element,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onDelete: () => void
}

/**
 * A component that displays a custom modal window with a suggestion
 * to delete a specific entity
 * @param {JSX.Element} content displayed content of the modal window
 * @param {boolean} isOpen a property that determines whether a modal
 * window is open or not
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * a function that changes the value of the {@link isOpen} property
 * @param {Function} onDelete a function that is executed if the user
 * confirms the deletion of the entity
 * @constructor
 */
function DeletingModalWindow(
    {
        content,
        isOpen,
        setIsOpen,
        onDelete,
    }: DeletingModalWindowProps,
) {
    return (
        <ModalWindow
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={(
                <h1>Удаление объекта</h1>
            )}
            content={(
                <>
                    {content}
                    <p>ДАННОЕ ДЕЙСТВИЕ НЕОБРАТИМО</p>
                    <button
                        type="button"
                        className="delete-button"
                        onClick={onDelete}
                    >
                        Удалить
                    </button>
                </>
            )}
        />
    );
}

export default DeletingModalWindow;
