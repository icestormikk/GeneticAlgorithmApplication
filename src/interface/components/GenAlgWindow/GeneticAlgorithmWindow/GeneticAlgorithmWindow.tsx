import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import ModalWindow from '../../ModalWindow/ModalWindow.lazy';
import AdditionalCondition from '../AdditionalCondition/AdditionalCondition.lazy';
import {BiLockAlt} from 'react-icons/bi';
import ChooseNodesMenu from '../ChooseNodesMenu/ChooseNodesMenu.lazy';
import {startAlgorithm} from '../../../../geneticAlgorithm';
import AlgorithmActionStatus from '../AlgorithmActionStatus/AlgorithmActionStatus.lazy';
import PathInfoPanel from "../PathInfoPanel/PathInfoPanel.lazy";
import Limiter from "../Limiter/Limiter.lazy";
import StatisticsChart from "../../StatisticsChart/StatisticsChart.lazy";
import AlgorithmConfigPanel from "../AlgorithmConfigPanel/AlgorithmConfigPanel.lazy";
import ChooseAlgorithmPanel from "../ChooseAlgorithmPanel/ChooseAlgorithmPanel.lazy";
import {AlgorithmType} from "../../../redux/extensions/enums/AlgorithmType";

interface GeneticAlgorithmWindowProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * A component that displays a window with tools for configuring
 * and running the search algorithm
 * @param {boolean} isOpen a property that determines whether a modal
 * window is open or not
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * a function that changes the value of the {@link isOpen} property
 * @constructor
 */
function GeneticAlgorithmWindow(
    {isOpen, setIsOpen}: GeneticAlgorithmWindowProps,
) {
    const nodes = useAppSelector((state) => state.nodes.items);
    const links = useAppSelector((state) => state.links.items);
    const {foundPath, executionTimeInMS} = useAppSelector((state) => state.graph)
    const selectedNodes = useAppSelector((state) => state.nodes.pickedPathfinderNodes)
    const algorithmStepsInfo = useAppSelector((state) => state.graph.algorithmStepsInfo)
    const [limitations, setLimitations] = React.useState<Array<{name: string, limit: number}>>(
        Object.keys(links[0]?.value || {}).map((key) => {
            return {name: key, limit: Number.MAX_VALUE}
        })
    )
    const [config, setConfig] = React.useState({
        crossoverRate: 1, mutationRate: 0.1, generationsCount: 500, populationSize: 200
    })
    const [mode, setMode] = React.useState(AlgorithmType.CANONICAL)

    const isSuitable = React.useCallback(
        () => {
            return nodes.length > 1 && links.length > 0;
        },
        [nodes, links],
    );

    const start = () => {
        startAlgorithm(config, nodes, links, limitations, mode, selectedNodes[0])
            .then(() => console.log('finished'))
    };

    return (
        <ModalWindow
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={(
                <h1>Задача коммивояжера</h1>
            )}
            content={(
                <div className="flex flex-col gap-2">
                    {
                        algorithmStepsInfo.items.length > 0 && (
                            <StatisticsChart/>
                        )
                    }
                    <div className="flex flex-row gap-2">
                        <div>
                            <AdditionalCondition
                                condition={isSuitable}
                                content={(
                                    <p className="font-light text-gray-500">
                                        Необходимо наличие в графе как минимум 2 узлов
                                        и 1 ссылки
                                    </p>
                                )}
                            />
                            {
                                !isSuitable() ? (
                                    <div className="w-full h-20 bordered rounded-md
                                    centered text-center flex-col text-xl text-gray-600
                                    shadow-md">
                                        <BiLockAlt/>
                                        <span>Недоступно, пока не выполнено условие</span>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <b>Ограничения:</b>
                                            <Limiter
                                                source={links[0].value}
                                                limitations={limitations}
                                                setLimitations={setLimitations}
                                            />
                                        </div>
                                        <ChooseNodesMenu/>
                                        <AlgorithmConfigPanel
                                            config={config} setConfig={setConfig}
                                        />
                                        <ChooseAlgorithmPanel setMode={setMode}/>
                                        <button
                                            type="button"
                                            className="submit-button"
                                            onClick={() => start()}
                                        >
                                            Запустить
                                        </button>
                                    </>
                                )
                            }
                            {
                                foundPath ? (
                                    <div className="flex flex-col gap-2 bg-white rounded-md bordered my-4 p-2">
                                        <div className="flex gap-2">
                                            <b>Время выполнения алгоритма (в миллисекундах): </b>
                                            <span>{executionTimeInMS}</span>
                                        </div>
                                        <PathInfoPanel pathInfo={foundPath}/>
                                    </div>
                                ) : (
                                    <div className="centered text-center w-full p-2">
                                        <span className="text-gray-400">
                                            Здесь будет показан результат вычислений
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <AlgorithmActionStatus/>
                    </div>
                </div>
            )}
        />
    );
}

export default GeneticAlgorithmWindow;
