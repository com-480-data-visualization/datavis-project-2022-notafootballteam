import { useEffect, useState } from "react";

const useResizeObserver = ref => { // the ref of the DOM element we are observing
  const [dimensions, setDimensions] = useState(null); 
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => { // clean up function
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions; // width and a height set by the resize observer
};

export default useResizeObserver;