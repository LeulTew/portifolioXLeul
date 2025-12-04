import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@leul.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-[90vh] max-w-5xl mx-auto pt-24 px-8 pb-40 flex flex-col justify-center">
      <div className="space-y-4">
        <span 
          className="block text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 waterfall-item"
        >
          Get in touch
        </span>
        
        <h1 
          className="text-6xl md:text-9xl font-black text-[var(--text-primary)] tracking-tighter mb-8"
          style={{ viewTransitionName: 'contact-title' } as React.CSSProperties}
        >
          Let's build<br />
          <span className="text-[var(--text-muted)]">together.</span>
        </h1>

        <div className="waterfall-item pt-8">
           <p className="text-xl text-[var(--text-secondary)] max-w-2xl mb-12">
             I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
           </p>

           <div 
             className="group relative inline-flex items-center gap-4 text-3xl md:text-5xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer border-b border-[var(--border-color)] pb-2 hover:border-[var(--accent)]"
             onClick={handleCopy}
           >
             <span>{email}</span>
             <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-12 top-1/2 -translate-y-1/2 p-2 bg-[var(--card-bg)] rounded-full border border-[var(--border-color)]">
                {copied ? <Check size={20} className="text-[var(--accent)]" /> : <Copy size={20} />}
             </div>
             {copied && (
                <span className="absolute left-0 -bottom-8 text-xs font-mono text-[var(--accent)] tracking-wider">
                  COPIED TO CLIPBOARD
                </span>
             )}
           </div>
        </div>

        <div className="flex gap-8 pt-20 waterfall-item">
           {[
             { label: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/LeulTew' },
             { label: 'LinkedIn', icon: <Linkedin size={24} />, url: '#' },
             { label: 'Twitter', icon: <Twitter size={24} />, url: '#' }
           ].map(social => (
             <a 
               key={social.label} 
               href={social.url}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
             >
               <span className="p-3 bg-[var(--card-bg)] rounded-full group-hover:bg-[var(--accent)] group-hover:text-black transition-colors">
                 {social.icon}
               </span>
               <span className="font-mono uppercase text-sm tracking-wider">{social.label}</span>
             </a>
           ))}
        </div>
      </div>
    </div>
  );
};