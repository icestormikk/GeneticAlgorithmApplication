import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LinkEntity from './LinkEntity';

describe('<LinkEntity />', () => {
  test('it should mount', () => {
    render(<LinkEntity id={'1'} />);

    const linkEntity = screen.getByTestId('LinkEntity');

    expect(linkEntity).toBeInTheDocument();
  });
});
