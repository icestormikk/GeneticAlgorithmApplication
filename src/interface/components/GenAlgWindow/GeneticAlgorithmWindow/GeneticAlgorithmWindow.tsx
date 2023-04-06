import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import ModalWindow from '../../ModalWindow/ModalWindow.lazy';
import AdditionalCondition from '../AdditionalCondition/AdditionalCondition.lazy';
import {BiLockAlt} from 'react-icons/bi';
import ChooseNodesMenu from '../ChooseNodesMenu/ChooseNodesMenu.lazy';
import {startAlgorithm} from '../../../../geneticAlgorithm';
import AlgorithmActionStatus from '../AlgorithmActionStatus/AlgorithmActionStatus.lazy';

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
    const selectedNodes = useAppSelector((state) => state.nodes.pickedPathfinderNodes)

    const isSuitable = React.useCallback(
        () => {
            return nodes.length > 1 && links.length > 0;
        },
        [nodes, links],
    );

    const start = async () => {
        console.log(selectedNodes)
        startAlgorithm(nodes, links, selectedNodes[0])
            .then(() => console.log('finished'));
    };

    return (
        <ModalWindow
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={(
                <h1>Задача Комми-Вояжера</h1>
            )}
            content={(
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
                                <div className="w-full h-20 bg-gray-400/60 rounded-md
                                centered text-center flex-col text-xl text-gray-600
                                shadow-xl">
                                    <BiLockAlt/>
                                    <span>Locked</span>
                                </div>
                            ) : (
                                <>
                                    <ChooseNodesMenu/>
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
                    </div>
                    <AlgorithmActionStatus/>
                </div>
            )}
        />
    );
}

export default GeneticAlgorithmWindow;
