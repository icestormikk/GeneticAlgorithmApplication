import React from 'react';
import {MdAddLink, MdLinkOff} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {createNewLink} from './Graph';
import {
  clearSelectedNodes,
  setLinks,
  setNodes,
} from '../redux/slicers/graphSlice';

/**
 * Check if the current link already exists
 * @param {array} links array of links <b>without a new link</b>
 * @param {array} newLink new link object
 * @return {boolean} true if the link exists, otherwise false
 */
const isLinkExists = (links, newLink) => {
  return newLink.every((el) => el) && links.map((el) =>
    `${[el.source, el.target]}`).includes(`${newLink[0]},${newLink[1]}`,
  );
};

/**
 * LinksActions
 * @return {JSX.Element}
 * @constructor
 */
function LinksActions() {
  const dispatch = useDispatch();
  const graph = useSelector((state) => state.graph);
  const selectedNodes = useSelector((state) => state.graph.selectedNodes);

  const handleLinkCreation = React.useCallback(() => {
    const {links} = graph;
    const nodes = graph.nodes.map((el) => Object.assign({}, el));
    if (!isLinkExists(links, [selectedNodes[1], selectedNodes[0]])) {
      const newLinks = [
        ...links, createNewLink(selectedNodes[1], selectedNodes[0]),
      ];
      dispatch(setLinks(newLinks));

      dispatch(setNodes(
          nodes.map((el) => {
            el.selected = false; return el;
          }),
      ));
      dispatch(clearSelectedNodes());
    }
  }, [selectedNodes]);

  const handleLinkDeleting = () => {
    if (isLinkExists(graph.links, [selectedNodes[1], selectedNodes[0]])) {
      dispatch(
          setLinks(graph.links.filter((el) => el.source !== selectedNodes[1] ||
          el.target !== selectedNodes[0])),
      );
      dispatch(clearSelectedNodes());
    }
  };

  const isDeletingPossible = () => {
    return selectedNodes.length > 1 &&
      isLinkExists(
          graph.links,
          [selectedNodes[1], selectedNodes[0]],
      );
  };
  const isAddingPossible = () => {
    return selectedNodes.length > 1 &&
      !isLinkExists(
          graph.links,
          [selectedNodes[1], selectedNodes[0]],
      );
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
