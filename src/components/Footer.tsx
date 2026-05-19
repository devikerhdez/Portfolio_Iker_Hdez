import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#020202] border-t border-white/5 py-6 sm:py-8 px-4 sm:px-6 relative z-10 select-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <p className="font-mono text-[10px] text-zinc-600 tracking-wider text-center uppercase">
          {t('Footer.builtBy')}
        </p>
      </div>
    </footer>
  );
}
