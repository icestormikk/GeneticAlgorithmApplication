import React from 'react';
import {motion} from 'framer-motion';
import {TbPoint} from 'react-icons/tb';
import {VscActivateBreakpoints} from 'react-icons/vsc';
import {useAppSelector} from '../../redux/hooks';
import NodeEntity from '../NodeEntity/NodeEntity.lazy';
import LinkEntity from '../LinkEntity/LinkEntity.lazy';

interface AllEntitiesInfoProps {
    isOpen: boolean,
}

/**
 * A component that displays detailed information about the state of the graph
 * @param {boolean} isShown a parameter that determines whether the window
 * @constructor
 */
function AllEntitiesInfo({isOpen}: AllEntitiesInfoProps) {
    const nodes = useAppSelector((state) => state.nodes.items);
    const links = useAppSelector((state) => state.links.items);
    const lists = React.useMemo(() => {
        return [
            {
                id: 0,
                title: 'Узлы',
                icon: <TbPoint/>,
                entities: nodes,
            },
            {
                id: 1,
                title: 'Связи',
                icon: <VscActivateBreakpoints/>,
                entities: links,
            },
        ];
    }, [nodes, links]);

    return (
        <div
            className="all-entities-list"
        >
            {
                lists.map((list, index) => (
                    <motion.div
                        key={list.id}
                        className="bg-white rounded-md w-80 overflow-hidden h-fit"
                        initial={{
                            x: '150%',
                        }}
                        animate={{
                            x: isOpen ? '0' : '150%',
                        }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                        }}
                    >
                        <div
                            className="flex flex-row gap-2 justify-start items-center
              border-b-[1px] border-b-gray-300 px-2 py-1"
                        >
                            {list.icon}
                            {list.title}
                        </div>
                        <div className="overflow-x-hidden overflow-y-scroll h-full
            entities-list">
                            {
                                list.id === 0 && (
                                    list.entities.map((el) => (
                                        <NodeEntity key={el.id} id={el.id}/>
                                    ))
                                )
                            }
                            {
                                list.id === 1 && (
                                    list.entities.map((el) => (
                                        <LinkEntity key={el.id} id={el.id}/>
                                    ))
                                )
                            }
                        </div>
                    </motion.div>
                ))
            }
        </div>
    );
}

export default AllEntitiesInfo;
