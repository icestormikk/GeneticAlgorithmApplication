import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalWindow from './ModalWindow';

describe('<ModalWindow />', () => {
  test('it should mount', () => {
    render(
        <ModalWindow
          content={(<></>)}
          title={<h1>Заголовок</h1>}
          isOpen={false}
          setIsOpen={() => {
            return 0;
          }}
        />,
    );

    const modalWindow = screen.getByTestId('ModalWindow');

    expect(modalWindow).toBeInTheDocument();
  });
});
