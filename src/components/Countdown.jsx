import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';
import { millisUntilNextUtcMidnight } from '../data/technologies';

const Countdown = ({ className = '' }) => {
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(() => millisUntilNextUtcMidnight());

  useEffect(() => {
    const tick = () => setRemaining(millisUntilNextUtcMidnight());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const totalMinutes = Math.floor(remaining / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <span className={className}>
      {t('game.nextIn').replace('{h}', hours).replace('{m}', minutes)}
    </span>
  );
};

export default Countdown;
