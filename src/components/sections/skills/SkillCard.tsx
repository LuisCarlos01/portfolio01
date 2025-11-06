import React, { useRef, useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { SkillCardProps } from '@/types/skillsTypes';

export const SkillCard: React.FC<SkillCardProps> = memo(({
  skill,
  onClick,
  isActive,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Efeito para definir a largura inicial como 0 e depois animar
  useEffect(() => {
    if (progressRef.current) {
      // Inicialmente definir como 0
      progressRef.current.style.width = '0%';

      // Depois de um pequeno delay, animar para o valor correto
      setTimeout(() => {
        gsap.to(progressRef.current, {
          width: `${skill.level}%`,
          duration: 1,
          ease: 'power2.out',
        });
      }, 300);
    }
  }, [skill.level]);

  return (
    <div
      ref={cardRef}
      className={`relative bg-card-bg dark:bg-card-bg p-4 rounded-lg shadow-md 
                transition-all duration-300 transform hover:scale-105 
                hover:shadow-lg cursor-pointer skill-card ${
                  isActive ? 'scale-110 z-20' : ''
                }`}
      onClick={() => onClick(skill)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(skill);
        }
      }}
      data-level={skill.level}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} - ${skill.level}% de proficiência`}
    >
      <div className="flex items-center mb-2">
        <div className="mr-3 text-3xl" style={{ color: skill.color }}>
          {skill.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-dark dark:text-text-light">
            {skill.name}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {skill.category === 'frontend'
              ? 'Frontend'
              : skill.category === 'backend'
              ? 'Backend'
              : 'Outras'}
          </p>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-3">
        <div
          ref={progressRef}
          className="h-full rounded-full progress-inner"
          style={{
            backgroundColor: skill.color,
            width: '0%', // Inicia com 0 e será animado via useEffect
          }}
        ></div>
      </div>

      <p className="text-right text-sm mt-1 text-gray-700 dark:text-gray-300">
        {skill.level}%
      </p>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

