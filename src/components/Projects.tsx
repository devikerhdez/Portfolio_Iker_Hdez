import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { t } = useTranslation();
  
  const projects = t('Projects.items', { returnObjects: true }) as Array<{
    id: number;
    name: string;
    description: string;
    stack: string[];
    year: string;
    github?: string;
    live?: string;
    preview?: string;
  }>;

  return (
    <section id="projects" className="min-h-screen py-24 px-6 relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-6xl md:text-8xl font-display text-white mb-16 md:text-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {t('Projects.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {Array.isArray(projects) && projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
