import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {motion} from 'framer-motion';
import AlgorithmActionsController from '../AlgorithmActionsController/AlgorithmActionsController.lazy';
import {formatDiff} from '../../../../geneticAlgorithm/functions/datehelper';
import AlgorithmActionIcon from "./AlgorithmActionIcon/AlgorithmActionIcon.lazy";
import {ActionType} from "../../../redux/extensions/enum/ActionType";

/**
 * A component that displays a list of actions performed by the algorithm
 * @constructor
 */
function AlgorithmActionStatus() {
    const actions = useAppSelector((state) => state.actions.items);

    const getBgColorByType = (actionType: ActionType) => {
        switch (actionType) {
            case ActionType.ERROR: {
                return "bg-red-600/80 text-white"
            }
            case ActionType.WARNING: {
                return "bg-orange-500/90 text-white"
            }
        }
    }

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
                            className={
                                "flex flex-col justify-center items-start " +
                                "px-2 py-0.5 rounded-md bordered " + getBgColorByType(el.type)
                            }
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
                                <AlgorithmActionIcon type={el.type}/>
                                <span>{el.title}</span>
                                <span className="text-sm font-bold">
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
