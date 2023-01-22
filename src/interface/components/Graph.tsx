import React from 'react';
import ForceGraph from 'react-force-graph-3d';
import {addLink, addNode, select} from '../redux/slicers/graphSlice';
import {generateUUID} from 'three/src/math/MathUtils';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {ReduxNodeObject} from '../redux/extensions/ReduxNodeObject';
import {ReduxLinkObject} from '../redux/extensions/ReduxLinkObject';
import {
  getRandomNumber,
} from '../../geneticAlgorithm/operators/RecombinationOperators';

export const createNewLink = (
    fromNode: ReduxNodeObject, toNode: ReduxNodeObject,
) : ReduxLinkObject => {
  return {
    id: generateUUID(),
    source: fromNode.id,
    target: toNode.id,
    value: {
      distance: getRandomNumber(0, 100),
      cost: getRandomNumber(50, 100),
    },
  };
};

/**
 * A component for displaying the resulting graph and
 * manipulating its components (vertices and edges)
 * @return {JSX.Element}
 * @constructor
 */
function Graph() {
  const dispatch = useAppDispatch();
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const {nodes, links, selectedNodes} = useAppSelector((state) => state.graph);
  const initData = React.useMemo(() => {
    const refactoredNodes = nodes.map((el) => JSON.parse(JSON.stringify(el)));
    const refactoredLinks = links.map((el) => JSON.parse(JSON.stringify(el)));

    return {nodes: refactoredNodes, links: refactoredLinks};
  }, [nodes, links]);

  const handleNodeRightClick = async (node: ReduxNodeObject) => {
    const newNode = {id: generateUUID()};
    const newLink = createNewLink(node, newNode);

    await Promise.all(
        [dispatch(addNode(newNode)), dispatch(addLink(newLink))],
    );
  };

  const handleNodeLeftClick = (node: ReduxNodeObject) => {
    dispatch(select(node));
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth); setHeight(window.innerHeight);
    });
  }, []);

  return <ForceGraph
    controlType="trackball"
    width={width}
    height={height}
    graphData={initData}
    linkDirectionalParticles={1}
    nodeColor={(node) =>
      selectedNodes.find((el) => el.id === node.id) ? 'white' : 'yellow'
    }
    nodeLabel={(node) => `node-${node.id}`}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onNodeRightClick={(node: ExtendedNodeObject) => handleNodeRightClick(node)}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onNodeClick={(node: ExtendedNodeObject) => handleNodeLeftClick(node)}
    linkDirectionalArrowLength={3.5}
    linkDirectionalArrowRelPos={1}
    linkCurvature={0.0}
  />;
}

export default Graph;
