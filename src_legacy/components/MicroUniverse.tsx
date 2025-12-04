import React, { useState } from 'react';
import { flushSync } from 'react-dom';

export const MicroUniverse: React.FC = () => {
  const [status, setStatus] = useState<'playing' | 'paused' | 'idle'>('idle');
  const widgetRef = React.useRef<HTMLDivElement>(null);

  const toggleStatus = () => {
    const widget = widgetRef.current as any;
    
    if (widget?.startViewTransition) {
      widget.startViewTransition(() => {
        flushSync(() => {
          setStatus(prev => prev === 'playing' ? 'paused' : 'playing');
        });
      });
    } else {
      setStatus(prev => prev === 'playing' ? 'paused' : 'playing');
    }
  };

  return (
    <div 
      ref={widgetRef}
      className={`micro-universe-widget ${status}`}
      onClick={toggleStatus}
      style={{ viewTransitionName: 'micro-universe' }}
    >
      <div className="status-indicator" />
      <span className="status-text">
        {status === 'playing' ? 'Now Playing' : status === 'paused' ? 'Paused' : 'Idle'}
      </span>
    </div>
  );
};
