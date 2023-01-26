import React from 'react';
import {GiHamburgerMenu, GiPathDistance} from 'react-icons/gi';
import {AiFillEye, AiFillEyeInvisible, AiOutlineClose} from 'react-icons/ai';
import {HiOutlineArrowsPointingOut} from 'react-icons/hi2';
import {dropState, switchElementsVisibility} from '../redux/slicers/graphSlice';
import {ImLoop2} from 'react-icons/im';
import {MdReadMore} from 'react-icons/md';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {dropLinks, setLinks} from '../redux/slicers/linkSlice';
import {dropNodes} from '../redux/slicers/nodeSlice';
import GeneticAlgorithmWindow from './GeneticAlgorithmWindow';

interface ActionsMenuProps {
  setIsFullInfoShown: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * A component that displays buttons for actions on graph elements
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsFullInfoShown
 * the function responsible for navigating to the menu with full information
 * about the objects in the graph
 * @return {JSX.Element}
 * @constructor
 */
function ActionsMenu({setIsFullInfoShown}: ActionsMenuProps): JSX.Element {
  const dispatch = useAppDispatch();
  const elementVisibility = useAppSelector(
      (state) => state.graph.isAdditionalElementsShow,
  );
  const [isShown, setShown] = React.useState(false);
  const [
    isAlgorithmWindowOpen,
    setIsAlgorithmWindowOpen,
  ] = React.useState(false);
  const buttons = React.useMemo(() => [
    {
      id: 0,
      title: 'Удалить все связи',
      icon: <HiOutlineArrowsPointingOut/>,
      action: () => {
        dispatch(setLinks([]));
      },
    },
    {
      id: 1,
      title: 'Сбросить состояние',
      icon: <ImLoop2/>,
      action: () => {
        dispatch(dropNodes());
        dispatch(dropLinks());
        dispatch(dropState());
      },
    },
    {
      id: 2,
      title: 'Показать подробную инфорацию',
      icon: <MdReadMore/>,
      action: () => {
        setIsFullInfoShown((prevState) => !prevState);
      },
    },
    {
      id: 3,
      title: 'Найти путь',
      icon: <GiPathDistance/>,
      action: () => {
        setIsAlgorithmWindowOpen(true);
      },
    },
  ], []);

  return (
    <>
      <GeneticAlgorithmWindow
        isOpen={isAlgorithmWindowOpen}
        setIsOpen={setIsAlgorithmWindowOpen}
      />
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
              <button
                type="button"
                className="action-button"
                onClick={() => dispatch(switchElementsVisibility())}
                title={`${elementVisibility ?
                    'Скрыть' : 'Показать'} дополнительные элементы`}
              >
                {elementVisibility ? <AiFillEyeInvisible/> : <AiFillEye/>}
              </button>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ActionsMenu;
