import React from 'react';
import {motion, Variants} from 'framer-motion';
import {ReduxNodeObject} from '../../redux/extensions/ReduxNodeObject';
import {useAppSelector} from '../../redux/hooks';
import {AiOutlineClose} from 'react-icons/ai';

interface ChooseNodesMenuProps {
  nodesCollector: Array<ReduxNodeObject>,
}

const itemVariants: Variants = {
  initial: ({
    opacity: 0,
    scale: 0.5,
  }),
  animate: ({
    opacity: 1,
    scale: 1.0,
  }),
};

/**
 * ChooseNodesMenu
 * @param {Array<ReduxNodeObject>} nodesCollector
 * @constructor
 */
function ChooseNodesMenu({nodesCollector}: ChooseNodesMenuProps) {
  const nodes = useAppSelector((state) => state.nodes.items);
  const [currNodes, setCurrNodes] = React.useState(nodes);

  const selectNode = (node: ReduxNodeObject) => {
    if (nodesCollector.length >= 2) {
      return;
    }

    nodesCollector.push(node);
    setCurrNodes((prevState) =>
      prevState.filter((el) =>
        nodesCollector.find((nd) =>
          nd.id === el.id) === undefined,
      ),
    );
  };

  const unselectNode = (node: ReduxNodeObject) => {
    const index = nodesCollector.findIndex((el) =>
      el.id === node.id,
    );
    if (index > -1) {
      nodesCollector.splice(index, 1);
      setCurrNodes((prevState) =>
        [...prevState, node],
      );
    }
  };

  return (
    <div>
      <b>Выберите узлы:</b>
      <div className="flex flex-row gap-1">
        {
          nodesCollector.map((el) => (
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              key={el.id}
              className="px-2 py-0.5 mb-3 bg-green-500 text-gray-100
              font-bold rounded-md shadow-xl text-sm centered gap-2"
            >
              <p>{el.label}</p>
              <button
                type="button"
                onClick={() => unselectNode(el)}
              >
                <AiOutlineClose/>
              </button>
            </motion.div>
          ))
        }
      </div>
      <ul className="flex flex-col gap-1">
        {
          currNodes
              .filter((el) =>
                nodesCollector.find((nd) =>
                  nd.id === el.id) === undefined,
              )
              .map((el, index) => (
                <motion.button
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    delay: index * 0.1,
                  }}
                  key={el.id}
                  className="alg-node-entity"
                  onClick={() => {
                    selectNode(el);
                  }}
                >
                  <p>{el.label}</p>
                  <span>Выбрать</span>
                </motion.button>
              ))
        }
      </ul>
    </div>
  );
}

export default ChooseNodesMenu;
