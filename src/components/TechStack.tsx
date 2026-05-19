import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaJava, FaReact, FaJs, FaPhp, FaLaravel, FaPython, FaRobot
} from 'react-icons/fa';
import { 
  SiSpringboot, SiTypescript, SiExpress, SiGithub, SiTailwindcss, SiGo, SiKubernetes, SiCplusplus, SiPostgresql, SiMongodb, SiSupabase,  SiNginx, SiKotlin
} from 'react-icons/si';

const iconMap: Record<string, { icon: any, color: string, useOriginal?: boolean }> = {
  // Stack
  "Java": { icon: FaJava, color: "#ed8b00" },
  "Spring Boot": { icon: SiSpringboot, color: "#6db33f" },
  "React": { icon: FaReact, color: "#61dbfb" },
  "JavaScript": { icon: FaJs, color: "#f7df1e" },
  "TypeScript": { icon: SiTypescript, color: "#3178c6" },
  "Express": { icon: SiExpress, color: "#ffffff" },
  "PHP": { icon: FaPhp, color: "#777bb4" },
  "Laravel": { icon: FaLaravel, color: "#ff2d20" },
  "GitHub": { icon: SiGithub, color: "white" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06b6d4" },
  "Agentes de IA": { icon: FaRobot, color: "#ff0000" },
  "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
  "MongoDB": { icon: SiMongodb, color: "#2496ed" },
  "AI Agents": { icon: FaRobot, color: "#ff0000" },
  "Supabase": { icon: SiSupabase, color: "#3fc1a8" },
  "Linux": { 
    icon: (props: any) => (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" 
        alt="Linux" 
        className={`${props.className} object-contain`} 
        style={{ ...props.style, width: props.size, height: props.size }} 
      />
    ), 
    color: "#E6E5E3", 
    useOriginal: true 
  },
  "Nginx": { icon: SiNginx, color: "#049b04" },
  // Knowledge
  "Python": { icon: FaPython, color: "#3776ab" },
  "Docker": { 
    icon: (props: any) => (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
        alt="Docker" 
        className={`${props.className} object-contain`} 
        style={{ ...props.style, width: props.size, height: props.size }} 
      />
    ), 
    color: "#2496ed", 
    useOriginal: true 
  },
  "Go": { icon: SiGo, color: "#00add8" },
  "Kotlin": { icon: SiKotlin, color: "#A259FF" },
  // Interested
  "Kubernetes": { icon: SiKubernetes, color: "#326ce5" },
  "C++": { icon: SiCplusplus, color: "#00599c" }
};

export default function TechStack() {
  const { t } = useTranslation();

  const categories = ['stack', 'knowledge', 'interested'];

  return (
    <section id="tech" className="min-h-screen px-4 sm:px-6 relative z-10 border-t border-white/5 bg-[#000000] scroll-mt-24 py-16 sm:py-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.h2 
          className="text-5xl sm:text-6xl md:text-8xl font-display text-white mb-10 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t('Tech.title')}
        </motion.h2>

        <div className="flex flex-col gap-12 sm:gap-20">
          {categories.map((catKey, catIdx) => {
            const items = t(`Tech.${catKey}.items`, { returnObjects: true }) as string[];
            const title = t(`Tech.${catKey}.title`);

            return (
              <div key={catKey} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 flex items-center gap-4"
                >
                  <div className="h-px w-6 sm:w-8 md:w-16 bg-linear-gradient-to-r from-transparent to-gray-800"></div>
                  <h3 className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase font-mono text-gray-600 whitespace-nowrap">
                    {title}
                  </h3>
                  <div className="h-px w-6 sm:w-8 md:w-16 bg-linear-gradient-to-l from-transparent to-gray-800"></div>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 max-w-4xl mx-auto">
                  {Array.isArray(items) && items.map((item, i) => {
                    const tech = iconMap[item] || { icon: FaRobot, color: "#CC0000" };
                    const Icon = tech.icon;

                    return (
                      <motion.div
                        key={item}
                        className="relative group"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: (catIdx * 0.1) + (i * 0.04) 
                        }}
                      >
                        {/* Outer Glow */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700 scale-150"
                          style={{ backgroundColor: tech.color }}
                        ></div>

                        {/* Card Container */}
                        <div className="relative w-14 h-14 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-500 backdrop-blur-md overflow-hidden">
                          {/* Inner Gradient Reflection */}
                          <div className="absolute inset-0 bg-linear-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                          
                          <Icon 
                            size={28} 
                            style={tech.useOriginal ? {} : { color: tech.color }} 
                            className="relative z-10 transition-all duration-500 group-hover:scale-110 filter drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]" 
                          />
                          
                          {/* Interactive Inner Glow */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                            style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
                          ></div>
                        </div>

                        {/* Floating Label */}
                        <motion.div 
                          className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap"
                          initial={{ y: 10 }}
                          whileHover={{ y: 0 }}
                        >
                          <div className="bg-black/90 border border-white/10 px-3 py-1 rounded-full shadow-2xl backdrop-blur-xl">
                            <span className="text-[10px] font-mono text-white/90 uppercase tracking-[0.2em]">
                              {item}
                            </span>
                          </div>
                          {/* Triangle arrow */}
                          <div className="w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45 mx-auto -mt-1.5"></div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
