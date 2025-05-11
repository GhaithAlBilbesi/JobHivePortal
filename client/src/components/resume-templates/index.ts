export { default as ModernTemplate } from './ModernTemplate';
export { default as MinimalTemplate } from './MinimalTemplate';
export { default as CreativeTemplate } from './CreativeTemplate';
export { default as ProfessionalTemplate } from './ProfessionalTemplate';
export { default as AcademicTemplate } from './AcademicTemplate';

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
export type TemplateType = 'modern' | 'minimal' | 'creative' | 'professional' | 'academic';

export interface TemplatePreview {
  id: TemplateType;
  name: string;
  imageUrl: string;
  description: string;
}

// Available templates for the user to choose from
export const availableTemplates: TemplatePreview[] = [
  {
    id: 'modern',
    name: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
    description: 'Clean, contemporary design with balanced layout and clear typography.'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1626197031507-4c3672337971?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
    description: 'Simple and elegant design focusing on essential content.'
  },
  {
    id: 'creative',
    name: 'Creative',
    imageUrl: 'https://images.unsplash.com/photo-1595085610126-5030f5373c8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
    description: 'Distinctive sidebar layout with accent colors to stand out from the crowd.'
  },
  {
    id: 'professional',
    name: 'Professional',
    imageUrl: 'https://images.unsplash.com/photo-1611175694989-4870fafa4494?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
    description: 'Traditional format with formal structure for corporate environments.'
  },
  {
    id: 'academic',
    name: 'Academic',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
    description: 'Formal layout emphasizing education and research experience.'
  },
];