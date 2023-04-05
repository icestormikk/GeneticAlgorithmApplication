import React from 'react';
import {motion, Variants} from 'framer-motion';
import {ReduxNodeObject} from '../../../redux/extensions/ReduxNodeObject';
import {useAppSelector} from '../../../redux/hooks';
import {AiOutlineClose} from 'react-icons/ai';

const MAX_SELECTED_NODES_COUNT = 2;

interface ChooseNodesMenuProps {
    nodesCollector: Array<ReduxNodeObject>,
    setNodesCollector: React.Dispatch<React.SetStateAction<Array<ReduxNodeObject>>>
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
 * A component displaying a list of all available graph nodes
 * available for selection (does not affect the algorithm yet)
 * @param {Array<ReduxNodeObject>} nodesCollector list of selected nodes
 * @param {Array<ReduxNodeObject>} setNodesCollector function that modifies the
 * {@link nodesCollector} variable
 * @constructor
 */
function ChooseNodesMenu({nodesCollector, setNodesCollector}: ChooseNodesMenuProps) {
    const nodes = useAppSelector((state) => state.nodes.items);

    const selectNode = (node: ReduxNodeObject) => {
        if (nodesCollector.length >= MAX_SELECTED_NODES_COUNT) {
            return;
        }

        setNodesCollector((prevState) =>
            [...prevState, node]
        );
    };

    const unselectNode = (node: ReduxNodeObject) => {
        const index = nodesCollector.findIndex((el) =>
            el.id === node.id,
        );
        if (index > -1) {
            setNodesCollector((prevState) => {
                prevState.splice(index, 1)
                return prevState
            });
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
                    nodes.filter((el) =>
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
