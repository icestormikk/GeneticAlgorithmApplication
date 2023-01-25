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
import SpriteText from 'three-spritetext';
import {ExtendedNodeObject} from '../redux/extensions/ExtendedNodeObject';
import {ExtendedLinkObject} from '../redux/extensions/ExtendedLinkObject';

/**
 * Accepts an object and returns a human-readable representation of its values
 * @param {T} object the object whose values need to be translated
 * @return {string} human-readable representation of object values
 * @template T
 */
function beautify<T>(object: T) : string {
  return JSON.stringify(object)
      .replace(/["{}\s]/ig, '')
      .replace(/,/ig, '\n')
      .replace(/:/ig, ': ');
}

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
      broken: Math.random() > 0.5,
      isPath: Math.random() > 0.5,
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
  const {
    nodes,
    links,
    selectedNodes,
    path,
    isAdditionalElementsShow,
  } = useAppSelector((state) => state.graph);
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
    nodeColor={(node) =>
      selectedNodes.find((el) => el.id === node.id) ? 'white' : 'yellow'
    }
    nodeLabel={(node) => `node-${node.id}`}
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    onNodeRightClick={(node: ExtendedNodeObject) =>
      handleNodeRightClick(node)
    }
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    onNodeClick={(node: ExtendedNodeObject) => handleNodeLeftClick(node)}
    linkThreeObjectExtend={true}
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    linkThreeObject={(link: ExtendedLinkObject) => {
      const sprite = new SpriteText(
          isAdditionalElementsShow ? beautify(link.value) : ' ',
      );
      sprite.color = link.value.broken ? 'red' : 'green';
      sprite.fontFace = 'Arial';
      sprite.textHeight = 1.5;
      return sprite;
    }}
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    linkPositionUpdate={(sprite, {start, end}) => {
      const strings: [string, string, string] = ['x', 'y', 'z'];
      const middlePos = Object.assign({}, ...strings.map((c) => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [c]: start[c] + (end[c] - start[c]) / 2,
      })));

      Object.assign(sprite.position, middlePos);
    }}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    linkColor={(link: ExtendedLinkObject) =>
      path.find((el) => el.id === link.id) ? 'lime' : 'red'
    }
    linkDirectionalParticles={1}
    linkDirectionalArrowLength={3.5}
    linkDirectionalArrowRelPos={1}
    linkCurvature={0.2}
    linkWidth={1}
  />;
}

export default Graph;