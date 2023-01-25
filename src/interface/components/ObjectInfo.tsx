import React from 'react';

interface ObjectInfoProps {
    obj: any,
}

/**
 * Object Info
 * @param {any} obj object
 * @constructor
 */
function ObjectInfo({obj}: ObjectInfoProps) {
  return (
    <ul className="ml-3 font-light text-sm">
      {
        Object.entries(obj).map(([key, value], index) => (
          <li key={index} className="flex gap-2">
            <b>{`${key}: `}</b>
            <span>{`${value}`}</span>
          </li>
        ))
      }
    </ul>
  );
}

export default ObjectInfo;
