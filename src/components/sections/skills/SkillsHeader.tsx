import React, { memo } from 'react';
import { SkillsHeaderProps } from '@/types/skillsTypes';
import SectionTitle from '@/components/common/SectionTitle';

export const SkillsHeader: React.FC<SkillsHeaderProps> = memo(
  ({ titleRef }) => {
    return (
      <SectionTitle
        ref={titleRef}
        title="Minhas Habilidades"
        subtitle="Sou especializado no desenvolvimento de aplicações web modernas, utilizando as tecnologias mais recentes e boas práticas de programação."
        className="mb-12"
        titleId="skills-title"
      />
    );
  }
);

SkillsHeader.displayName = 'SkillsHeader';
