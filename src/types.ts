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
  
  // CSS Properties extension for in// declare module 'react' {
//   interface CSSProperties {
//     viewTransitionName?: string;
//   }
// }
}

export type ViewName = 'HOME' | 'WORK' | 'ABOUT' | 'CONTACT' | 'PROJECT_DETAIL';
export type Theme = 'light' | 'dark';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  tech: string;
  image: string;
  githubUrl: string;
  demoUrl?: string;
  categories: string[];
}

export interface ViewState {
  currentView: ViewName;
  selectedProjectId?: string;
}

export interface NavigationProps {
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
}