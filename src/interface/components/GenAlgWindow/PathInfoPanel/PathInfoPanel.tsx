import React from 'react';
import {PathInfo} from "../../../redux/extensions/PathInfo";
import {useAppSelector} from "../../../redux/hooks";

interface PathInfoPanelProps {
    pathInfo: PathInfo<any>
}

/**
 * A component that displays the result of the shortest path
 * in the graph found by the algorithm, in the form of a table
 * @param {PathInfo} pathInfo
 * @constructor
 */
function PathInfoPanel({pathInfo}: PathInfoPanelProps) {
    const nodesInGraph = useAppSelector((state) => state.nodes)
    return (
        <>
            <table
                className="found-path-table"
                data-testid="PathInfoPanel"
            >
                <thead>
                    <tr>
                        <td>Результаты вычислений</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                    </tr>
                    {
                        pathInfo.nodes.map((node, index) => (
                            <tr key={index}>
                                <td>{node}</td>
                                <td>
                                    {
                                        nodesInGraph.items.find((el) => el.id === node)?.label
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                pathInfo.totalLength !== undefined && (
                    <table className="found-path-table">
                        <tbody>
                            <tr>
                                <th>Параметр</th>
                                <th>Значение</th>
                            </tr>
                            {
                                Object.keys(pathInfo.totalLength).map((key) => (
                                    <tr>
                                        <td>{key}</td>
                                        <td>{pathInfo.totalLength[key]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </>
    );
}

export default PathInfoPanel;
