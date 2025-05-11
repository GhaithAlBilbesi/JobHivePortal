import React from 'react';
import { ResumeData } from './index';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  // Format date string (YYYY-MM) to display as Mon YYYY
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Present';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg" id="resume-to-print">
      {/* Header Section with Accent Colors */}
      <div className="flex flex-col md:flex-row items-start">
        {/* Left sidebar with accent color */}
        <div className="w-full md:w-1/3 bg-[#F6C500] text-gray-900 p-6 rounded-l-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1 text-gray-900">
              {data.firstName} <br/>{data.lastName}
            </h1>
          </div>
          
          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold border-b-2 border-gray-900 pb-2 mb-3">Contact</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {data.email}</p>
              <p><span className="font-medium">Phone:</span> {data.phone}</p>
              {data.linkedIn && (
                <p><span className="font-medium">LinkedIn:</span> {data.linkedIn}</p>
              )}
            </div>
          </div>
          
          {/* Skills Section in Sidebar */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold border-b-2 border-gray-900 pb-2 mb-3">Skills</h2>
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b-2 border-gray-900 pb-2 mb-3">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm">
                    {cert.issuer} • {formatDate(cert.date)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6">
          {/* Professional Summary */}
          {data.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">Profile</h2>
              <p className="text-gray-700">{data.summary}</p>
            </section>
          )}
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                    <span className="text-gray-600 text-sm">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">{exp.company}</p>
                  <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </section>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                    <span className="text-gray-600 text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700">{edu.degree}</p>
                  {edu.relevantCourses && (
                    <p className="text-gray-600 text-sm mt-1">
                      <span className="font-medium">Relevant Coursework:</span> {edu.relevantCourses}
                    </p>
                  )}
                  {edu.achievements && (
                    <p className="text-gray-600 text-sm mt-1">
                      <span className="font-medium">Achievements:</span> {edu.achievements}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;