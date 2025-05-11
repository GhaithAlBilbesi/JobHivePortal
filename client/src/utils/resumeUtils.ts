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

    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'temp-pdf-element';
    clone.style.width = '210mm';  // A4 width
    clone.style.minHeight = '297mm'; // A4 height
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.zIndex = '-1000';
    clone.style.margin = '0';
    clone.style.padding = '20px';
    clone.style.boxSizing = 'border-box';
    clone.style.backgroundColor = 'white';
    clone.style.overflow = 'hidden';
    clone.style.transition = 'none';
    clone.style.animation = 'none';
    
    // Ensure all backgrounds are printed
    const allColorElements = clone.querySelectorAll('[class*="bg-"]');
    allColorElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      // Use standard and prefixed property (with a fallback method for type safety)
      htmlEl.style.setProperty('-webkit-print-color-adjust', 'exact');
      htmlEl.style.setProperty('print-color-adjust', 'exact');
      htmlEl.style.setProperty('color-adjust', 'exact');
    });
    
    // Add to body temporarily
    document.body.appendChild(clone);
    
    // Ensure page breaks are handled properly
    const sections = clone.querySelectorAll('section, .section, h1, h2, h3');
    sections.forEach(section => {
      (section as HTMLElement).style.pageBreakInside = 'avoid';
      (section as HTMLElement).style.breakInside = 'avoid';
    });
    
    // Convert the HTML element to a canvas with proper options for quality
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable loading cross-origin images
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowWidth: 794, // A4 width in pixels (aproximately at 96 DPI)
      windowHeight: 1123, // A4 height in pixels
      onclone: (clonedDoc) => {
        // Additional adjustments to the cloned document if needed
        const clonedElement = clonedDoc.getElementById('temp-pdf-element');
        if (clonedElement) {
          // Make sure flex layout is preserved
          clonedElement.style.display = 'flex';
          clonedElement.style.flexDirection = 'column';
        }
      }
    });
    
    // Remove the clone after rendering
    document.body.removeChild(clone);
    
    // Calculate the PDF dimensions (A4 paper)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF document with proper dimensions and compression
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    // Add the canvas as an image to the PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95), // Use JPEG for smaller file size, high quality
      'JPEG', 
      0,  // X position 
      0,  // Y position
      imgWidth, // Width
      imgHeight // Height
    );
    
    // Handle multi-page resumes if content exceeds A4 height
    if (imgHeight > pageHeight) {
      let remainingHeight = imgHeight;
      let position = -pageHeight; // Starting position for the second page
      
      while (remainingHeight > pageHeight) {
        // Add new page
        pdf.addPage();
        
        // Add the same image but shifted upward to show the next page worth of content
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight
        );
        
        // Update remaining height and position for next page
        remainingHeight -= pageHeight;
        position -= pageHeight;
      }
    }

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