import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

// Helper to handle Scoped View Transitions with React Router
export const useScopedTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = async (to: string, scopeSelector: string = '#main-stage') => {
    const scope = document.querySelector(scopeSelector);
    
    // Fallback if browser doesn't support startViewTransition or scope not found
    if (!scope || !('startViewTransition' in scope)) {
      navigate(to);
      return;
    }

    // @ts-ignore - Experimental API
    scope.startViewTransition(() => {
      // Force synchronous update so the DOM changes *within* the callback
      flushSync(() => {
        navigate(to);
      });
    });
  };

  return navigateWithTransition;
};
