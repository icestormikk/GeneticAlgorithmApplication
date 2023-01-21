import React from 'react';
import ForceGraph from 'react-force-graph-3d';
import {useDispatch, useSelector} from 'react-redux';
import {addLink, addNode, select} from '../redux/slicers/graphSlice';
import {generateUUID} from 'three/src/math/MathUtils';

export const createNewLink = (fromNodeId, toNodeId) => {
  return {
    id: generateUUID(),
    source: fromNodeId,
    target: toNodeId,
    value: {text: `${fromNodeId} -> ${toNodeId}`},
  };
};

/**
 * A component for displaying the resulting graph and
 * manipulating its components (vertices and edges)
 * @return {JSX.Element}
 * @constructor
 */
const Graph = () => {
  const dispatch = useDispatch();
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const nodes = useSelector((state) =>
    state.graph.nodes.map((el) => Object.assign({}, el)),
  );
  const links = useSelector((state) =>
    state.graph.links.map((el) => Object.assign({}, el)),
  );
  const initData = React.useMemo(() => {
    return {nodes, links};
  }, [nodes, links]);

  const handleNodeRightClick = async (node) => {
    const newNode = {id: generateUUID(), selected: false};
    const newLink = createNewLink(node.id, newNode.id);

    await Promise.all(
        [dispatch(addNode(newNode)), dispatch(addLink(newLink))],
    );
  };

  const handleNodeLeftClick = (node) => {
    dispatch(select(node));
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth); setHeight(window.innerHeight);
    });
  }, []);

  return <ForceGraph
    width={width}
    height={height}
    graphData={initData}
    linkDirectionalParticles={1}
    nodeColor={(node) => node['selected'] ? 'white' : 'yellow'}
    nodeLabel={(node) => `node-${node.id}`}
    onNodeRightClick={handleNodeRightClick}
    onNodeClick={handleNodeLeftClick}
    linkDirectionalArrowLength={3.5}
    linkDirectionalArrowRelPos={1}
    linkCurvature={0.0}
  />;
};

export default Graph;
