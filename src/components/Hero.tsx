import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Huge background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.h1
          className="text-[25vw] font-display text-red-primary opacity-5 whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {t('Hero.bgName')}
        </motion.h1>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Texts */}
        <div className="order-2 md:order-1 flex flex-col items-start gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-lg md:text-xl text-gray-400 mb-2 font-mono uppercase tracking-widest">
              {t('Hero.role')}
            </h2>
            <h1 className="text-6xl md:text-8xl font-display leading-[0.9] mb-8 animate-glitch relative inline-block text-white">
              {t('Hero.fullName')}
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-md italic border-l-2 border-red-primary pl-4 py-1 leading-relaxed text-justify">
              {t('Hero.description')}
            </p>
          </motion.div>
        </div>

        {/* Photo */}
        <div className="order-1 md:order-2 flex items-center justify-center md:justify-end mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[280px] h-[360px] md:w-[350px] md:h-[450px]"
          >
            <div className="absolute inset-0 bg-red-primary/20 animate-pulse-red rounded-tr-[30%] rounded-bl-[40%] rounded-tl-[10%] rounded-br-[20%] blur-md pointer-events-none"></div>
            <div className="w-full h-full overflow-hidden rounded-tr-[30%] rounded-bl-[40%] rounded-tl-[10%] rounded-br-[20%] relative z-10 border border-red-primary/30 bg-[#111] shadow-[0_0_50px_rgba(204,0,0,0.15)] group">
              <img
                src="/elegante.jpeg"
                alt="Iker"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                style={{ objectPosition: "center" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] tracking-widest text-red-primary font-bold">
          {t('Hero.scroll')}
        </span>
        <motion.div
          className="w-px h-16 bg-linear-to-b from-red-primary via-red-primary/50 to-transparent"
          animate={{ height: ["0px", "64px", "0px"], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
