import React from 'react';
import {IoIosLink} from 'react-icons/io';
import {TfiUnlink} from 'react-icons/tfi';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {generateUUID} from 'three/src/math/MathUtils';
import {addLink, removeLink} from '../../redux/slicers/linkSlice';
import {setSelectedNodes} from '../../redux/slicers/nodeSlice';
import {LinkEntity} from '../../../geneticAlgorithm/domain/graph/LinkEntity';

const isLinkExist = (
    links: Array<LinkEntity<unknown>>, startNodeId: number, endNodeId: number,
): boolean => {
    return links.find((el) =>
        el.source === startNodeId && el.target === endNodeId,
    ) !== undefined;
};

/**
 * A component that directly contains the actions
 * available over the selected nodes
 * @constructor
 */
function LinkActions() {
    const dispatch = useAppDispatch();
    const selectedNodes = useAppSelector((state) => state.nodes.selectedItems);
    const links = useAppSelector((state) => state.links.items);
    const allowedActionColor = 'text-green-500';
    const prohibitedActionColor = 'text-red-500';

    const isLinkExists = React.useMemo(() => {
        if (selectedNodes.length < 2) {
            return false;
        }
        return isLinkExist(links, selectedNodes[0].id, selectedNodes[1].id);
    }, [links, selectedNodes]);

    const handleLinkAdding = React.useCallback(
        () => {
            const startNodeId = selectedNodes[0].id;
            const endNodeId = selectedNodes[1].id;
            const newLink = {
                id: generateUUID(),
                source: startNodeId,
                target: endNodeId,
                label: `${selectedNodes[0].label} -> ${selectedNodes[1].label}`,
                value: {
                    distance: 1,
                    cost: 1
                },
            };

            dispatch(addLink(newLink));
            dispatch(setSelectedNodes([]));
        },
        [selectedNodes],
    );

    const handleLinkDeleting = React.useCallback(
        () => {
            const link = links.find((el) =>
                el.source === selectedNodes[0].id &&
                el.target === selectedNodes[1].id,
            );
            if (!link) {
                return;
            }

            dispatch(removeLink(link.id));
            dispatch(setSelectedNodes([]));
        },
        [links, selectedNodes],
    );

    return (
        <div className="p-2 centered gap-4">
            <span>{selectedNodes[0]?.label}</span>
            <div className="centered">
                <button
                    type="button"
                    disabled={isLinkExists}
                    className={
                        isLinkExists ? prohibitedActionColor : allowedActionColor
                    }
                    onClick={() => handleLinkAdding()}
                >
                    <IoIosLink className="text-2xl"/>
                </button>
                <button
                    type="button"
                    disabled={!isLinkExists}
                    className={
                        isLinkExists ? allowedActionColor : prohibitedActionColor
                    }
                    onClick={() => handleLinkDeleting()}
                >
                    <TfiUnlink className="text-2xl"/>
                </button>
            </div>
            <span>{selectedNodes[1]?.label}</span>
        </div>
    );
}

export default LinkActions;
