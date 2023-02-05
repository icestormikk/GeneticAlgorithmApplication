import React from 'react';
import './geneticAlgorithm/operators/MutationOperators';
import './geneticAlgorithm/operators/RecombinationOperators';
import './geneticAlgorithm/operators/NewPopulationSelectionOperators';
import './geneticAlgorithm/operators/ParentsSelectionOperators';
import ActionsMenu from './interface/components/ActionsMenu/ActionsMenu.lazy';
import Graph from './interface/components/Graph';
import JoinNodesWindow
  from './interface/components/JoinNodesWindow/JoinNodesWindow.lazy';
import AllEntitiesInfo
  from './interface/components/AllEntitiesInfo/AllEntitiesInfo.lazy';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

/**
 * The root component of the React application
 * @constructor
 */
function App() {
  const [isFullInfoOpen, setIsFullInfoOpen] = React.useState(false);

  return (
    <>
      <ActionsMenu setIsFullInfoOpen={setIsFullInfoOpen} />
      <Graph />
      <JoinNodesWindow/>
      <AllEntitiesInfo isOpen={isFullInfoOpen}/>
    </>
  );
}

export default App;
