import React from 'react';
interface ObjectInfoProps {
  obj: any
}

/**
 * A component that displays all the keys and values of
 * the passed object <i>(with the exception of nested
 * ones)</i>
 * @constructor
 */
function ObjectInfo({obj}: ObjectInfoProps) {
  return (
    <>
      {
        Object.entries(obj).map(([key, value], index) => (
          <div key={index} className="flex flex-row justify-start items-center
          text-sm centered">
            <b className="px-1">{`${key}: `}</b>
            {
              typeof value === 'object' ? (
                <pre className="text-[0.8rem]">
                  {JSON.stringify(value, undefined, 1)}
                </pre>
              ) : (
                <span>{`${value}`}</span>
              )
            }
          </div>
        ))
      }
    </>
  );
}

export default ObjectInfo;
