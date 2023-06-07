import React, {ChangeEvent} from 'react';
import {AlgorithmType} from "../../../redux/extensions/enums/AlgorithmType";

interface ChooseAlgorithmPanelProps {
    setMode: React.Dispatch<React.SetStateAction<AlgorithmType>>
}

/**
 * ChooseAlgorithmPanel
 * @constructor
 */
function ChooseAlgorithmPanel({setMode}: ChooseAlgorithmPanelProps) {
    const onModeChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        setMode(event.target.value as AlgorithmType)
    }

    return (
        <div
            data-testid="ChooseAlgorithmPanel"
        >
            <b>Тип используемого алгоритма:</b>
            <div
                className="flex flex-col gap-2 bordered p-2 rounded-md bg-white"
            >
                <select name="algorithmType" id="algorithmType" onChange={onModeChange}>
                    {
                        Object.keys(AlgorithmType).map((key, index) => (
                            // @ts-ignore
                            <option key={index} value={key}>{AlgorithmType[key]}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}

export default ChooseAlgorithmPanel;
