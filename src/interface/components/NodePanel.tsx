import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {setLinks, setNodes} from '../redux/slicers/graphSlice';
import {ReduxNodeObject} from '../redux/extensions/ReduxNodeObject';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

interface NodePanelProps {
  node: ReduxNodeObject,
  isActionsShown?: boolean
}

/**
 * A component that displays information about a specific node from an
 * existing graph
 * @param {boolean} isActionsShown a parameter that determines whether
 * to show components to interact with a specific node or not
 * @param {ReduxNodeObject} node the need for which information needs
 * to be displayed
 * @return {JSX.Element}
 * @constructor
 */
function NodePanel(
    {isActionsShown = false, node}: NodePanelProps,
): JSX.Element {
  const dispatch = useAppDispatch();
  const graph = useAppSelector((state) => state.graph);

  const handleNodeDeleting = () => {
    const {nodes, links} = graph;
    dispatch(setNodes(nodes.filter((el) => el.id !== node.id)));
    dispatch(setLinks(links.filter((el) => el.target !== node.id &&
      el.source !== node.id)),
    );
  };

  return (
    node ? (
      <div className="flex justify-start items-center gap-2">
        {
          isActionsShown && (
            <button
              type="button"
              title="Удалить точку"
              onClick={() => handleNodeDeleting()}
            >
              <AiOutlineClose/>
            </button>
          )
        }
        <span>{node.id}</span>
      </div>
    ) : (
      <span>ТОЧКА ОТСУТСТВУЕТ</span>
    )
  );
}

export default NodePanel;
