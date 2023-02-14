import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AlgorithmActionStatus from './AlgorithmActionStatus';

describe('<AlgorithmActionStatus />', () => {
  test('it should mount', () => {
    render(<AlgorithmActionStatus />);

    const algorithmActionStatus = screen
        .getByTestId('AlgorithmActionStatus');

    expect(algorithmActionStatus).toBeInTheDocument();
  });
});
