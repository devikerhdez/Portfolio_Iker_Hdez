import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Copy, Check, Send, Terminal, RefreshCw, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

type TerminalLine = {
  text: string;
  type: 'info' | 'success' | 'command';
};

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  
  // States: 'idle' | 'sending' | 'success'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const emailAddress = "devikerhdez@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTerminalLines([
      { text: `[sys@ihs-terminal ~]$ ./send_message.sh --from="${formData.name}"`, type: 'command' },
      { text: t('Contact.terminalInit') || 'Initializing secure connection...', type: 'info' }
    ]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Contacto Portfolio',
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      const logs = [
        { text: t('Contact.terminalPacking') || 'Packing encrypted data packets...', type: 'info' as const },
        { text: t('Contact.terminalRouting') || 'Routing via Resend cloud relay...', type: 'info' as const },
        { text: t('Contact.terminalSuccess') || 'Message transmitted successfully.', type: 'success' as const }
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setTerminalLines(prev => [...prev, log]);
          if (index === logs.length - 1) {
            setStatus('success');
          }
        }, (index + 1) * 600);
      });

    } catch (error) {
      console.error('Contact Error:', error);
      
      setTerminalLines(prev => [
        ...prev,
        { text: '[ERROR] Connection timeout. Transmission aborted.', type: 'info' },
        { text: '[SYS] Please try again or copy email address directly.', type: 'info' }
      ]);
      
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    setTerminalLines([]);
  };

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  return (
    <section id="contact" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative z-10 border-t border-white/5 bg-[#020202]">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#110000,transparent_70%)] pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <motion.h2 
              className="text-5xl sm:text-6xl md:text-8xl font-display text-white"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('Contact.title')}
            </motion.h2>
          </div>
          <p className="text-gray-400 font-mono text-sm max-w-sm md:text-right leading-relaxed">
            {t('Contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Info & Status */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Tagline */}
            <p className="text-gray-300 text-base leading-relaxed font-light">
              {t('Contact.tagline')}
            </p>

            {/* Pulsing Availability status card */}
            <div                   className="p-3 sm:p-5 bg-black/60 border border-white/5 hover:border-green-500/20 transition-colors duration-500 rounded flex items-center gap-3 sm:gap-4 relative overflow-hidden select-none group">
              <div className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-mono tracking-wider">STATUS_</span>
                <span className="text-sm font-semibold tracking-wide text-green-400 font-mono uppercase">
                  {t('Contact.status')}
                </span>
              </div>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              
              {/* Email Address with dynamic copy */}
              <div className="p-3 sm:p-5 bg-black/40 border border-white/5 hover:border-red-primary/30 transition-all duration-300 rounded flex items-center justify-between gap-3 sm:gap-4 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-red-primary/10 flex items-center justify-center text-red-primary group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block">{t('Contact.emailLabel')}</span>
                    <a href={`mailto:${emailAddress}`} className="text-sm text-gray-300 hover:text-white font-mono transition-colors">
                      {emailAddress}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 sm:px-3 py-1.5 border border-white/10 hover:border-red-primary/50 bg-white/5 hover:bg-red-primary/10 rounded text-xs font-mono tracking-widest text-gray-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 focus:outline-none shrink-0"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-green-400" />
                      <span className="text-green-400 hidden sm:inline">{t('Contact.copiedButton')}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="hidden sm:inline">{t('Contact.copyButton')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-3 sm:p-5 bg-black/40 border border-white/5 hover:border-red-primary/30 transition-all duration-300 rounded flex items-center gap-3 group">
                <div className="w-10 h-10 rounded bg-red-primary/10 flex items-center justify-center text-red-primary group-hover:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-mono block">
                    {t('Contact.locationLabel')} — <span className="text-[10px] text-gray-600 hidden sm:inline">28.2916° N, 16.6291° W</span>
                  </span>
                  <span className="text-sm text-gray-300 font-mono">
                    {t('Contact.locationValue')}
                  </span>
                </div>
              </div>
            </div>

            {/* Social profiles & Resume quick links */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 font-mono text-xs select-none">
              <a 
                href="https://github.com/devikerhdez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-white/5 bg-black/30 hover:border-red-primary/40 hover:bg-red-primary/5 text-gray-400 hover:text-white rounded text-center transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <FaGithub size={20} className="group-hover:scale-110 transition-transform" />
                <span>GITHUB</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/iker-hernandez-santana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-white/5 bg-black/30 hover:border-red-primary/40 hover:bg-red-primary/5 text-gray-400 hover:text-white rounded text-center transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <FaLinkedin size={20} className="group-hover:scale-110 transition-transform" />
                <span>LINKEDIN</span>
              </a>
              <a 
                href="/iker_cv.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-white/5 bg-black/30 hover:border-red-primary/40 hover:bg-red-primary/5 text-gray-400 hover:text-white rounded text-center transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <FileText size={20} className="group-hover:scale-110 transition-transform" />
                <span>CV</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interaction Form or Terminal Sequence */}
          <div className="lg:col-span-7">
            
            <AnimatePresence mode="wait">
              {status === 'idle' ? (
                
                // standard form view
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs text-zinc-100 font-mono font-bold uppercase tracking-wider block">
                        {t('Contact.formName')} <span className="text-red-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/20 hover:border-white/40 focus:border-white rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 font-mono"
                        placeholder="Iker Hdez"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs text-zinc-100 font-mono font-bold uppercase tracking-wider block">
                        {t('Contact.formEmail')} <span className="text-red-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/20 hover:border-white/40 focus:border-white rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 font-mono"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Subject input */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs text-zinc-100 font-mono font-bold uppercase tracking-wider block">
                      {t('Contact.formSubject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/20 hover:border-white/40 focus:border-white rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 font-mono"
                      placeholder="Project Partnership"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs text-zinc-100 font-mono font-bold uppercase tracking-wider block">
                      {t('Contact.formMessage')} <span className="text-red-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-black/60 border border-white/20 hover:border-white/40 focus:border-white rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 font-mono resize-none"
                      placeholder="..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 border border-white/20 hover:border-red-primary bg-white/5 hover:bg-red-primary/20 text-white font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group select-none focus:outline-none"
                  >
                    <span>{t('Contact.formSubmit')}</span>
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </motion.form>

              ) : (

                // Cyber terminal sending screen
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#030303] border border-red-primary/20 rounded shadow-[0_0_30px_rgba(204,0,0,0.1)] relative overflow-hidden font-mono flex flex-col min-h-[400px]"
                >
                  {/* CRT Scanline Visual Layer */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] z-20" />
                  
                  {/* Terminal Header */}
                  <div className="px-4 py-3 bg-[#0d0d0d] border-b border-white/5 flex items-center justify-between text-xs text-gray-500 z-10 select-none">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-red-primary animate-pulse" />
                      <span className="tracking-wider uppercase">{t('Contact.terminalHeader')}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-red-primary/40 animate-ping"></span>
                    </div>
                  </div>

                  {/* Terminal Logs Output */}
                  <div className="p-6 flex-grow space-y-3 overflow-y-auto text-xs md:text-sm leading-relaxed z-10">
                    {terminalLines.map((line, idx) => (
                      <div 
                        key={idx} 
                        className={`${
                          line.type === 'command' ? 'text-gray-300' :
                          line.type === 'success' ? 'text-green-400 font-bold bg-green-500/5 p-3 border border-green-500/10 rounded' :
                          'text-red-primary/80'
                        }`}
                      >
                        {line.text}
                      </div>
                    ))}
                    
                    {status === 'sending' && (
                      <div className="text-red-primary/50 animate-pulse flex items-center gap-1.5 select-none">
                        <span>&gt; Connecting</span>
                        <span className="inline-block w-1.5 h-3 bg-red-primary animate-[blink_1s_infinite]"></span>
                      </div>
                    )}

                    <div ref={terminalBottomRef} />
                  </div>

                  {/* Terminal Footer Reset Button */}
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#0d0d0d] border-t border-white/5 z-10"
                    >
                      <button
                        onClick={handleReset}
                        className="px-4 py-2.5 border border-white/10 hover:border-red-primary bg-white/5 hover:bg-red-primary/10 rounded text-xs text-gray-400 hover:text-white transition-all flex items-center gap-2 cursor-pointer focus:outline-none"
                      >
                        <RefreshCw size={12} />
                        <span>{t('Contact.terminalReset')}</span>
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}