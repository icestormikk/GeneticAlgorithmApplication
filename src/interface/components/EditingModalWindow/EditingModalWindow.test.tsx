import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditingModalWindow from './EditingModalWindow';

describe('<EditingModalWindow />', () => {
  test('it should mount', () => {
    render(
        <EditingModalWindow
          content={(<></>)}
          isOpen={false}
          setIsOpen={() => {
            return 0;
          }}
        />,
    );

    const editingModalWindow = screen.getByTestId('EditingModalWindow');

    expect(editingModalWindow).toBeInTheDocument();
  });
});
