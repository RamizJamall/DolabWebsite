import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const {pathname}= useLocation(); // Get the current route path

  useEffect(() => {
    
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Trigger on route path changes

  return null;
}

export default ScrollToTop;