import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Copy, Check, Linkedin, Send, MapPin, Clock, Loader2 } from 'lucide-react';
import { cvData } from '../../data/cv';

// Telegram SVG icon component
const TelegramIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  
  const email = cvData.contact.email;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Fallback to mailto if EmailJS not configured
      const subject = encodeURIComponent(`Message from ${formData.name}`);
      const body = encodeURIComponent(`${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setSending(true);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again or use email directly.');
      console.error('EmailJS error:', err);
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { label: 'Telegram', icon: <TelegramIcon size={22} />, url: 'https://t.me/fabbin' },
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
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
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
                name="reply_to"
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
                name="message"
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={5}
                className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {sending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : sent ? (
                <>
                  <Check size={18} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
          
          <p className="text-xs text-[var(--text-muted)] text-center mt-4">
            Your message will be sent directly to my inbox.
          </p>
        </div>
      </div>
    </div>
  );
};
