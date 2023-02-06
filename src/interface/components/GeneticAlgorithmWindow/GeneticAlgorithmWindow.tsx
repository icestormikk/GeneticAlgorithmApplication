import React from 'react';
import {useAppSelector} from '../../redux/hooks';
import ModalWindow from '../ModalWindow/ModalWindow.lazy';
import AdditionalCondition
  from '../AdditionalCondition/AdditionalCondition.lazy';
import {BiLockAlt} from 'react-icons/bi';
import {ReduxNodeObject} from '../../redux/extensions/ReduxNodeObject';
import ChooseNodesMenu from '../ChooseNodesMenu/ChooseNodesMenu.lazy';
import {startAlgorithm} from '../../../geneticAlgorithm';

interface GeneticAlgorithmWindowProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * GeneticAlgorithmWindow
 * @param {boolean} isOpen
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * @constructor
 */
function GeneticAlgorithmWindow(
    {isOpen, setIsOpen}: GeneticAlgorithmWindowProps,
) {
  const nodes = useAppSelector((state) => state.nodes.items);
  const links = useAppSelector((state) => state.links.items);
  const [
    // eslint-disable-next-line no-unused-vars
    selectedNodes, setSelectedNodes,
  ] = React.useState<Array<ReduxNodeObject>>([]);

  const isSuitable = React.useCallback(
      () => {
        return nodes.length > 1 && links.length > 0;
      },
      [nodes, links],
  );

  const start = React.useCallback(
      () => {
        startAlgorithm(nodes, links);
      },
      [nodes, links],
  );

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
                  <ChooseNodesMenu nodesCollector={selectedNodes}/>
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
          <div className="bordered rounded-md w-1/2 p-1 shadow-xl">
            <b>Статус</b>
            <p className="font-light text-gray-500">
              Здесь будут отображаться текущие действия и их
              прогресс
            </p>
          </div>
        </div>
      )}
    />
  );
}

export default GeneticAlgorithmWindow;
