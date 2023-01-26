import React from 'react';
import NodePanel from './NodePanel';
import {CgEditBlackPoint} from 'react-icons/cg';
import {VscActivateBreakpoints} from 'react-icons/vsc';
import {useAppSelector} from '../redux/hooks';
import LinkPanel from './LinkPanel';

/**
 * Entities list
 * @return {JSX.Element}
 * @constructor
 */
function EntitiesList() {
  const nodes = useAppSelector((state) => state.nodes.items);
  const links = useAppSelector((state) => state.links.items);

  return (
    <div className="menu-container">
      <div className="w-full bg-gray-200 p-1">
        <h1>Общая информация</h1>
      </div>
      <div className="flex flex-col gap-2 p-1">
        <div className="menu-list">
          <div className="header">
            <VscActivateBreakpoints className="text-xl"/>
            <h1>Связи</h1>
          </div>
          <ul>
            {
              links.map((link) => (
                <li
                  key={link.id}
                  className="node-actions-container duration-100
                  transition-all p-1"
                >
                  <LinkPanel link={link} isActionsShown={true}/>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="menu-list">
          <div className="header">
            <CgEditBlackPoint className="text-xl"/>
            <h1>Точки</h1>
          </div>
          <ul>
            {
              nodes.map((node) => (
                <li
                  key={node.id}
                  className="node-actions-container duration-100
                  transition-all p-1"
                >
                  <NodePanel node={node} isActionsShown={true}/>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EntitiesList;
