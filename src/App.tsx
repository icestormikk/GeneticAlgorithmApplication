import React from 'react';
import './geneticAlgorithm/operators/MutationOperators';
import './geneticAlgorithm/operators/RecombinationOperators';
import './geneticAlgorithm/operators/NewPopulationSelectionOperators';
import {Chromosome} from './geneticAlgorithm/domain/Chromosome';
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
          const population = new Population(
              new Chromosome(1, 2, 3, 4, 5, 6, 7, 8),
              new Chromosome(1, 2, 3, 4, 5, 6, 7, 8),
              new Chromosome(1, 2, 3, 4, 5, 6, 7, 8),
              new Chromosome(0, 5, 2, 1, 0, 100, 400, 0),
              new Chromosome(80, 10, 20, 6, 7, 100, 5, 1),
          );
          console.log(
              population.bolzmanSelection(
                  0.8,
                  (a) => a.gens.reduce((a, b) => a+b, 0),
              ),
          );
        }
      }>
        Click
    </button>
  );
}

export default App;
