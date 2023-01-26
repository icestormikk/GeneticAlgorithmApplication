import React from 'react';

interface ObjectInfoProps {
    obj: any,
}

/**
 * A component to display all the properties of an object
 * @param {any} obj the object whose properties should be displayed
 * @constructor
 */
function ObjectInfo({obj}: ObjectInfoProps) {
  return (
    <ul className="ml-3 font-light text-sm">
      {
        Object.entries(obj).map(([key, value], index) => (
          <li key={index} className="flex gap-2">
            <b>{`${key}: `}</b>
            {
              typeof value === 'object' ? (
                <ObjectInfo obj={value}/>
              ) : (
                <span>{`${value}`}</span>
              )
            }
          </li>
        ))
      }
    </ul>
  );
}

export default ObjectInfo;
