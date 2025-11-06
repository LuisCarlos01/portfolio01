import React, { useRef, memo } from 'react';
import { SkillsListProps } from '@/types/skillsTypes';
import { SkillCard } from './SkillCard';

export const SkillsList: React.FC<SkillsListProps> = memo(({
  skills,
  onSkillClick,
  selectedSkill,
}) => {
  const skillsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={skillsRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {skills.map((skill, index) => (
        <SkillCard
          key={`skill-${index}`}
          skill={skill}
          onClick={onSkillClick}
          isActive={selectedSkill === skill}
        />
      ))}
    </div>
  );
});

SkillsList.displayName = 'SkillsList';

