import { RefObject } from 'react';
import { SocialLink } from '@/data/heroData';

export interface HeroTitleProps {
  titleRef: RefObject<HTMLHeadingElement | null>;
}

export interface HeroSubtitleProps {
  subtitleRef: RefObject<HTMLDivElement | null>;
  typedRef: RefObject<HTMLSpanElement | null>;
  typedStrings: string[];
}

export interface HeroContentProps {
  contentRef: RefObject<HTMLParagraphElement | null>;
  content: string;
}

export interface SocialLinksProps {
  socialRef: RefObject<HTMLDivElement | null>;
  links: SocialLink[];
}

export interface HeroImageProps {
  imageSrc: string;
  fallbackSrc: string;
  alt: string;
}

export interface ScrollIconProps {
  scrollIconRef: RefObject<HTMLDivElement | null>;
  onClick: () => void;
}

