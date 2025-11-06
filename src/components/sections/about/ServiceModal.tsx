import React, { useEffect, memo } from 'react';
import { FaLightbulb, FaRocket } from 'react-icons/fa';
import { ServiceModalProps } from '@/types/aboutTypes';
import { gsap } from 'gsap';
import { Button } from '@/components/atoms/Button';

export const ServiceModal: React.FC<ServiceModalProps> = memo(({
  service,
  onClose,
}) => {
  useEffect(() => {
    if (service) {
      // Impedir rolagem do body enquanto o modal estiver aberto
      document.body.style.overflow = 'hidden';

      // Animar o modal quando ele for exibido
      const modalElement = document.getElementById('service-detail-modal');

      if (modalElement) {
        const tl = gsap.timeline();

        tl.to(modalElement, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        })
          .fromTo(
            '#service-icon',
            {
              opacity: 0,
              rotate: -30,
              scale: 0.5,
            },
            {
              opacity: 1,
              rotate: 0,
              scale: 1,
              duration: 0.4,
              ease: 'back.out(1.7)',
            },
            '-=0.2'
          )
          .fromTo(
            '#service-content > *',
            {
              opacity: 0,
              x: -20,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              stagger: 0.1,
              ease: 'power2.out',
            },
            '-=0.2'
          );
      }
    }

    return () => {
      // Restaurar a rolagem normal da página quando o modal for fechado
      document.body.style.overflow = '';
    };
  }, [service]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 bg-bg-dark/80 dark:bg-bg-dark/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      aria-describedby="service-modal-description"
    >
      <div
        id="service-detail-modal"
        className="bg-card-bg dark:bg-card-bg p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300 z-10"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <div className="flex items-center mb-8">
          <div
            id="service-icon"
            className="text-5xl mr-6 transform transition-transform duration-300 hover:scale-110"
            style={{ color: service.color }}
          >
            {service.icon}
          </div>
          <div id="service-content">
            <h3
              id="service-modal-title"
              className="text-3xl font-bold text-text-dark dark:text-text-light mb-2"
            >
              {service.title}
            </h3>
            <div
              className="w-20 h-1 rounded-full"
              style={{ backgroundColor: service.color }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <p
            id="service-modal-description"
            className="text-text-dark dark:text-text-light opacity-80 leading-relaxed"
          >
            {service.description}
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-text-dark dark:text-text-light font-medium mb-4 text-lg">
            Como posso ajudar você?
          </h4>
          <ul className="space-y-3">
            {[
              'Desenvolvimento personalizado de acordo com as necessidades do seu negócio.',
              'Implementação de soluções técnicas modernas e eficientes.',
              'Suporte contínuo e manutenção para garantir o bom funcionamento.',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span
                  className="mr-3 text-lg mt-1"
                  style={{ color: service.color }}
                >
                  <FaLightbulb />
                </span>
                <p className="text-text-dark dark:text-text-light opacity-80">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center gap-4">
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-white"
            style={{
              backgroundColor: service.color,
            }}
            onClick={onClose}
          >
            <span className="flex items-center">
              <FaRocket className="mr-2" /> Solicitar este serviço
            </span>
          </a>
          <Button
            variant="secondary"
            onClick={onClose}
            style={{
              backgroundColor: `${service.color}20`,
              color: service.color,
              border: `2px solid ${service.color}`,
            }}
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
});

ServiceModal.displayName = 'ServiceModal';
