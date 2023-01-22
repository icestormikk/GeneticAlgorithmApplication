import React from 'react';
import {MdAddLink, MdLinkOff} from 'react-icons/md';
import {createNewLink} from './Graph';
import {clearSelectedNodes, setLinks} from '../redux/slicers/graphSlice';
import {ReduxLinkObject} from '../redux/extensions/ReduxLinkObject';
import {ReduxNodeObject} from '../redux/extensions/ReduxNodeObject';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

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
  const graph = useAppSelector((state) => state.graph);
  const selectedNodes = useAppSelector((state) => state.graph.selectedNodes);

  const handleLinkCreation = React.useCallback(() => {
    const {links} = graph;
    if (!isLinkExists(links, selectedNodes)) {
      const newLinks = [
        ...links, createNewLink(selectedNodes[0], selectedNodes[1]),
      ];
      dispatch(setLinks(newLinks));
      dispatch(clearSelectedNodes());
    }
  }, [selectedNodes]);

  const handleLinkDeleting = () => {
    if (isLinkExists(graph.links, selectedNodes)) {
      dispatch(
          setLinks(graph.links.filter((el) =>
            el.source !== selectedNodes[0].id ||
                  el.target !== selectedNodes[1].id,
          )),
      );
      dispatch(clearSelectedNodes());
    }
  };

  const isDeletingPossible = () => {
    return selectedNodes.length > 1 &&
      isLinkExists(graph.links, selectedNodes);
  };
  const isAddingPossible = () => {
    return selectedNodes.length > 1 &&
      !isLinkExists(graph.links, selectedNodes);
  };

  return (
    <div className="centered text-2xl gap-2">
      <button
        type="button"
        title="Связать точки"
        disabled={!isAddingPossible()}
        onClick={() => handleLinkCreation()}
      >
        <MdAddLink/>
      </button>
      <button
        type="button"
        title="Удалить связь"
        disabled={!isDeletingPossible()}
        onClick={() => handleLinkDeleting()}
      >
        <MdLinkOff/>
      </button>
    </div>
  );
}

export default LinksActions;
