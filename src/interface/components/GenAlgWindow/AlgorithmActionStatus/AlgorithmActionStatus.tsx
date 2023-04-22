import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {motion} from 'framer-motion';
import AlgorithmActionsController from '../AlgorithmActionsController/AlgorithmActionsController.lazy';
import {formatDiff} from '../../../../geneticAlgorithm/functions/datehelper';

/**
 * A component that displays a list of actions performed by the algorithm
 * @constructor
 */
function AlgorithmActionStatus() {
    const actions = useAppSelector((state) => state.actions.items);

    return (
        <div className="bordered rounded-md p-1 shadow-xl bg-white
        h-full overflow-x-hidden overflow-y-scroll">
            <b>Журнал</b>
            <p className="font-light text-gray-500 text-sm">
                Здесь будут отображаться текущие действия и их
                прогресс
            </p>
            <AlgorithmActionsController/>
            <ul className="flex flex-col gap-1 w-[40vw]">
                {
                    actions.map((el) => (
                        <motion.li
                            key={el.id}
                            className="flex flex-col justify-center items-start
                            px-2 py-0.5 rounded-md bordered"
                            initial={{
                                opacity: 0,
                                rotateX: '90deg',
                            }}
                            animate={{
                                opacity: 1,
                                rotateX: '0deg',
                            }}
                            transition={{
                                rotateX: {
                                    duration: 0.3,
                                },
                                opacity: {
                                    duration: 0.4,
                                },
                            }}
                        >
                            <div className="flex justify-between items-center w-full">
                                <span>{el.title}</span>
                                <span className="text-sm text-gray-400 font-bold">
                  {
                      formatDiff(
                          el.time.hours,
                          el.time.minutes,
                          el.time.seconds,
                          el.time.ms,
                      )
                  }
                </span>
                            </div>
                            <div>
                                {
                                    el.description && (
                                        <span className="font-light">{el.description}</span>
                                    )
                                }
                            </div>
                        </motion.li>
                    ))
                }
            </ul>
        </div>
    );
}

export default AlgorithmActionStatus;
