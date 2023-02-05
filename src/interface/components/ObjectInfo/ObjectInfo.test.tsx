import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ObjectInfo from './ObjectInfo';

describe('<ObjectInfo />', () => {
  test('it should mount', () => {
    render(<ObjectInfo obj={{id: 1, name: 'TaFo000'}} />);

    const objectInfo = screen.getByTestId('ObjectInfo');

    expect(objectInfo).toBeInTheDocument();
  });
});
