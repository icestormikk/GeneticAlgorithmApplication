import React from 'react';
import ChosenNodesPanel from './ChosenNodesPanel';

/**
 * A component that displays detailed information about the state of the graph
 * @param {boolean} isShown bool
 * @return {JSX.Element}
 * @constructor
 */
function FullInfoMenu({isShown}) {
  return (
    <div className={`absolute top-0 ${isShown ? 'right-0' : '-right-full'} 
    h-screen w-1/3 bg-[#efefef]/80 z-10 duration-200 transition-all ease-in-out
    rounded-l-md flex flex-col gap-2 px-2 py-2`}>
      <h1>ПАНЕЛЬ УПРАВЛЕНИЯ</h1>
      <ChosenNodesPanel/>
    </div>
  );
}

export default FullInfoMenu;
