import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalHeader from './ModalHeader';

describe('<ModalHeader />', () => {
  test('it should mount', () => {
    render(
        <ModalHeader
          content={(<></>)}
          setIsOpen={() => {
            return 0;
          }}
        />,
    );

    const modalHeader = screen.getByTestId('ModalHeader');

    expect(modalHeader).toBeInTheDocument();
  });
});
