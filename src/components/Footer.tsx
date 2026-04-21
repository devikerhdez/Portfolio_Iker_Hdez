import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <motion.footer 
      className="bg-[#050505] border-t border-red-primary/30 pt-16 pb-8 px-6 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      id="contact"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="flex justify-center flex-wrap gap-8 mb-12">
          {[
            { icon: FaGithub, href: "https://github.com/ikerhernandez" },
            { icon: FaLinkedin, href: "#" },
            { icon: FaInstagram, href: "#" },
            { icon: FaEnvelope, href: "mailto:hello@example.com" }
          ].map((item, i) => (
            <a 
              key={i} 
              href={item.href}
              className="text-gray-400 hover:text-red-primary hover:scale-110 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <item.icon size={28} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="font-mono text-sm text-gray-300">
            {t('Footer.copyright')}
          </p>
          <p className="font-mono text-xs text-gray-600">
            {t('Footer.builtBy')}
          </p>
        </div>
        
      </div>
    </motion.footer>
  );
}
