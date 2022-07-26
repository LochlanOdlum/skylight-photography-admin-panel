import { useEffect } from 'react';

//Idea is takes an element ref. and callback. When user clicks outside of this element on the page, then callback is run.
//could be used for example to run a function to close a modal when user clicks outside of it,
const useOnClickOutsideElement = (elementRef, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      //if modal isn't open

      if (!elementRef.current || elementRef.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line
  }, [elementRef]);
};

export default useOnClickOutsideElement;
