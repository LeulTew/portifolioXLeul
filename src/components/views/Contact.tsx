import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin, Send, MapPin, Clock } from 'lucide-react';
import { cvData } from '../../data/cv';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const email = cvData.contact.email;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with form data
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const socials = [
    { label: 'GitHub', icon: <Github size={22} />, url: cvData.contact.social.github },
    { label: 'LinkedIn', icon: <Linkedin size={22} />, url: cvData.contact.social.linkedin },
  ];

  return (
    <div className="w-full min-h-screen max-w-7xl mx-auto pt-20 px-4 md:px-8 pb-40">
      {/* Header */}
      <div className="mb-16">
        <span className="inline-block text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4">
          Get in touch
        </span>
        
        <h1 
          className="text-5xl sm:text-6xl md:text-8xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9] mb-6"
          style={{ viewTransitionName: 'contact-title' } as React.CSSProperties}
        >
          Let's build<br />
          <span className="text-[var(--text-muted)]">something great.</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl">
          I'm currently open to new opportunities. Whether you have a project in mind, 
          a question, or just want to say hi — I'd love to hear from you!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column - Contact Info */}
        <div className="space-y-10">
          {/* Email Card */}
          <div 
            className="group relative p-6 md:p-8 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--accent)] transition-all cursor-pointer"
            onClick={handleCopy}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                <Mail size={24} className="text-[var(--accent)]" />
              </div>
              <div className="p-2 bg-[var(--hover-bg)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? <Check size={18} className="text-[var(--accent)]" /> : <Copy size={18} />}
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2">Email me at</p>
            <p className="text-xl md:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors break-all">
              {email}
            </p>
            {copied && (
              <span className="absolute bottom-4 right-6 text-xs font-mono text-[var(--accent)] animate-pulse">
                Copied!
              </span>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl">
              <MapPin size={20} className="text-[var(--accent)] mb-3" />
              <p className="text-sm text-[var(--text-muted)] mb-1">Location</p>
              <p className="font-medium text-[var(--text-primary)]">{cvData.contact.location}</p>
            </div>
            <div className="p-5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl">
              <Clock size={20} className="text-[var(--accent)] mb-3" />
              <p className="text-sm text-[var(--text-muted)] mb-1">Response Time</p>
              <p className="font-medium text-[var(--text-primary)]">Within 24 hours</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-4">Connect with me</p>
            <div className="flex gap-3">
              {socials.map(social => (
                <a 
                  key={social.label} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group"
                >
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    {social.icon}
                  </span>
                  <span className="font-medium text-[var(--text-primary)] text-sm">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="p-6 md:p-8 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Send a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={5}
                className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
          
          <p className="text-xs text-[var(--text-muted)] text-center mt-4">
            This will open your email client with the message pre-filled.
          </p>
        </div>
      </div>
    </div>
  );
};
