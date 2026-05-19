import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import VideoPreviewModal from './VideoPreviewModal';

import cafeVideo from '../assets/Demo-caf.hevc.mp4';
import crmVideo from '../assets/demo-crm-lugar.hevc.mp4';
import agendaVideo from '../assets/demo-dagenda.hevc.mp4';

interface Project {
  id: number;
  name: string;
  description: string;
  stack: string[];
  year: string;
  github?: string;
  live?: string;
  preview?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const videoMap: Record<string, string> = {
  'Demo-caf.hevc.mp4': cafeVideo,
  'demo-crm-lugar.hevc.mp4': crmVideo,
  'demo-dagenda.hevc.mp4': agendaVideo,
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = project.preview && project.preview in videoMap ? videoMap[project.preview] : undefined;
  const videoSrc = isVideo || '';
  const isPortfolioSpecial = project.preview === 'portfolio_special';

  useEffect(() => {
    if (!videoRef.current || !isVideo) return;
    if (isHovered) {
      videoRef.current.play().catch(err => {
        console.log("Hover video play error:", err);
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, isVideo]);

  return (
    <motion.div 
      className="bg-[#050505] border border-white/5 hover:border-red-primary/50 transition-all duration-500 overflow-hidden group flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Media Preview Container */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (isVideo) {
            setIsModalOpen(true);
          }
        }}
        className={`relative aspect-video overflow-hidden border-b border-white/5 group-hover:border-red-primary/30 transition-colors duration-500 ${
          isVideo ? 'cursor-pointer' : ''
        }`}
        role={isVideo ? 'button' : undefined}
        tabIndex={isVideo ? 0 : undefined}
        onKeyDown={(e) => {
          if (isVideo && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        {isPortfolioSpecial ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-black via-zinc-950 to-red-primary/10 relative overflow-hidden group/portfolio">
            {/* Ambient Red glow background */}
            <div className="absolute inset-0 bg-red-primary/5 opacity-0 group-hover/portfolio:opacity-100 transition-opacity duration-700 blur-2xl" />
            
            {/* Stylized glitched text box */}
            <motion.div 
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center z-10 px-5 py-3 border border-red-primary/20 bg-black/80 rounded backdrop-blur-sm shadow-xl group-hover/portfolio:border-red-primary/40 transition-colors"
            >
              <h4 className="text-red-primary text-lg md:text-xl font-display tracking-widest mb-1 font-bold animate-pulse">
                {t('Projects.alreadyHere')}
              </h4>
              <p className="text-gray-500 text-[9px] uppercase tracking-wider font-mono">
                portfolio.exe
              </p>
            </motion.div>

            {/* Micro-animations lines on hover */}
            <div className="absolute inset-x-0 h-px bg-red-primary/20 top-1/4 group-hover/portfolio:translate-x-full transition-transform duration-1000 ease-in-out" />
            <div className="absolute inset-x-0 h-px bg-red-primary/20 bottom-1/4 group-hover/portfolio:-translate-x-full transition-transform duration-1000 ease-in-out" />
          </div>
        ) : isVideo ? (
          <div className="relative w-full h-full">
            <video 
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 bg-[#080808] scale-100 group-hover:scale-105"
            />
            {/* Play/Preview hover overlay indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="px-3 py-1.5 bg-red-primary/95 text-white font-mono text-[10px] uppercase tracking-widest font-bold shadow-lg border border-red-primary/50">
                Click to Preview
              </span>
            </div>
          </div>
        ) : (
          <img 
            src={project.preview || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"} 
            alt={project.name}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100 bg-[#080808]"
          />
        )}
      </div>

      {/* Project Card Text Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-6 md:p-8 relative z-10 bg-[#050505]">
        <h3 className="text-2xl md:text-3xl font-display mb-4 text-white group-hover:text-red-primary transition-colors tracking-wide">
          {project.name}
        </h3>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors font-mono mb-4 focus:outline-none w-fit cursor-pointer"
        >
          {expanded ? t('Projects.viewLess') : t('Projects.viewMore')}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} className="text-red-primary" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-6 flex flex-col gap-4">
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-red-primary/10 border border-red-primary/30 text-red-primary text-[10px] tracking-widest font-mono uppercase">
                      {tech}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] tracking-widest font-mono uppercase ml-auto">
                    {project.year}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-widest uppercase font-mono text-white hover:text-red-primary transition-colors group/btn cursor-pointer"
            >
              <FaGithub size={16} className="group-hover/btn:scale-110 transition-transform" /> {t('Projects.repo')}
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-widest uppercase font-mono text-red-primary hover:text-red-glow transition-colors group/btn ml-auto cursor-pointer"
            >
              <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform" /> {t('Projects.live')}
            </a>
          )}
        </div>
      </div>

      {/* Gmail Video Preview Modal */}
      {isVideo && (
        <VideoPreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoSrc={videoSrc}
          projectName={project.name}
          fileName={project.preview || ''}
        />
      )}
    </motion.div>
  );
}
