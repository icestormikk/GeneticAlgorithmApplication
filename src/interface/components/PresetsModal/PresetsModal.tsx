import React from 'react';
import ModalWindow from "../ModalWindow/ModalWindow.lazy";
import GenerateRandomFullGraph from "./GenerateRandomFullGraph/GenerateRandomFullGraph.lazy";

interface PresetsModalProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * PresetsModal
 * @constructor
 */
function PresetsModal({isOpen, setIsOpen}: PresetsModalProps) {
    return (
        <ModalWindow
            data-testid="PresetsModal"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={(
                <span>Загрузка шаблонов</span>
            )}
            content={(
                <div className="flex flex-col justify-start items-start">
                    <GenerateRandomFullGraph/>
                </div>
            )}
        />
    );
}

export default PresetsModal;
