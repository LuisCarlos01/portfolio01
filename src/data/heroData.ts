import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import React from 'react';
import { IconType } from 'react-icons';

// Função para criar ícones sem usar JSX diretamente
const createIcon = (Icon: IconType, size = 24) =>
  React.createElement(Icon, { size });

/**
 * Strings para o efeito de digitação
 */
export const typedStrings = [
  'Desenvolvedor Frontend',
  'Freelancer',
  'UI/UX Designer',
];

/**
 * Conteúdo descritivo do herói
 */
export const heroContent =
  'Desenvolvedor web apaixonado por criar experiências digitais de alta qualidade. Especializado em React, TypeScript e Node.js. Focado em performance e acessibilidade.';

/**
 * Dados da imagem principal
 */
export const heroImage = {
  src: '/assets/perfil06.jpg',
  fallbackSrc: '/assets/perfil02.JPEG',
  alt: 'Luís Carlos',
};

/**
 * Links de redes sociais
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactElement;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/luiscarlos01',
    icon: createIcon(FaGithub),
    ariaLabel: 'GitHub',
  },
  {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/',
    icon: createIcon(FaLinkedin),
    ariaLabel: 'LinkedIn',
  },
  {
    platform: 'twitter',
    url: '#',
    icon: createIcon(FaTwitter),
    ariaLabel: 'Twitter',
  },
];

