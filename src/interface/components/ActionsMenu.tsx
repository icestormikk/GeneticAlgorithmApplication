import React from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import {HiOutlineArrowsPointingOut} from 'react-icons/hi2';
import {backToInitialState, clearLinks} from '../redux/slicers/graphSlice';
import {ImLoop2} from 'react-icons/im';
import {MdReadMore} from 'react-icons/md';

interface ActionsMenuProps {
  setIsFullInfoShown: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * A component that displays buttons for actions on graph elements
 * @param {ActionsMenuProps} props
 * @return {JSX.Element}
 * @constructor
 */
function ActionsMenu(props: ActionsMenuProps) {
  const dispatch = useDispatch();
  const [isShown, setShown] = React.useState(false);
  const buttons = React.useMemo(() => [
    {
      id: 0,
      title: 'Удалить все связи',
      icon: <HiOutlineArrowsPointingOut/>,
      action: () => {
        dispatch(clearLinks());
      },
    },
    {
      id: 1,
      title: 'Сбросить состояние',
      icon: <ImLoop2/>,
      action: () => {
        dispatch(backToInitialState());
      },
    },
    {
      id: 2,
      title: 'Показать подробную инфорацию',
      icon: <MdReadMore/>,
      action: () => {
        props.setIsFullInfoShown((prevState) => !prevState);
      },
    },
  ], []);

  return (
    <>
      <button
        type="button"
        className={`absolute bottom-0 left-0 z-10 text-xl p-2
        ${isShown && 'hidden'}`}
        onClick={() => setShown(true)}
      >
        <GiHamburgerMenu className="text-white"/>
      </button>
      {
        isShown && (
          <div className="absolute left-0 bottom-0 z-10 text-white
          w-screen flex flex-row gap-2 text-xl">
            <button
              type="button"
              className="p-2"
              onClick={() => setShown(false)}
            >
              <AiOutlineClose/>
            </button>
            <div className="flex flex-row gap-4 border-x-[1px]
            border-x-gray-600 px-2">
              {
                buttons.map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    className="action-button"
                    onClick={button.action}
                    title={button.title}
                  >
                    {button.icon}
                  </button>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  );
}

export default ActionsMenu;
