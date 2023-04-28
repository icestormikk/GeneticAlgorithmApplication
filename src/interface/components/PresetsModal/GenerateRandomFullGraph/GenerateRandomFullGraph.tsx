import React, {FormEvent} from 'react';
import {useAppDispatch} from "../../../redux/hooks";
import {setLinks} from "../../../redux/slicers/linkSlice";
import {setNodes} from "../../../redux/slicers/nodeSlice";
import {setPath} from "../../../redux/slicers/graphSlice";
import {Graph} from "../../../../geneticAlgorithm/domain/graph/Graph";

/**
 * GenerateRandomFullGraph
 * @constructor
 */
function GenerateRandomFullGraph() {
    const dispatch = useAppDispatch()

    const onCreate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            size: {value: number}
        }
        if (target.size.value < 2) { return }

        const graph = Graph.createRandomGraph(Number(target.size.value))
        dispatch(
            setLinks(
                graph.links.map((link) => {
                    return {
                        id: link.id,
                        source: link.source,
                        target: link.target,
                        label: `${link.source} -> ${link.target}`,
                        value: link.value
                    }
                })
            )
        )
        dispatch(setNodes(graph.nodes))
        dispatch(setPath(undefined))
    }

    return (
        <form
            onSubmit={onCreate}
            className="flex flex-col justify-start items-start"
            data-testid="GenerateRandomFullGraph"
        >
            <label htmlFor="size" className="flex flex-row gap-2 items-center">
                Размер нового графа:
                <input
                    id="size"
                    name="size"
                    type="number"
                    min={2}
                    step={1}
                    className="px-2 py-0.5"
                />
            </label>
            <button
                type="submit"
                className="submit-button"
            >
                Создать граф
            </button>
        </form>
    );
}

export default GenerateRandomFullGraph;
