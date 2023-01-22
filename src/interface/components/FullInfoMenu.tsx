import React from 'react';
import ChosenNodesPanel from './ChosenNodesPanel';
import EntitiesList from './EntitiesList';

interface FullInfoMenuProps {
    isShown: boolean
}

/**
 * A component that displays detailed information about the state of the graph
 * @param {FullInfoMenuProps} props
 * @return {JSX.Element}
 * @constructor
 */
function FullInfoMenu(props: FullInfoMenuProps): JSX.Element {
  return (
    <div className={`absolute top-0 ${props.isShown ? 'right-0' :
    '-right-full'} h-screen w-[25rem] bg-[#efefef]/80 z-10 duration-200
    transition-all ease-in-out rounded-l-md flex flex-col gap-2 px-2 py-2`}>
      <h1>ПАНЕЛЬ УПРАВЛЕНИЯ</h1>
      <ChosenNodesPanel/>
      <EntitiesList/>
    </div>
  );
}

export default FullInfoMenu;
