import React, {FormEvent} from 'react';

/**
 * GenerateRandomFullGraph
 * @constructor
 */
function GenerateRandomFullGraph() {
    const onCreate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            size: {value: number}
        }


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
