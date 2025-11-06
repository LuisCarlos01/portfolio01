import { useCallback } from 'react';
import { Skill, ApplicationArea } from '@/types/skillsTypes';

/**
 * Hook personalizado para gerenciar áreas de aplicação das habilidades
 */
export const useSkillApplicationAreas = () => {
  /**
   * Retorna as áreas de aplicação para uma habilidade específica
   */
  const getApplicationAreas = useCallback((skill: Skill): ApplicationArea[] => {
    // Áreas comuns de aplicação para cada categoria
    const commonAreas = {
      frontend: [
        {
          title: 'Interfaces de Usuário',
          description:
            'Desenvolvimento de componentes interativos e responsivos',
        },
        {
          title: 'Animações',
          description: 'Criação de efeitos visuais e transições suaves',
        },
        {
          title: 'Otimização',
          description: 'Melhoria de performance e experiência do usuário',
        },
      ],
      backend: [
        {
          title: 'APIs',
          description: 'Desenvolvimento de serviços web e endpoints',
        },
        {
          title: 'Banco de Dados',
          description: 'Manipulação e otimização de dados',
        },
        {
          title: 'Segurança',
          description: 'Implementação de autenticação e autorização',
        },
      ],
      other: [
        {
          title: 'Produtividade',
          description: 'Ferramentas para agilizar o desenvolvimento',
        },
        {
          title: 'DevOps',
          description: 'Integração e entrega contínua',
        },
        {
          title: 'Colaboração',
          description: 'Ferramentas para trabalho em equipe',
        },
      ],
    };

    // Áreas específicas para tecnologias mais populares
    const specificAreas: Record<string, ApplicationArea[]> = {
      React: [
        {
          title: 'Componentes',
          description: 'Criação e gerenciamento de componentes reutilizáveis',
        },
        {
          title: 'Hooks',
          description: 'Utilização de estados e efeitos para lógica funcional',
        },
        {
          title: 'Context API',
          description: 'Gerenciamento de estado global na aplicação',
        },
      ],
      JavaScript: [
        { title: 'DOM', description: 'Manipulação de elementos da página' },
        {
          title: 'Assíncrono',
          description: 'Promises, async/await e callbacks',
        },
        {
          title: 'APIs Browser',
          description: 'WebSockets, LocalStorage, Service Workers',
        },
      ],
      TypeScript: [
        {
          title: 'Type Safety',
          description: 'Desenvolvimento com segurança de tipos',
        },
        {
          title: 'Interfaces',
          description: 'Definição clara de contratos de dados',
        },
        {
          title: 'Generics',
          description: 'Componentes e funções reutilizáveis com tipagem',
        },
      ],
      'Node.js': [
        {
          title: 'Servidores',
          description: 'Desenvolvimento de aplicações server-side',
        },
        {
          title: 'Módulos',
          description: 'Criação e utilização de pacotes npm',
        },
        { title: 'Streams', description: 'Processamento eficiente de dados' },
      ],
    };

    // Verificar se existem áreas específicas para esta habilidade
    if (specificAreas[skill.name]) {
      return specificAreas[skill.name];
    }

    // Caso contrário, retornar áreas comuns para a categoria
    return commonAreas[skill.category];
  }, []);

  return { getApplicationAreas };
};

