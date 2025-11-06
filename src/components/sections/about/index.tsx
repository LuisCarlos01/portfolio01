import React, { useRef, useState, useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutHeader } from './AboutHeader';
import { AboutImage } from './AboutImage';
import { AboutContent } from './AboutContent';
import { AboutStats } from './AboutStats';
import { ServicesList } from './ServicesList';
import { ServiceModal } from './ServiceModal';
import { Service } from '@/types/aboutTypes';
import { services, statistics } from '@/data/aboutData';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = memo(() => {
  // Refs para os elementos da seção
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Estados para serviços
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Função para animar as estatísticas
  const animateStats = () => {
    if (!statsRef.current) return;

    // Animar os cards de estatísticas
    gsap.fromTo(
      statsRef.current.querySelectorAll('.stat-item'),
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // Animar os contadores após os cards aparecerem
          const statElements =
            statsRef.current?.querySelectorAll('.stat-value');

          if (statElements && statElements.length > 0) {
            statElements.forEach((el) => {
              const target = parseInt(el.getAttribute('data-value') || '0');

              // Definir diretamente o valor final para garantir que apareça
              if (target > 0) {
                el.textContent = target.toString();
              }

              // Animar o contador
              gsap.fromTo(
                el,
                { textContent: 0 },
                {
                  textContent: target,
                  duration: 2,
                  ease: 'power2.inOut',
                  onUpdate: function () {
                    // Arredondar para inteiro durante a animação
                    el.textContent = Math.round(
                      parseFloat(el.textContent || '0')
                    ).toString();
                  },
                }
              );
            });
          }
        },
      }
    );
  };

  // Função para animar os cards de serviços
  const animateServiceCards = () => {
    if (!servicesRef.current) return;

    gsap.fromTo(
      servicesRef.current.querySelectorAll('.service-card'),
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      }
    );
  };

  // Função para lidar com hover nos serviços
  const handleServiceHover = (index: number | null) => {
    setHoveredService(index);
  };

  // Função para mostrar detalhes do serviço em um modal
  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  // Fechar o modal de serviço
  const handleCloseModal = () => {
    setSelectedService(null);
  };

  // Efeito para iniciar animações quando a seção ficar visível
  useEffect(() => {
    if (sectionRef.current) {
      // Detectar quando a seção fica visível na tela
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          // Animar título
          gsap.fromTo(
            titleRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
            }
          );

          // Animar imagem com efeito de revelação
          gsap.fromTo(
            imageRef.current,
            {
              opacity: 0,
              scale: 0.9,
              rotate: -5,
            },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
            }
          );

          // Animar conteúdo com efeito de deslizamento
          if (contentRef.current) {
            const elements = contentRef.current.querySelectorAll('p, h3, a');
            if (elements.length > 0) {
              gsap.fromTo(
                elements,
                {
                  opacity: 0,
                  x: -30,
                },
                {
                  opacity: 1,
                  x: 0,
                  stagger: 0.15,
                  duration: 0.6,
                  ease: 'power2.out',
                }
              );
            }
          }

          // Animar estatísticas
          animateStats();

          // Animar cards de serviços
          animateServiceCards();
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-bg-light dark:bg-bg-dark section-container overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <AboutHeader titleRef={titleRef} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <AboutImage imageRef={imageRef} />

          <div>
            <AboutContent contentRef={contentRef} />
            <AboutStats statsRef={statsRef} statistics={statistics} />
          </div>
        </div>

        <div className="mb-16">
          <ServicesList
            servicesRef={servicesRef}
            services={services}
            hoveredService={hoveredService}
            onServiceHover={handleServiceHover}
            onServiceClick={handleServiceClick}
          />
        </div>
      </div>

      <ServiceModal service={selectedService} onClose={handleCloseModal} />
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

