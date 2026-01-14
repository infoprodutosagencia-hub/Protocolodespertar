import React, { ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  effect?: 'fade-up' | 'scale' | 'slide-right';
}

export interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
  Icon: React.ElementType;
}

export interface BenefitItemProps {
  text: string;
}

export interface SectionProps {
  className?: string;
}