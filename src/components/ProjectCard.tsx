import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-[#050505] border border-white/5 hover:border-red-primary/50 transition-all duration-500 overflow-hidden group flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="relative aspect-video overflow-hidden border-b border-white/5 group-hover:border-red-primary/30 transition-colors duration-500">
        {project.preview && project.preview.includes('http') && !project.preview.includes('.png') && !project.preview.includes('.jpg') ? (
          <iframe 
            src={project.preview} 
            className="w-full h-full object-cover pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-[#111]"
            title={`${project.name} preview`}
            loading="lazy"
          />
        ) : (
          <img 
            src={project.preview || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"} 
            alt={project.name}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
          />
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-8 relative z-10 bg-[#050505]">
        <h3 className="text-2xl md:text-3xl font-display mb-4 text-white group-hover:text-red-primary transition-colors tracking-wide">
          {project.name}
        </h3>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors font-mono mb-4 focus:outline-none w-fit cursor-none"
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
              className="flex items-center gap-2 text-xs tracking-widest uppercase font-mono text-white hover:text-red-primary transition-colors group/btn cursor-none"
            >
              <FaGithub size={16} className="group-hover/btn:scale-110 transition-transform" /> {t('Projects.repo')}
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-widest uppercase font-mono text-red-primary hover:text-red-glow transition-colors group/btn ml-auto cursor-none"
            >
              <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform" /> {t('Projects.live')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
