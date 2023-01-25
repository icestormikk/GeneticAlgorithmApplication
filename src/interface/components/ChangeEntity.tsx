import React from 'react';

interface ChangeEntityProps {
  fields: Array<JSX.Element>
  onSubmit: (event: React.SyntheticEvent) => void
  onClose?: () => void
}

/**
 * Component for displaying a form for updating data about an object
 * @param {Array<JSX.Element>} fields input fields that will be in the form
 * @param {Function} onSubmit the function that will be called when you
 * click on the "apply" button
 * @param {Function} onClose the button that will be called when canceling
 * changes
 * @constructor
 */
function ChangeEntity({fields, onSubmit, onClose} : ChangeEntityProps) {
  return (
    <form
      onSubmit={(event) => onSubmit(event)}
      className="flex flex-col gap-2"
    >
      {fields.map((el, index) => (
        <div key={index}>{el}</div>
      ))}
      <div className="p-1 flex flex-row gap-2">
        <button
          type="submit"
          className="edit-entity-button"
        >
          Применить
        </button>
        {
          onClose && (
            <button
              type="button"
              className="delete-entity-button"
              onClick={onClose}
            >
              Отменить
            </button>
          )
        }
      </div>
    </form>
  );
}

export default ChangeEntity;
