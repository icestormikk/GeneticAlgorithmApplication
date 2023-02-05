import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NodeEntity from './NodeEntity';

describe('<NodeEntity />', () => {
  test('it should mount', () => {
    render(<NodeEntity id={'0'}/>);

    const nodeEntity = screen.getByTestId('NodeEntity');

    expect(nodeEntity).toBeInTheDocument();
  });
});
