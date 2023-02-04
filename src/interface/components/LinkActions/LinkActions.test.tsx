import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LinkActions from './LinkActions';

describe('<LinkActions />', () => {
  test('it should mount', () => {
    render(<LinkActions />);

    const linkActions = screen.getByTestId('LinkActions');

    expect(linkActions).toBeInTheDocument();
  });
});
