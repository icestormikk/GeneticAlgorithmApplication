import React from 'react';
import './geneticAlgorithm/operators/MutationOperators';
import './geneticAlgorithm/operators/RecombinationOperators';
import {Chromosome} from './geneticAlgorithm/domain/Chromosome';
import {ChromosomePair} from './geneticAlgorithm/domain/ChromosomePair';
import {Population} from './geneticAlgorithm/domain/Population';

/**
 * The root component of the React application
 * @constructor
 */
function App() {
  return (
    <button
      type="button"
      onClick={
        () => {
          const chrPair2 = new ChromosomePair(
              new Chromosome(1, 2, 3, 4, 5, 6, 7, 8),
              new Chromosome(10, 20, 30, 40, 50, 60, 70, 80),
          );
          const population = new Population(
              chrPair2.first, chrPair2.second,
          );
          console.log(
              population.truncationSelection(
                  0.5,
                  (a) => a.id,
              ),
          );
        }
      }>
        Click
    </button>
  );
}

export default App;
