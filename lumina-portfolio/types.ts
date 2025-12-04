// Extend the DOM interface for the experimental API
declare global {
  interface Document {
    startViewTransition(callback: () => Promise<void> | void): {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
      skipTransition: () => void;
    };
  }

  interface HTMLElement {
    // Experimental Scoped View Transition API
    startViewTransition(callback: () => Promise<void> | void): {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
      skipTransition: () => void;
    };
  }
  
  // CSS Properties extension for inline styles
  interface CSSStyleDeclaration {
    viewTransitionName?: string;
  }
}

export type ViewName = 'HOME' | 'WORK' | 'ABOUT' | 'PROJECT_DETAIL' | 'CONTACT';
export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface ViewState {
  currentView: ViewName;
  selectedProjectId?: string;
}

export interface NavigationProps {
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
}