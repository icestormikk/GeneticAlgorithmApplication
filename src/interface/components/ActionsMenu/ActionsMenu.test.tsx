import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ActionsMenu from './ActionsMenu';

describe('<ActionsMenu />', () => {
  test('it should mount', () => {
    const [, setIsOpen] = React.useState(false);
    render(<ActionsMenu setIsFullInfoOpen={setIsOpen} />);

    const actionsMenu = screen.getByTestId('ActionsMenu');

    expect(actionsMenu).toBeInTheDocument();
  });
});
