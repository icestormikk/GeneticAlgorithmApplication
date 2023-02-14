import React from 'react';
import {useAppDispatch} from '../../../redux/hooks';
import {clearActions} from '../../../redux/slicers/actionsSlice';

/**
 * A container containing components for managing a list of actions
 * @constructor
 */
function AlgorithmActionsController() {
  const dispatch = useAppDispatch();
  const handleActionClear = React.useCallback(
      () => {
        dispatch(clearActions());
      },
      [],
  );

  const actions = React.useMemo(
      () => {
        return [
          {
            id: 0,
            title: 'Удалить',
            icon: undefined,
            action: () => {
              handleActionClear();
            },
          },
        ];
      },
      [],
  );

  return (
    <div className="flex justify-start items-center flex-row my-2">
      {
        actions.map((el) => (
          <button
            key={el.id}
            type="button"
            onClick={() => {
              el.action();
            }}
            className="delete-button rounded-md shadow-xl"
          >
            {el.icon}
            {el.title}
          </button>
        ))
      }
    </div>
  );
}

export default AlgorithmActionsController;
