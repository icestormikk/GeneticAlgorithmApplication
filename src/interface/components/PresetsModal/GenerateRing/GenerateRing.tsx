import React, {FormEvent} from 'react';
import {NodeEntity} from "../../../../geneticAlgorithm/domain/graph/NodeEntity";
import {LinkEntity} from "../../../../geneticAlgorithm/domain/graph/LinkEntity";
import {useAppDispatch} from "../../../redux/hooks";
import {setNodes} from "../../../redux/slicers/nodeSlice";
import {setLinks} from "../../../redux/slicers/linkSlice";
import {setPath} from "../../../redux/slicers/graphSlice";

/**
 * GenerateRing
 * @constructor
 */
function GenerateRing() {
    const dispatch = useAppDispatch()

    const generateRingGraph = async (size: number) => {
        const nodes = [...Array(size).keys()].map((i) =>
            new NodeEntity(`Node-${i}`)
        )
        const links: Array<LinkEntity<any>> = []
        const addToLinks = (from: string, to: string) => {
            links.push(
                new LinkEntity(
                    from,
                    to,
                    {distance: Math.round(Math.random() * 100), cost: Math.round(Math.random() * 100)}
                )
            )
        }

        console.log(nodes)

        for (let i = 0; i < nodes.length; i++) {
            if (i === nodes.length - 1) {
                addToLinks(nodes[0].id, nodes[nodes.length - 1].id)
                break
            }
            addToLinks(nodes[i].id, nodes[i + 1].id)
        }

        return {nodes, links}
    }

    const onCreate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            ringSize: {value: number}
        }

        const {nodes, links} = await generateRingGraph(Number(target.ringSize.value))
        dispatch(setNodes(nodes))
        dispatch(setLinks(
            links.map((link) => {
                return {
                    id: link.id,
                    source: link.source,
                    target: link.target,
                    label: `${link.source} -> ${link.target}`,
                    value: link.value
                }
            })
        ))
        dispatch(setPath(undefined))
    }

    return (
        <form
            onSubmit={onCreate}
            className="flex flex-col justify-start items-start"
            data-testid="GenerateRing"
        >
            <label htmlFor="ringSize" className="flex flex-row gap-2 items-center">
                Размер кольца:
                <input
                    id="ringSize"
                    name="ringSize"
                    type="number"
                    min={3}
                    step={1}
                    className="px-2 py-0.5"
                />
            </label>
            <button
                type="submit"
                className="submit-button"
            >
                Создать кольцо
            </button>
        </form>
    );
}

export default GenerateRing;
