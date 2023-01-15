import React from 'react';
import ForceGraph from 'react-force-graph-3d';

const genRandomTree = (N: number, reverse: boolean) => {
  return {
    nodes: Array.from(Array(N).keys()).map((i) => ({id: i})),
    links: Array.from(Array(N).keys())
        .filter((id) => id)
        .map((id) => ({
          [reverse ? 'target' : 'source']: id,
          [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
        })),
  };
};

interface GraphProps {
    nodesCount: number
}

/**
 * A component for displaying the resulting graph and
 * manipulating its components (vertices and edges)
 * @param {GraphProps} props dasddasd
 * @constructor
 */
function Graph(props: GraphProps): JSX.Element {
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);
  const data = genRandomTree(props.nodesCount, false);
  const fgRef = React.useRef();

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);

  return (
    <div>
      <ForceGraph
        ref={fgRef}
        graphData={data}
        linkDirectionalParticleColor={() => 'red'}
        linkDirectionalParticleWidth={6}
        linkHoverPrecision={10}
        onLinkClick={(link) => console.log(link)}
        width={width}
        height={height}
      />
    </div>
  );
}

export default Graph;
