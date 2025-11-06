import { memo } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useStructuredData } from '@/hooks/useStructuredData';
import { HeroSection } from '@/components/sections/hero';
import { ContactForm } from '@/components/organisms/ContactForm';
import { Card } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export const Home = memo(() => {
  useSEO({
    title: 'Luis Carlos - Portfólio | Desenvolvedor Full Stack',
    description:
      'Portfólio profissional de Luis Carlos - Desenvolvedor Full Stack especializado em React, TypeScript, Node.js e tecnologias modernas.',
    keywords: [
      'desenvolvedor',
      'full stack',
      'react',
      'typescript',
      'node.js',
      'portfólio',
      'programador',
    ],
  });

  useStructuredData({
    type: 'Person',
    name: 'Luis Carlos',
    jobTitle: 'Desenvolvedor Full Stack',
    description:
      'Desenvolvedor Full Stack especializado em React, TypeScript e Node.js',
    url: 'https://luiscarlos.dev',
    sameAs: [
      'https://github.com/LuisCarlos01',
      'https://linkedin.com/in/luiscarlos',
    ],
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="border-b border-border-color bg-card-bg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-text-dark dark:text-text-light">
              Portfólio
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="primary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-text-dark dark:text-text-light mb-8 text-center">
            Tecnologias e Recursos Implementados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hover>
              <h4 className="text-xl font-bold text-text-dark dark:text-text-light mb-2">
                Atomic Design
              </h4>
              <p className="text-text-dark dark:text-text-light">
                Componentes organizados em atoms, molecules, organisms e
                templates para máxima reutilização.
              </p>
            </Card>

            <Card hover>
              <h4 className="text-xl font-bold text-text-dark dark:text-text-light mb-2">
                TypeScript
              </h4>
              <p className="text-text-dark dark:text-text-light">
                Type safety completo em todo o projeto para maior confiabilidade
                e manutenibilidade.
              </p>
            </Card>

            <Card hover>
              <h4 className="text-xl font-bold text-text-dark dark:text-text-light mb-2">
                Performance
              </h4>
              <p className="text-text-dark dark:text-text-light">
                Code splitting, lazy loading, PWA e otimizações de bundle para
                carregamento rápido.
              </p>
            </Card>

            <Card hover>
              <h4 className="text-xl font-bold text-text-dark dark:text-text-light mb-2">
                Acessibilidade
              </h4>
              <p className="text-text-dark dark:text-text-light">
                WCAG 2.1 AA compliant com ARIA labels, navegação por teclado e
                contraste adequado.
              </p>
            </Card>

            <Card hover>
              <h4 className="text-xl font-bold text-text-dark dark:text-text-light mb-2">
                SEO
              </h4>
              <p className="text-text-dark dark:text-text-light">
                Meta tags dinâmicas, structured data (JSON-LD) e sitemap para
                melhor indexação.
              </p>
            </Card>

            <Card hover>
              <h4 className="text-xl font-bold text-text-dark dark:text-text-light mb-2">
                API Serverless
              </h4>
              <p className="text-text-dark dark:text-text-light">
                Formulário de contato com validação, rate limiting e integração
                com Resend.
              </p>
            </Card>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-card-bg">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-text-dark dark:text-text-light mb-8 text-center">
              Entre em Contato
            </h3>
            <div className="max-w-2xl mx-auto">
              <Card>
                <ContactForm
                  onSubmit={(result) => {
                    // eslint-disable-next-line no-console
                    console.log('Form submitted:', result);
                  }}
                />
              </Card>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="py-16 bg-bg-light dark:bg-bg-dark text-center">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">
              Status do Projeto
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="success">Sprint 0: Concluído</Badge>
              <Badge variant="success">Sprint 1: Concluído</Badge>
              <Badge variant="success">Sprint 2: Concluído</Badge>
              <Badge variant="success">Sprint 3: Concluído</Badge>
              <Badge variant="success">Sprint 4: Concluído</Badge>
              <Badge variant="primary">Sprint 5: Em andamento</Badge>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-color bg-card-bg mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-text-dark dark:text-text-light">
            © 2024 Luis Carlos - Portfólio Modernizado
          </p>
        </div>
      </footer>
    </div>
  );
});

Home.displayName = 'Home';
