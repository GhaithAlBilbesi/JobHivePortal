import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData } from '@/components/resume-templates';

// Generate a PDF from a HTML element
export const generatePDF = async (elementId: string, fileName: string = 'resume.pdf'): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found.`);
    }

    // Temporarily disable any transitions or animations
    const originalStyles = element.style.cssText;
    element.style.transition = 'none';
    element.style.animation = 'none';
    
    // Apply optimal styling for PDF generation
    const oldPadding = element.style.padding;
    element.style.padding = '20px';
    
    // Get the computed style of the element
    const computedStyle = window.getComputedStyle(element);
    const originalTransform = computedStyle.transform;
    
    // Reset transform for accurate rendering
    if (originalTransform !== 'none') {
      element.style.transform = 'none';
    }

    // Convert the HTML element to a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable loading cross-origin images
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowWidth: 1200, // Set a reasonable window width for consistent rendering
      windowHeight: element.scrollHeight || 1200, // Use element height if available
    });

    // Restore original styles
    element.style.cssText = originalStyles;
    element.style.padding = oldPadding;
    
    // Calculate the PDF dimensions (A4 paper)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF document with proper dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add the canvas as an image to the PDF, centering content if needed
    pdf.addImage(
      canvas.toDataURL('image/png', 1.0), // Use higher quality
      'PNG', 
      0, 
      0, 
      imgWidth, 
      imgHeight
    );

    // Save the PDF
    pdf.save(fileName);
    return;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Initial empty resume data
export const emptyResumeData: ResumeData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedIn: '',
  summary: '',
  education: [
    {
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      relevantCourses: '',
      achievements: '',
    },
  ],
  experience: [
    {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: [
    { name: '' },
    { name: '' },
    { name: '' },
  ],
  certifications: [
    {
      name: '',
      issuer: '',
      date: '',
    }
  ],
};

// Local storage helpers
export const RESUME_STORAGE_KEY = 'jobhive_resume_data';
export const TEMPLATE_STORAGE_KEY = 'jobhive_resume_template';

export const saveResumeData = (data: Partial<ResumeData>): void => {
  try {
    // Get existing data from storage
    const existingData = JSON.parse(localStorage.getItem(RESUME_STORAGE_KEY) || '{}');
    // Merge existing data with new data
    const mergedData = { ...existingData, ...data };
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(mergedData));
  } catch (error) {
    console.error('Error saving resume data:', error);
  }
};

export const getResumeData = (): ResumeData => {
  try {
    const data = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!data) return emptyResumeData;
    
    const parsedData = JSON.parse(data);
    return { ...emptyResumeData, ...parsedData };
  } catch (error) {
    console.error('Error getting resume data:', error);
    return emptyResumeData;
  }
};

export const saveTemplateChoice = (templateId: string): void => {
  localStorage.setItem(TEMPLATE_STORAGE_KEY, templateId);
};

export const getTemplateChoice = (): string => {
  return localStorage.getItem(TEMPLATE_STORAGE_KEY) || 'modern';
};