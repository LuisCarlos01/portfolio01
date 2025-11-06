import { ReactNode, RefObject } from 'react';

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface Statistic {
  icon: ReactNode;
  title: string;
  value: number;
  suffix: string;
}

export interface AboutHeaderProps {
  titleRef: RefObject<HTMLHeadingElement | null>;
}

export interface AboutImageProps {
  imageRef: RefObject<HTMLDivElement | null>;
}

export interface AboutContentProps {
  contentRef: RefObject<HTMLDivElement | null>;
}

export interface AboutStatsProps {
  statsRef: RefObject<HTMLDivElement | null>;
  statistics: Statistic[];
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onClick: (service: Service) => void;
}

export interface ServicesListProps {
  servicesRef: RefObject<HTMLDivElement | null>;
  services: Service[];
  hoveredService: number | null;
  onServiceHover: (index: number | null) => void;
  onServiceClick: (service: Service) => void;
}

export interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

