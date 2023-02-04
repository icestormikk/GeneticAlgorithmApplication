import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllEntitiesInfo from './AllEntitiesInfo';

describe('<AllEntitiesInfo />', () => {
  test('it should mount', () => {
    render(<AllEntitiesInfo isOpen={false}/>);

    const allEntitiesInfo = screen.getByTestId('AllEntitiesInfo');

    expect(allEntitiesInfo).toBeInTheDocument();
  });
});
