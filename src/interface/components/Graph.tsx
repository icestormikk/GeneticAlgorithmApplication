/* eslint-disable @typescript-eslint/ban-ts-comment */
// noinspection TypeScriptValidateTypes

import React from 'react';
import ForceGraph from 'react-force-graph-3d';
import {generateUUID} from 'three/src/math/MathUtils';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {ReduxNodeObject} from '../redux/extensions/ReduxNodeObject';
import {ReduxLinkObject} from '../redux/extensions/ReduxLinkObject';
import {
  getRandomNumber,
} from '../../geneticAlgorithm/functions/arrayhelper';
import SpriteText from 'three-spritetext';
import {ExtendedNodeObject} from '../redux/extensions/ExtendedNodeObject';
import {ExtendedLinkObject} from '../redux/extensions/ExtendedLinkObject';
import {beautify, buildNameFromUUID} from '../utils/helpers';
import {addNode, select} from '../redux/slicers/nodeSlice';
import {addLink} from '../redux/slicers/linkSlice';

export const createNewLink = (
    fromNode: ReduxNodeObject, toNode: ReduxNodeObject,
) : ReduxLinkObject => {
  return {
    id: generateUUID(),
    source: fromNode.id,
    target: toNode.id,
    label: `${fromNode.label} -> ${toNode.label}`,
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
    isAdditionalElementsShow, foundPath,
  } = useAppSelector((state) => state.graph);
  const links = useAppSelector((state) => state.links.items);
  const nodes = useAppSelector((state) => state.nodes.items);
  const selectedNodes = useAppSelector((state) => state.nodes.selectedItems
      .map((el) => JSON.parse(JSON.stringify(el))),
  );
  const suitableLinks = React.useMemo(
      () => {
        if (!foundPath) {
          return undefined;
        }

        const result: Array<ExtendedLinkObject> = [];
        for (let i = 0; i < foundPath.length - 1; i++) {
          const item = links.find((el) =>
            el.source === foundPath[i] && el.target === foundPath[i + 1],
          );

          if (item) {
            result.push(item);
          }
        }

        return result;
      },
      [links, foundPath],
  );

  const initData = React.useMemo(() => {
    const refactoredNodes = nodes.map((el) =>
      JSON.parse(JSON.stringify(el)),
    );
    const refactoredLinks = links.map((el) =>
      JSON.parse(JSON.stringify(el)),
    );
    return {nodes: refactoredNodes, links: refactoredLinks};
  }, [nodes, links]);

  const handleNodeRightClick = async (node: ReduxNodeObject) => {
    const uuid = generateUUID();
    const newNode = {
      id: uuid,
      label: `node-${buildNameFromUUID(uuid)}`,
    };
    const newLinks = [
      createNewLink(node, newNode),
      createNewLink(newNode, node),
    ];

    await Promise.all(
        [
          dispatch(addNode(newNode)),
          dispatch(addLink(newLinks[0])),
          dispatch(addLink(newLinks[1])),
        ],
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
    // @ts-ignore
    nodeLabel={(node: ExtendedNodeObject) => node.label }
    // @ts-ignore
    onNodeRightClick={(node: ExtendedNodeObject) =>
      handleNodeRightClick(node)
    }
    // @ts-ignore
    onNodeClick={(node: ExtendedNodeObject) => handleNodeLeftClick(node)}
    linkThreeObjectExtend={true}
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
    // @ts-ignore
    linkPositionUpdate={(sprite, {start, end}) => {
      const strings: [string, string, string] = ['x', 'y', 'z'];
      const middlePos = Object.assign({}, ...strings.map((c) => ({
        // @ts-ignore
        [c]: start[c] + (end[c] - start[c]) / 2,
      })));

      Object.assign(sprite.position, middlePos);
    }}
    linkDirectionalParticles={1}
    linkDirectionalArrowLength={3.5}
    linkDirectionalArrowRelPos={1}
    linkCurvature={0.2}
    linkWidth={0.5}
    // @ts-ignore
    linkColor={(link: ExtendedLinkObject) => {
      if (!suitableLinks) {
        return 'red';
      }

      const isSuitable = suitableLinks.find((el) =>
        link.id === el.id,
      );

      return isSuitable ? 'green' : 'red';
    }}
  />;
}

export default Graph;
