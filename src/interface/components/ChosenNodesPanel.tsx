import React from 'react';
import LinksActions from './LinksActions';
import NodePanel from './NodePanel';
import {useAppSelector} from '../redux/hooks';

/**
 * Chosen nodes panel
 * @return {JSX.Element}
 * @constructor
 */
function ChosenNodesPanel() {
  const selectedNodes = useAppSelector((state) => state.nodes.selectedItems);

  return (
    <div className="menu-container bg-[#efefef]">
      <div className="w-full bg-gray-200 p-1">
        <h1>Выбранные ноды:</h1>
      </div>
      <div className="centered flex-row w-full gap-1 min-h-max">
        {
            selectedNodes[0] ? (
              <>
                <NodePanel node={selectedNodes[0]}/>
                <LinksActions/>
                <NodePanel node={selectedNodes[1]}/>
              </>
            ) : (
              <span>Не выбрана ни одна точка</span>
            )
        }
      </div>
    </div>
  );
}

export default ChosenNodesPanel;
