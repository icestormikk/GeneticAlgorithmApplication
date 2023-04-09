import React from 'react';
import {PathInfo} from "../../../redux/extensions/PathInfo";
import {useAppSelector} from "../../../redux/hooks";

interface PathInfoPanelProps {
    pathInfo: PathInfo<number>
}

/**
 * PathInfoPanel
 * @constructor
 */
function PathInfoPanel({pathInfo}: PathInfoPanelProps) {
    const nodesInGraph = useAppSelector((state) => state.nodes)
    return (
        <table
            className="found-path-table"
            data-testid="PathInfoPanel"
        >
            <thead>
                <span>Результаты вычислений</span>
            </thead>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Label</th>
                </tr>
                {
                    pathInfo.nodes.map((node) => (
                        <tr>
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
            <span>Общая длина: <b>{pathInfo.totalLength}</b></span>
        </table>
    );
}

export default PathInfoPanel;
