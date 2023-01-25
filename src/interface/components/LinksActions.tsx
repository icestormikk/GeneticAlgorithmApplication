import React from 'react';
import {MdAddLink, MdLinkOff} from 'react-icons/md';
import {createNewLink} from './Graph';
import {ReduxLinkObject} from '../redux/extensions/ReduxLinkObject';
import {ReduxNodeObject} from '../redux/extensions/ReduxNodeObject';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addLink, removeLink} from '../redux/slicers/linkSlice';
import {setSelectedNodes} from '../redux/slicers/nodeSlice';

/**
 * Check if the current link already exists
 * @param {array} links array of links <b>without a new link</b>
 * @param {array} newLink new link object
 * @return {boolean} true if the link exists, otherwise false
 */
const isLinkExists = (
    links: Array<ReduxLinkObject>,
    newLink: Array<ReduxNodeObject>,
) => {
  return newLink.every((el) => el) && links.map((el) =>
    `${[el.source, el.target]}`).includes(`${newLink[0].id},${newLink[1].id}`,
  );
};

/**
 * LinksActions
 * @return {JSX.Element}
 * @constructor
 */
function LinksActions() {
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.links.items);
  const selectedNodes = useAppSelector((state) => state.nodes.selectedItems);

  const handleLinkCreation = React.useCallback(() => {
    if (!isLinkExists(links, selectedNodes)) {
      const newLink = createNewLink(selectedNodes[0], selectedNodes[1]);
      dispatch(addLink(newLink));
      dispatch(setSelectedNodes([]));
    }
  }, [selectedNodes]);

  const handleLinkDeleting = () => {
    if (isLinkExists(links, selectedNodes)) {
      links.filter((el) =>
        el.source !== selectedNodes[0].id || el.target !== selectedNodes[1].id,
      ).forEach((el) =>
        dispatch(removeLink(el.id)),
      );

      dispatch(setSelectedNodes([]));
    }
  };

  const isDeletingPossible = React.useCallback(() => {
    return selectedNodes.length > 1 &&
        isLinkExists(links, selectedNodes);
  }, [selectedNodes]);
  const isAddingPossible = React.useCallback(() => {
    return selectedNodes.length > 1 &&
        !isLinkExists(links, selectedNodes);
  }, [selectedNodes]);

  return (
    <div className="centered text-2xl gap-2 mx-4">
      <button
        type="button"
        title="Связать точки"
        disabled={!isAddingPossible()}
        onClick={() => handleLinkCreation()}
        className={isAddingPossible() ? 'text-green-500' : 'text-red-500'}
      >
        <MdAddLink/>
      </button>
      <button
        type="button"
        title="Удалить связь"
        disabled={!isDeletingPossible()}
        onClick={() => handleLinkDeleting()}
        className={isDeletingPossible() ? 'text-green-500' : 'text-red-500'}
      >
        <MdLinkOff/>
      </button>
    </div>
  );
}

export default LinksActions;
