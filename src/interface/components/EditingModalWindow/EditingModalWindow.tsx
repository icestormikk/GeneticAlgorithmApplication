import React from 'react';
import ModalWindow from '../ModalWindow/ModalWindow.lazy';
interface EditingModalWindowProps {
  content: JSX.Element,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onEdit?: () => void,
}

/**
 * A component that displays a custom modal window with a suggestion
 * to delete a specific entity
 * @param {JSX.Element} content displayed content of the modal window
 * @param {Function} onEdit a function that is executed if the user
 * confirms the change in the properties of the entity
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * a function that changes the value of the {@link isOpen} property
 * @param {boolean} isOpen a property that determines whether a modal
 * window is open or not
 * @constructor
 */
function EditingModalWindow(
    {
      content,
      onEdit,
      setIsOpen,
      isOpen,
    }: EditingModalWindowProps,
) {
  return (
    <ModalWindow
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={(
        <h1>Изменение параметров объектов</h1>
      )}
      content={(
        <>
          {content}
          {
            onEdit && (
              <button
                type="button"
                className="edit-button"
                onClick={onEdit}
              >
                Применить
              </button>
            )
          }
        </>
      )}
    />
  );
}

export default EditingModalWindow;
