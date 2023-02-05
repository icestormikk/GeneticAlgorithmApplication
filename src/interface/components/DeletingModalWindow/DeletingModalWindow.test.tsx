import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeletingModalWindow from './DeletingModalWindow';

describe('<DeletingModalWindow />', () => {
  test('it should mount', () => {
    render(
        <DeletingModalWindow
          content={(<></>)}
          isOpen={false}
          setIsOpen={() => {
            return 0;
          }}
          onDelete={() => {
            return 0;
          }}
        />,
    );

    const deletingModalWindow = screen.getByTestId('DeletingModalWindow');

    expect(deletingModalWindow).toBeInTheDocument();
  });
});
