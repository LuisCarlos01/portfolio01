import { Skill } from '@/types/skillsTypes';
import React from 'react';
import { IconType } from 'react-icons';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaNpm,
  FaDocker,
  FaWordpress,
  FaGithub,
  FaPython,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiFigma,
  SiCplusplus,
  SiSharp,
  SiGreensock,
  SiReactrouter,
} from 'react-icons/si';

// Função para criar ícones sem usar JSX diretamente em objetos literais
const createIcon = (Icon: IconType, size = 36) =>
  React.createElement(Icon, { size });

/**
 * Dados das habilidades do desenvolvedor
 */
export const skillsData: Skill[] = [
  {
    name: 'React',
    level: 90,
    icon: createIcon(FaReact),
    category: 'frontend',
    color: '#61DAFB',
    description:
      'Biblioteca JavaScript para construção de interfaces de usuário com componentes reutilizáveis e estado gerenciável.',
    relatedProjects: [
      {
        id: 1,
        title: 'E-commerce Moderno',
        description:
          'Um site de e-commerce completo com integração de pagamento, carrinho de compras e painel administrativo.',
        image: '/foodie-ecommerce.jpeg',
      },
      {
        id: 2,
        title: 'App de Tarefas',
        description:
          'Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorias e lembretes.',
        image: '/assets/project2.jpg',
      },
    ],
  },
  {
    name: 'JavaScript',
    level: 85,
    icon: createIcon(FaJsSquare, 32),
    category: 'frontend',
    color: '#F7DF1E',
    description:
      'Linguagem de programação que permite implementar recursos interativos em páginas web.',
    relatedProjects: [
      {
        id: 5,
        title: 'Website Responsivo',
        description:
          'Site institucional responsivo com animações suaves e otimizado para SEO.',
        image: '/assets/Responsive web design.jpeg',
      },
    ],
  },
  {
    name: 'TypeScript',
    level: 80,
    icon: createIcon(SiTypescript, 28),
    category: 'frontend',
    color: '#3178C6',
    description:
      'Superset do JavaScript que adiciona tipagem estática, melhorando a manutenção e escalabilidade do código.',
    relatedProjects: [
      {
        id: 3,
        title: 'Dashboard Analytics',
        description:
          'Painel administrativo para visualização de dados e métricas de desempenho de negócios.',
        image: '/assets/project3.jpg',
      },
    ],
  },
  {
    name: 'HTML5',
    level: 95,
    icon: createIcon(FaHtml5, 32),
    category: 'frontend',
    color: '#E34F26',
    description:
      'Linguagem de marcação para estruturar e apresentar conteúdo na web, com suporte a recursos modernos.',
  },
  {
    name: 'CSS3',
    level: 90,
    icon: createIcon(FaCss3Alt, 32),
    category: 'frontend',
    color: '#1572B6',
    description:
      'Linguagem de estilo usada para descrever a apresentação de documentos HTML, com layouts flexíveis e responsivos.',
  },
  {
    name: 'Node.js',
    level: 80,
    icon: createIcon(FaNodeJs, 32),
    category: 'backend',
    color: '#339933',
    description:
      'Ambiente de execução JavaScript server-side, permitindo construir aplicações escaláveis e em tempo real.',
  },
  {
    name: 'Git',
    level: 85,
    icon: createIcon(FaGitAlt, 32),
    category: 'other',
    color: '#F05032',
    description:
      'Sistema de controle de versão distribuído para rastrear mudanças no código-fonte durante o desenvolvimento.',
  },
  {
    name: 'NPM',
    level: 85,
    icon: createIcon(FaNpm, 32),
    category: 'other',
    color: '#CB3837',
    description:
      'Gerenciador de pacotes para JavaScript, permitindo compartilhar e reutilizar código.',
  },
  {
    name: 'Docker',
    level: 30,
    icon: createIcon(FaDocker, 32),
    category: 'backend',
    color: '#2496ED',
    description:
      'Plataforma para desenvolvimento, envio e execução de aplicações em contêineres isolados.',
  },
  {
    name: 'PostgreSQL',
    level: 40,
    icon: createIcon(SiPostgresql, 32),
    category: 'backend',
    color: '#4169E1',
    description:
      'Sistema gerenciador de banco de dados relacional, com ênfase em extensibilidade e conformidade com padrões.',
  },
  {
    name: 'Tailwind CSS',
    level: 85,
    icon: createIcon(SiTailwindcss, 32),
    category: 'frontend',
    color: '#06B6D4',
    description:
      'Framework CSS utilitário para criar designs personalizados sem sair do HTML.',
    relatedProjects: [
      {
        id: 2,
        title: 'App de Tarefas',
        description:
          'Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorias e lembretes.',
        image: '/assets/project2.jpg',
      },
    ],
  },
  {
    name: 'Next.js',
    level: 75,
    icon: createIcon(SiNextdotjs, 32),
    category: 'frontend',
    color: '#000000',
    description:
      'Framework React para produção com renderização híbrida, rotas e otimização.',
    relatedProjects: [
      {
        id: 1,
        title: 'E-commerce Moderno',
        description:
          'Um site de e-commerce completo com integração de pagamento, carrinho de compras e painel administrativo.',
        image: '/foodie-ecommerce.jpeg',
      },
    ],
  },
  {
    name: 'Vite',
    level: 80,
    icon: createIcon(SiVite, 32),
    category: 'frontend',
    color: '#646CFF',
    description:
      'Ferramenta de build moderna que oferece uma experiência de desenvolvimento mais rápida e eficiente para projetos web.',
  },
  {
    name: 'Figma',
    level: 60,
    icon: createIcon(SiFigma, 32),
    category: 'other',
    color: '#F24E1E',
    description:
      'Ferramenta de design baseada na web para criar interfaces, protótipos e sistemas de design colaborativos.',
  },
  {
    name: 'WordPress',
    level: 65,
    icon: createIcon(FaWordpress, 32),
    category: 'other',
    color: '#21759B',
    description:
      'Sistema de gerenciamento de conteúdo para criar e manter sites e blogs.',
  },
  {
    name: 'GitHub',
    level: 80,
    icon: createIcon(FaGithub, 32),
    category: 'other',
    color: '#181717',
    description:
      'Plataforma de hospedagem de código com controle de versão e colaboração para projetos de software.',
  },
  {
    name: 'C++',
    level: 25,
    icon: createIcon(SiCplusplus, 32),
    category: 'backend',
    color: '#00599C',
    description:
      'Linguagem de programação de propósito geral com recursos para programação de baixo nível e orientação a objetos.',
  },
  {
    name: 'C#',
    level: 35,
    icon: createIcon(SiSharp, 32),
    category: 'backend',
    color: '#239120',
    description:
      'Linguagem de programação moderna, orientada a objetos e tipada desenvolvida pela Microsoft.',
  },
  {
    name: 'Python',
    level: 45,
    icon: createIcon(FaPython, 32),
    category: 'backend',
    color: '#3776AB',
    description:
      'Linguagem de programação interpretada de alto nível, com filosofia de design que enfatiza legibilidade e simplicidade.',
  },
  {
    name: 'GSAP',
    level: 70,
    icon: createIcon(SiGreensock, 32),
    category: 'frontend',
    color: '#88CE02',
    description:
      'Biblioteca JavaScript para criar animações de alta performance em websites e aplicações web.',
  },
  {
    name: 'React Router',
    level: 85,
    icon: createIcon(SiReactrouter, 32),
    category: 'frontend',
    color: '#CA4245',
    description:
      'Biblioteca de roteamento para React, permitindo navegação e gerenciamento de URL em aplicações de página única.',
  },
];

