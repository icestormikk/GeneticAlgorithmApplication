import React from 'react';
import ChosenNodesPanel from './ChosenNodesPanel';
import EntitiesList from './EntitiesList';

interface FullInfoMenuProps {
    isShown: boolean
}

/**
 * A component that displays detailed information about the state of the graph
 * @param {boolean} isShown a parameter that determines whether the window
 * is open or closed
 * @return {JSX.Element}
 * @constructor
 */
function FullInfoMenu({isShown}: FullInfoMenuProps): JSX.Element {
  return (
    <div className={`${isShown ? 'right-0' : '-right-full'} full-info-panel`}>
      <h1>ПАНЕЛЬ УПРАВЛЕНИЯ</h1>
      <ChosenNodesPanel/>
      <EntitiesList/>
    </div>
  );
}

export default FullInfoMenu;
