import React from 'react';
import './geneticAlgorithm/operators/MutationOperators';
import './geneticAlgorithm/operators/RecombinationOperators';
import './geneticAlgorithm/operators/NewPopulationSelectionOperators';
import './geneticAlgorithm/operators/ParentsSelectionOperators';
import Graph from './interface/components/Graph';
import ActionsMenu from './interface/components/ActionsMenu';
import FullInfoMenu from './interface/components/FullInfoMenu';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

// const genRandomTree = (N = 10, reverse = true) => {
//   return {
//     nodes: [...Array.from(Array(N).keys())].map((i) =>
//       ({id: i, name: `node-${i}`}),
//     ),
//     links: [...Array.from(Array(N).keys())]
//         .filter((id) => id)
//         .map((id) => ({
//           [reverse ? 'target' : 'source']: id,
//           [reverse ? 'source' : 'target']: Math.round(Math.random()
//           * (id-1)),
//         })),
//   };
// };

/**
 * The root component of the React application
 * @constructor
 */
function App() {
  const [isFullInfoShown, setIsFullShown] = React.useState(false);

  return (
    <>
      <ActionsMenu setIsFullInfoShown={setIsFullShown} />
      <FullInfoMenu isShown={isFullInfoShown}/>
      <Graph />
    </>
  );
}

export default App;
