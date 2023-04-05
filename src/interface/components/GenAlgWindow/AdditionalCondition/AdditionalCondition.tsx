import React from 'react';
import {ImCheckmark, ImWarning} from 'react-icons/im';

interface AdditionalConditionProps {
    content: JSX.Element,
    condition: () => boolean,
}

/**
 * A component that displays the status of the condition passed
 * in the parameters and changes according to its value
 * @param {JSX.Element} content component content
 * @param {boolean} condition the condition whose state the component
 * will monitor
 * @constructor
 */
function AdditionalCondition({content, condition}: AdditionalConditionProps) {
    return (
        <div
            className="flex justify-start items-center flex-row gap-2 relative p-1
      rounded-md mb-2"
            data-testid="AdditionalCondition"
        >
            <div className={`text-[1.5rem] p-1.5 rounded-md text-white
      ${condition() ? 'bg-green-500' : 'bg-red-500'}`}>
                {
                    condition() ? (<ImCheckmark/>) : (<ImWarning/>)
                }
            </div>
            <div className="flex flex-col">
                <b>Обязательное условие:</b>
                {content}
            </div>
        </div>
    );
}

export default AdditionalCondition;
