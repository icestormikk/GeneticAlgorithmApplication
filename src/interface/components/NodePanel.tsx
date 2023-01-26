import React from 'react';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineClose,
  AiOutlineEdit,
} from 'react-icons/ai';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import ObjectInfo from './ObjectInfo';
import {removeNode, updateNode} from '../redux/slicers/nodeSlice';
import {removeLink} from '../redux/slicers/linkSlice';
import {ReduxNodeObject} from '../redux/extensions/ReduxNodeObject';
import ChangeEntity from './ChangeEntity';

interface NodePanelProps {
  node: ReduxNodeObject,
  isActionsShown?: boolean,
}

/**
 * A component that displays information about a specific node from an
 * existing graph
 * @param {ReduxNodeObject} node the need for which information needs
 * to be displayed
 * @param {boolean} isActionsShown whether to display detailed information
 * for a point
 * @return {JSX.Element}
 * @constructor
 */
function NodePanel(
    {node, isActionsShown = false}: NodePanelProps,
): JSX.Element {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const links = useAppSelector((state) => state.links.items);

  const handleNodeDeleting = () => {
    dispatch(removeNode(node.id));
    links.filter((el) => el.target === node.id || el.source === node.id)
        .forEach((el) => {
          dispatch(removeLink(el.id));
        });
  };

  const handleEntityEditing = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      label: { value: string }
    };
    dispatch(updateNode({id: node.id, label: target.label.value}));
    setIsEditing(false);
  };

  return (
    node ? (
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-row justify-between items-center w-full">
          <span>{node.label}</span>
          {
            isActionsShown && (
              <button
                type="button"
                onClick={() => setIsCollapsed((prevState) => !prevState)}
                className="show-more-node-button"
              >
                {isCollapsed ? <AiFillCaretDown/> : <AiFillCaretUp/>}
              </button>
            )
          }
        </div>
        {
          !isCollapsed && (
            <div className="flex flex-col p-1 h-min w-full gap-0.5 border-[1px]
            rounded-md">
              {
                !isEditing ? (
                  <>
                    <h1>Информация:</h1>
                    <ObjectInfo obj={node}/>
                    <div className="flex justify-start items-center gap-2">
                      <button
                        type="button"
                        title="Удалить точку"
                        onClick={() => handleNodeDeleting()}
                        className="delete-entity-button"
                      >
                        <AiOutlineClose/>
                        <span>Удалить точку</span>
                      </button>
                      <button
                        type="button"
                        title="Редактировать точку"
                        onClick={() => setIsEditing(true)}
                        className="edit-entity-button"
                      >
                        <AiOutlineEdit/>
                        <span>Редактировать</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <ChangeEntity
                    fields={[
                      <label htmlFor="label">
                        Название:
                        <input type="text" name="label" id="label"
                          defaultValue={node.label} required/>
                      </label>,
                    ]}
                    onSubmit={handleEntityEditing}
                    onClose={() => setIsEditing(false)}
                  />
                )
              }
            </div>
          )
        }
      </div>
    ) : (
      <span>ТОЧКА ОТСУТСТВУЕТ</span>
    )
  );
}

export default NodePanel;
