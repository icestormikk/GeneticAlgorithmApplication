import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JoinNodesWindow from './JoinNodesWindow';

describe('<JoinNodesWindow />', () => {
  test('it should mount', () => {
    render(<JoinNodesWindow />);

    const joinNodesWindow = screen.getByTestId('JoinNodesWindow');

    expect(joinNodesWindow).toBeInTheDocument();
  });
});
