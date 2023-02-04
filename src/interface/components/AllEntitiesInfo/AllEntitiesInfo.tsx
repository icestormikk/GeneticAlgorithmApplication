import React from 'react';
import {motion} from 'framer-motion';

interface AllEntitiesInfoProps {
  isOpen: boolean,
}

/**
 * A component that displays detailed information about the state of the graph
 * @param {boolean} isShown a parameter that determines whether the window
 * @constructor
 */
function AllEntitiesInfo({isOpen}: AllEntitiesInfoProps) {
  return (
    <motion.div
      initial={{
        x: '150%',
      }}
      animate={{
        x: isOpen ? '0' : '150%',
      }}
      transition={{
        duration: 0.5,
      }}
      className="absolute right-2 top-2"
    >
      <div className="bg-white p-2">
        <h1>Test</h1>
      </div>
    </motion.div>
  );
}

export default AllEntitiesInfo;
