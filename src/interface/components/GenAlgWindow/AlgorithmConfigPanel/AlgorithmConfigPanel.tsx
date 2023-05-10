import React from 'react';

export type Config = {
    crossoverRate: number,
    mutationRate: number,
    populationSize: number,
    generationsCount: number
}

interface AlgorithmConfigPanelProps {
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>
}

/**
 * AlgorithmConfigPanel
 * @constructor
 */
function AlgorithmConfigPanel({config, setConfig}: AlgorithmConfigPanelProps) {
    const fields: Array<{
        id: string, title: string, key: keyof Config, min?: number, max?: number, step?: number
    }> = React.useMemo(
        () => {
            return [
                {
                    id: "crossoverRate",
                    title: "Вероятность кроссинговера",
                    key: "crossoverRate",
                    min: 0, max: 1,
                },
                {
                    id: "mutRate",
                    title: "Вероятность мутации",
                    key: "mutationRate",
                    min: 0, max: 1,
                },
                {
                    id: "popSize",
                    title: "Размер популяции",
                    key: "populationSize",
                    min: 0, step: 1
                },
                {
                    id: "genCount",
                    title: "Макс. кол-во поколений",
                    key: "generationsCount",
                    min: 0, step: 1
                }
            ]
        },
        [config]
    )

    return (
        <div>
            <b>Конфигурация алгоритма</b>
            <div
                className="p-2 flex flex-col gap-2 bg-white rounded-md bordered"
                data-testid="AlgorithmConfigPanel"
            >
                {
                    fields.map((field, index) => (
                        <label key={index} htmlFor={field.id} className="flex flex-row gap-2 justify-between">
                            <b>{field.title}</b>
                            <input
                                type="number"
                                className="py-0.5 px-1"
                                id={field.id} name={field.id}
                                onChange={(event) => {
                                    setConfig(prevState => {
                                        prevState[field.key] = Number(event.target.value)
                                        return {...prevState}
                                    })
                                }}
                                defaultValue={config[field.key]}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                            />
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default AlgorithmConfigPanel;
