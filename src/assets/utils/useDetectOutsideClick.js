import { useState, useEffect } from 'react';

/**
 * Hook for handling closing when clicking outside of an refer
 * @param {React.node} refer
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (refer, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      // If the active refer exists and is clicked outside of
      if (refer.current !== null && !refer.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, refer]);

  return [isActive, setIsActive];
};
