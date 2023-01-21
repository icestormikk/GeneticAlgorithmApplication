import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {setLinks, setNodes} from '../redux/slicers/graphSlice';
import {useDispatch, useSelector} from 'react-redux';

/**
 * Node panel
 * @param {object} node node
 * @return {JSX.Element}
 * @constructor
 */
function NodePanel({node}) {
  const dispatch = useDispatch();
  const graph = useSelector((state) => state.graph);

  const handleNodeDeleting = () => {
    const {nodes, links} = graph;
    dispatch(setNodes(nodes.filter((el) => el.id !== node)));
    dispatch(setLinks(links.filter((el) => el.target !== node &&
      el.source !== node)),
    );
  };

  return (
    node ? (
      <div className="centered gap-2">
        <button
          type="button"
          title="Удалить точку"
          onClick={() => handleNodeDeleting()}
        >
          <AiOutlineClose/>
        </button>
        <span>{node}</span>
      </div>
    ) : (
      <span>НЕ ВЫБРАНО</span>
    )
  );
}

export default NodePanel;
