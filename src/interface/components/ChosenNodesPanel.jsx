import React from 'react';
import LinksActions from './LinksActions';
import {useSelector} from 'react-redux';
import NodePanel from './NodePanel';

/**
 * Chosen nodes panel
 * @return {JSX.Element}
 * @constructor
 */
function ChosenNodesPanel() {
  const selectedNodes = useSelector((state) => state.graph.selectedNodes);

  return (
    selectedNodes[0] ? (
      <div className="flex flex-col gap-2 border-y-[1px]
            border-y-gray-400">
        <span>Выбранные ноды:</span>
        <div className="centered flex-col gap-1">
          <NodePanel node={selectedNodes[0]} />
          <LinksActions/>
          <NodePanel node={selectedNodes[1]} />
        </div>
      </div>
    ) : (
      <span>Не выбрана ни одна точка</span>
    )
  );
}

export default ChosenNodesPanel;
