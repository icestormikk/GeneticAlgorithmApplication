import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GeneticAlgorithmWindow from './GeneticAlgorithmWindow';

describe('<GeneticAlgorithmWindow />', () => {
  test('it should mount', () => {
    render(
        <GeneticAlgorithmWindow
          isOpen
          setIsOpen={() => true}
        />,
    );

    const geneticAlgorithmWindow = screen.getByTestId('GeneticAlgorithmWindow');

    expect(geneticAlgorithmWindow).toBeInTheDocument();
  });
});
