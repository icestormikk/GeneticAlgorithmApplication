import React from 'react';
import ModalWindow from "../ModalWindow/ModalWindow.lazy";
import GenerateRandomFullGraph from "./GenerateRandomFullGraph/GenerateRandomFullGraph.lazy";
import GenerateRing from "./GenerateRing/GenerateRing.lazy";

interface PresetsModalProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * PresetsModal
 * @constructor
 */
function PresetsModal({isOpen, setIsOpen}: PresetsModalProps) {
    const menu = React.useMemo(
        () => {
            return [
                {
                    title: 'Создать полный граф',
                    element: <GenerateRandomFullGraph/>
                },
                {
                    title: 'Создать кольцевой граф',
                    element: <GenerateRing/>
                }
            ]
        },
        []
    )

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
                    {
                        menu.map((elem, index) => (
                            <React.Fragment key={index}>
                                <b>{elem.title}</b>
                                {elem.element}
                            </React.Fragment>
                        ))
                    }
                </div>
            )}
        />
    );
}

export default PresetsModal;
