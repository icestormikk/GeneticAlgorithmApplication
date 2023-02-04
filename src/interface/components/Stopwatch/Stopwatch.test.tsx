import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stopwatch from './Stopwatch';

describe('<Stopwatch />', () => {
  test('it should mount', () => {
    render(<Stopwatch />);

    const stopwatch = screen.getByTestId('Stopwatch');

    expect(stopwatch).toBeInTheDocument();
  });
});
