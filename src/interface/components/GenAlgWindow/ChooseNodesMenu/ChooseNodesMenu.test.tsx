import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChooseNodesMenu from './ChooseNodesMenu';

describe('<ChooseNodesMenu />', () => {
  test('it should mount', () => {
    render(<ChooseNodesMenu nodesCollector={[]}/>);

    const chooseNodesMenu = screen.getByTestId('ChooseNodesMenu');

    expect(chooseNodesMenu).toBeInTheDocument();
  });
});
