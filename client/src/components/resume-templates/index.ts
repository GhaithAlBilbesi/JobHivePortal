export { default as ModernTemplate } from './ModernTemplate';
export { default as MinimalTemplate } from './MinimalTemplate';

// Common interface for resume data
export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  relevantCourses?: string;
  achievements?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn?: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certifications?: Certification[];
}

// Template type definitions
export type TemplateType = 'modern' | 'minimal';

export interface TemplatePreview {
  id: TemplateType;
  name: string;
  imageUrl: string;
}

// Available templates for the user to choose from
export const availableTemplates: TemplatePreview[] = [
  {
    id: 'modern',
    name: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1626197031507-4c3672337971?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
  },
];