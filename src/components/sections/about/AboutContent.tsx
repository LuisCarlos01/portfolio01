import React, { memo } from 'react';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { AboutContentProps } from '@/types/aboutTypes';

export const AboutContent: React.FC<AboutContentProps> = memo(({
  contentRef,
}) => {
  return (
    <div
      ref={contentRef}
      className="text-foreground"
    >
      <h3 className="text-heading-2xl font-bold mb-4 text-primary">
        Desenvolvedor Frontend & Fullstack
      </h3>

      <p className="mb-4 leading-relaxed">
        Olá! Sou Luis Carlos, um desenvolvedor apaixonado por criar experiências
        web únicas e soluções tecnológicas que resolvem problemas reais.
      </p>

      <p className="mb-4 leading-relaxed">
        Com mais de 3 anos de experiência no desenvolvimento web, tenho me
        especializado em React, TypeScript e construção de interfaces modernas e
        acessíveis, sempre buscando as melhores práticas e padrões para entregar
        código de qualidade.
      </p>

      <p className="mb-8 leading-relaxed">
        Minha abordagem combina habilidades técnicas com uma forte atenção para
        UX/UI, garantindo que as aplicações não sejam apenas funcionais, mas
        também intuitivas e agradáveis para o usuário.
      </p>

      <a
        href="/assets/cv-luiscarlos.pdf"
        download
        className="btn-primary inline-flex items-center mb-8 group relative overflow-hidden px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-base ease-in-out hover:bg-primary-hover"
        aria-label="Baixar currículo em PDF"
      >
        <span className="relative z-10 flex items-center">
          <FaDownload className="mr-2 group-hover:animate-bounce" /> Baixar CV
          <FaArrowRight className="ml-2 opacity-0 -translate-x-3 transition-all duration-base ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />
        </span>
        <span className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-base ease-in-out"></span>
      </a>
    </div>
  );
});

AboutContent.displayName = 'AboutContent';

