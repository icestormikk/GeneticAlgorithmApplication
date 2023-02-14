import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AlgorithmActionsController from './AlgorithmActionsController';

describe('<AlgorithmActionsController />', () => {
  test('it should mount', () => {
    render(<AlgorithmActionsController />);

    const algorithmActionsController = screen
        .getByTestId('AlgorithmActionsController');

    expect(algorithmActionsController).toBeInTheDocument();
  });
});
