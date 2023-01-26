import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {useAppSelector} from '../redux/hooks';
import NodePanel from './NodePanel';
import {ReduxNodeObject} from '../redux/extensions/ReduxNodeObject';
import Stopwatch from './Stopwatch';

interface GenAlgWindowProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * The component, which is an intermediate link between genetic
 * algorithms and the program interface, allows you to access
 * the launch of the algorithm
 * @param {boolean} isOpen a property that determines whether
 * the window is open or not
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen
 * a function that changes the {@link isOpen} property
 * @constructor
 */
function GeneticAlgorithmWindow({isOpen, setIsOpen}: GenAlgWindowProps) {
  const nodes = useAppSelector((state) => state.nodes.items);
  const links = useAppSelector((state) => state.links.items);
  const [
    selectedNodes,
    setSelectedNodes,
  ] = React.useState<ReduxNodeObject[]>([]);

  const isSuitable = React.useCallback(() => {
    return nodes.length >= 2 && links.length >= 1;
  }, [nodes.length, links.length]);

  const isSelected = React.useCallback((node: ReduxNodeObject) => {
    return selectedNodes.find((el) => el.id === node.id) !== undefined;
  }, [selectedNodes]);

  const isStartNode = React.useCallback((node: ReduxNodeObject) => {
    return selectedNodes[0] && selectedNodes[0].id === node.id;
  }, [selectedNodes]);

  const isEndNode = React.useCallback((node: ReduxNodeObject) => {
    return selectedNodes[1] && selectedNodes[1].id === node.id;
  }, [selectedNodes]);

  const handleNodeSelect = React.useCallback((node: ReduxNodeObject) => {
    const {id} = node;

    if (selectedNodes.length == 2) {
      selectedNodes.splice(0, selectedNodes.length);
    }

    if (!selectedNodes.find((el) => el.id === id)) {
      setSelectedNodes((prevState) => prevState.concat(node));
    } else {
      setSelectedNodes((prevState) => prevState.filter((el) => el.id !== id));
    }
  }, [selectedNodes]);

  return (
    <div className={`fixed ${isOpen ? 'top-0' : '-top-full'} left-0 w-screen 
    h-screen bg-black/60 duration-100 transition-all z-30 centered`}>
      <div className="bg-[#efefef] text-gray-800 w-[32rem] rounded-md flex
      flex-col gap-2 overlay">
        <div className="w-full border-b-[1px] border-b-gray-300 flex justify-end
        items-center p-1">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineClose className="text-xl"/>
          </button>
        </div>
        <div className="p-2 flex gap-4 flex-col">
          <div>
            <h1 className="font-bold">
              НАЙТИ КРАТЧАЙШИЙ ПУТЬ МЕЖДУ ДВУМЯ ТОЧКАМИ
            </h1>
            <p>С использованием генетических алгоритмов</p>
          </div>
          <p className="font-light text-sm">
            Примечание: для применения этого алгоритма необходимо, чтобы граф
            содержал как минимум <b>2 точки</b> и <b>1 связь</b>.
            <b className={`${isSuitable() ? 'bg-green-500' : 'bg-red-500'} 
            text-white px-2 py-0.5 rounded-md ml-3 shadow-md`}>
              {
                isSuitable() ? (
                  <span>Выполнено</span>
                ) : (
                  <span>Не выполнено</span>
                )
              }
            </b>
          </p>
          <div>
            <p>Выберите начальную и конечную точки:</p>
            <ul className="flex flex-col gap-1 max-h-[60vh] overflow-x-hidden
            overflow-y-scroll">
              {
                nodes.map((node) => (
                  <button
                    key={node.id}
                    className={`node-actions-container duration-100 
                    transition-all p-1 ${isSelected(node) ?
                    'bg-green-500/50' : 'bg-gray-300'} flex flex-row
                    justify-between items-center`}
                    onClick={() => handleNodeSelect(node)}
                  >
                    <NodePanel node={node}/>
                    {isStartNode(node) && (<span>Start</span>)}
                    {isEndNode(node) && (<span>End</span>)}
                  </button>
                ))
              }
            </ul>
            <Stopwatch/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneticAlgorithmWindow;
