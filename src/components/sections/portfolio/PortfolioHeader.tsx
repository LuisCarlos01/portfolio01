import { forwardRef, memo } from 'react';
import { PortfolioHeaderProps } from '@/types/portfolioTypes';
import { SectionTitle } from '@/components/common/SectionTitle';

/**
 * Cabeçalho da seção Portfolio
 * Usa SectionTitle para consistência visual
 */
export const PortfolioHeader = memo(
  forwardRef<HTMLHeadingElement, PortfolioHeaderProps>(({ titleRef }, ref) => {
    return (
      <SectionTitle
        ref={ref || titleRef}
        title="Portfólio"
        subtitle="Alguns dos meus projetos e trabalhos recentes"
        align="center"
        titleId="portfolio-title"
      />
    );
  })
);

PortfolioHeader.displayName = 'PortfolioHeader';
