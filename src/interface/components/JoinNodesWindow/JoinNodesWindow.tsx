import React from 'react';
import {useAppSelector} from '../../redux/hooks';
import {motion} from 'framer-motion';
import LinkActions from '../LinkActions/LinkActions.lazy';


/**
 * A component displaying a small modal window containing
 * information and available actions on the selected nodes
 * of the graph
 * @constructor
 */
function JoinNodesWindow() {
  const selectedNodes = useAppSelector((state) => state.nodes.selectedItems);

  return (
    <motion.div
      className="absolute bottom-2 right-2 bg-white rounded-md
      block w-96 z-40"
      data-testid="JoinNodesWindow"
      initial={{y: '150%'}}
      animate={{y: selectedNodes.length > 1 ? 0 : '150%'}}
    >
      <div className="flex flex-col py-1">
        <div className="border-b-gray-300 border-b-[1px] px-2">
          <h1 className="text-gray-800">Взаимодействие с выбранными узлами</h1>
        </div>
        <LinkActions/>
      </div>
    </motion.div>
  );
}

export default JoinNodesWindow;
