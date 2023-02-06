import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdditionalCondition from './AdditionalCondition';

describe('<AdditionalCondition />', () => {
  test('it should mount', () => {
    render(<AdditionalCondition condition={() => true} content={(<></>)}/>);

    const additionalCondition = screen.getByTestId('AdditionalCondition');

    expect(additionalCondition).toBeInTheDocument();
  });
});
