import { RefObject } from 'react';
import { SocialLink } from '@/data/heroData';

export interface HeroTitleProps {
  titleRef: RefObject<HTMLHeadingElement>;
}

export interface HeroSubtitleProps {
  subtitleRef: RefObject<HTMLDivElement>;
  typedRef: RefObject<HTMLSpanElement>;
  typedStrings: string[];
}

export interface HeroContentProps {
  contentRef: RefObject<HTMLParagraphElement>;
  content: string;
}

export interface SocialLinksProps {
  socialRef: RefObject<HTMLDivElement>;
  links: SocialLink[];
}

export interface HeroImageProps {
  imageSrc: string;
  fallbackSrc: string;
  alt: string;
}

export interface ScrollIconProps {
  scrollIconRef: RefObject<HTMLDivElement>;
  onClick: () => void;
}

