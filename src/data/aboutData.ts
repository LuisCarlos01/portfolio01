import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaUserGraduate,
  FaProjectDiagram,
  FaUsers,
  FaBrain,
  FaTools,
} from 'react-icons/fa';
import React from 'react';
import { IconType } from 'react-icons';
import { Service, Statistic } from '@/types/aboutTypes';

// Função para criar ícones
const createIcon = (Icon: IconType) => React.createElement(Icon);

// Definição dos serviços
export const services: Service[] = [
  {
    icon: createIcon(FaCode),
    title: 'Desenvolvimento Web',
    description:
      'Criação de sites responsivos, rápidos e otimizados para SEO, utilizando as tecnologias mais modernas como React, Next.js e TypeScript.',
    color: '#61DAFB', // Azul React
  },
  {
    icon: createIcon(FaLaptopCode),
    title: 'Aplicações SPA',
    description:
      'Desenvolvimento de aplicações web modernas com React e TypeScript, proporcionando experiências de usuário fluidas e altamente interativas.',
    color: '#3178C6', // Azul TypeScript
  },
  {
    icon: createIcon(FaMobileAlt),
    title: 'Design Responsivo',
    description:
      'Criação de interfaces que funcionam perfeitamente em todos os dispositivos, desde smartphones até desktops, garantindo a melhor experiência para todos os usuários.',
    color: '#06B6D4', // Azul Tailwind
  },
  {
    icon: createIcon(FaServer),
    title: 'Integração API',
    description:
      'Conectando seu front-end com APIs e serviços de back-end, garantindo comunicação eficiente e segura entre diferentes sistemas.',
    color: '#339933', // Verde Node.js
  },
  {
    icon: createIcon(FaBrain),
    title: 'Soluções Criativas',
    description:
      'Desenvolvimento de soluções inovadoras para problemas complexos, combinando pensamento técnico e criativo para superar desafios.',
    color: '#F24E1E', // Laranja Figma
  },
  {
    icon: createIcon(FaTools),
    title: 'Otimização de Performance',
    description:
      'Análise e melhoria da performance das aplicações web, garantindo carregamento rápido e experiência de usuário fluida.',
    color: '#CC6699', // Rosa Sass
  },
];

// Definição das estatísticas
export const statistics: Statistic[] = [
  {
    icon: createIcon(FaUserGraduate),
    title: 'Experiência',
    value: 3,
    suffix: '+ Anos',
  },
  {
    icon: createIcon(FaProjectDiagram),
    title: 'Projetos',
    value: 20,
    suffix: '+ Completos',
  },
  {
    icon: createIcon(FaUsers),
    title: 'Clientes',
    value: 10,
    suffix: '+ Satisfeitos',
  },
];

