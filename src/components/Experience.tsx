import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Experience() {
  const { t } = useTranslation();
  
  // Use returnObjects to get the translated array from JSON
  const experiences = t('Experience.items', { returnObjects: true }) as Array<{
    id: number;
    company: string;
    role: string;
    date: string;
    description: string;
  }>;

  return (
    <section id="experience" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-5xl sm:text-6xl md:text-8xl font-display text-white mb-10 sm:mb-16"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {t('Experience.title')}
        </motion.h2>

        <div className="relative">
          {/* Vertical red line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-red-primary/30 md:left-4"></div>

          <div className="flex flex-col gap-8 sm:gap-12 relative z-10">
            {Array.isArray(experiences) && experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative pl-8 md:pl-16 group"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Red dot */}
                <div className="absolute left-[-4px] md:left-[12px] top-2 w-2 h-2 rounded-full bg-red-primary group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_#cc0000]"></div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                  <h3 className="text-2xl md:text-3xl font-display tracking-wide">{exp.company}</h3>
                  <span className="text-red-primary font-mono text-sm">— {exp.role}</span>
                  <span className="text-xs text-gray-500 font-mono md:ml-auto">{exp.date}</span>
                </div>
                
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl bg-black/50 p-3 sm:p-4 border border-white/5 group-hover:border-red-primary/30 transition-colors duration-300">
                  {exp.description}
                </p>
              </motion.div>
            ))}

            {/* "Próximamente más y mejor" item */}
            <motion.div
              className="relative pl-8 md:pl-16 group select-none"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: experiences.length * 0.1 }}
            >
              {/* Red dot */}
              <div className="absolute left-[-4px] md:left-[12px] top-2.5 w-2.5 h-2.5 rounded-full bg-red-primary/40 group-hover:scale-150 transition-all duration-300 group-hover:bg-red-primary shadow-[0_0_10px_rgba(204,0,0,0.4)]"></div>

              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-xl md:text-2xl font-mono text-gray-500 group-hover:text-red-primary transition-colors tracking-widest uppercase animate-pulse">
                  {t('Experience.comingSoon')}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
