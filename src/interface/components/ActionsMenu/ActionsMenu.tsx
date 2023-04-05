/* eslint-disable no-unused-vars */
import React from 'react';
import {GiHamburgerMenu, GiPathDistance} from 'react-icons/gi';
import {AiOutlineClose, AiOutlineInfo,} from 'react-icons/ai';
import {HiOutlineArrowsPointingOut} from 'react-icons/hi2';
import {dropState, switchElementsVisibility,} from '../../redux/slicers/graphSlice';
import {ImLoop2} from 'react-icons/im';
import {MdReadMore} from 'react-icons/md';
import {useAppDispatch} from '../../redux/hooks';
import {dropLinks, setLinks} from '../../redux/slicers/linkSlice';
import {dropNodes} from '../../redux/slicers/nodeSlice';
import {AnimatePresence, motion} from 'framer-motion';
import GeneticAlgorithmWindow from '../GenAlgWindow/GeneticAlgorithmWindow/GeneticAlgorithmWindow.lazy';

interface ActionsMenuProps {
    setIsFullInfoOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * A component that displays buttons for actions on graph elements
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsFullInfoShown
 * the function responsible for navigating to the menu with full information
 * about the objects in the graph
 * @return {JSX.Element}
 * @constructor
 */
function ActionsMenu({setIsFullInfoOpen}: ActionsMenuProps): JSX.Element {
    const dispatch = useAppDispatch();
    const [isShown, setShown] = React.useState(false);
    const [isWindowShown, setIsWindowShown] = React.useState(false);
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
                setIsFullInfoOpen((prevState) => !prevState);
            },
        },
        {
            id: 3,
            title: 'Найти путь',
            icon: <GiPathDistance/>,
            action: () => {
                setIsWindowShown(true);
            },
        },
        {
            id: 4,
            title: 'Показать/скрыть дополнительные параметры',
            icon: <AiOutlineInfo/>,
            action: () => {
                dispatch(switchElementsVisibility());
            },
        },
    ], []);

    return (
        <>
            <GeneticAlgorithmWindow
                isOpen={isWindowShown}
                setIsOpen={setIsWindowShown}
            />
            <AnimatePresence>
                <div className="absolute left-0 bottom-0 z-10 text-white flex
      flex-row gap-2 p-2 text-xl">
                    <button
                        type="button"
                        onClick={() => setShown((prevState) => !prevState)}
                    >
                        {
                            isShown ? (
                                <AiOutlineClose/>
                            ) : (
                                <GiHamburgerMenu/>
                            )
                        }
                    </button>
                    {
                        buttons.map((el, index) => (
                            <motion.button
                                key={el.id}
                                type="button"
                                title={el.title}
                                onClick={el.action}
                                transition={{delay: index * 0.1}}
                                initial={{opacity: 0}}
                                animate={{opacity: isShown ? 1 : 0}}
                            >
                                {el.icon}
                            </motion.button>
                        ))
                    }
                </div>
            </AnimatePresence>
        </>
    );
}

export default ActionsMenu;
