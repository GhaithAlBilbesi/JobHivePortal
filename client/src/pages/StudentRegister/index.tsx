import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link, useLocation } from 'wouter';
import RegistrationProgress from '@/components/auth/RegistrationProgress';
import logo from '@/assets/logo.svg';

/**
 * Student Registration Page
 * 
 * Comprehensive registration page for students/job seekers
 * Collects personal information, education, and skills
 */
const StudentRegister = () => {
  // Personal information state
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [, navigate] = useLocation();

  // Education state
  const [education, setEducation] = useState([
    { degree: '', institution: '', yearStart: '', yearEnd: '', description: '' }
  ]);

  // Skills state
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  // Handle profile picture selection
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  // Add a new education entry
  const addEducation = () => {
    setEducation([...education, { degree: '', institution: '', yearStart: '', yearEnd: '', description: '' }]);
  };

  // Update an education entry
  const updateEducation = (index: number, field: keyof typeof education[0], value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  // Remove an education entry
  const removeEducation = (index: number) => {
    if (education.length > 1) {
      const updatedEducation = [...education];
      updatedEducation.splice(index, 1);
      setEducation(updatedEducation);
    }
  };

  // Add a skill
  const addSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill('');
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Progress bar steps
  const registrationSteps = [
    { icon: <i className="fas fa-user"></i>, label: "Personal Info" },
    { icon: <i className="fas fa-graduation-cap"></i>, label: "Education" },
    { icon: <i className="fas fa-tools"></i>, label: "Skills" },
  ];

  // Handle next step
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < registrationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/register');
    }
  };

  // Country codes for dropdown
  const countryCodes = [
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  ];

  // Generate year options for education dropdowns
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Render personal information form
  const renderPersonalInfo = () => (
    <>
      <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
      
      {/* Profile Picture */}
      <div className="mb-8 flex flex-col items-center">
        <div
          className={`w-32 h-32 rounded-full border-2 ${
            profilePicturePreview ? 'border-[#F6C500]' : 'border-dashed border-gray-300'
          } flex items-center justify-center overflow-hidden mb-4`}
          onClick={() => document.getElementById('profile-picture')?.click()}
        >
          {profilePicturePreview ? (
            <img
              src={profilePicturePreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">
              <i className="fas fa-user text-4xl"></i>
            </div>
          )}
        </div>
        <input
          id="profile-picture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="hidden"
        />
        <button
          type="button"
          className="text-sm text-[#F6C500] hover:underline"
          onClick={() => document.getElementById('profile-picture')?.click()}
        >
          Upload profile picture
        </button>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="full-name" className="block font-medium mb-2">
            Full Name
          </label>
          <Input
            id="full-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-12"
          />
        </div>
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Software Engineer, Student"
            className="h-12"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <label htmlFor="phone" className="block font-medium mb-2">
          Phone
        </label>
        <div className="flex">
          <div className="w-28 mr-2">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center">
                      <span className="mr-2">{country.flag}</span>
                      <span>{country.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="h-12 flex-grow"
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-8">
        <label htmlFor="address" className="block font-medium mb-2">
          Address
        </label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Your address"
          className="h-12"
        />
      </div>
    </>
  );

  // Render education form
  const renderEducation = () => (
    <>
      <h1 className="text-2xl font-bold mb-8">Education</h1>

      {education.map((edu, index) => (
        <div key={index} className="mb-8 p-6 border rounded-lg bg-gray-50 relative">
          {education.length > 1 && (
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => removeEducation(index)}
            >
              <i className="fas fa-times"></i>
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-medium mb-2">Degree/Certification</label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="e.g. Bachelor of Science in Computer Science"
                className="h-12"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Institution</label>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                placeholder="e.g. University of Technology"
                className="h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-medium mb-2">Start Year</label>
              <Select
                value={edu.yearStart}
                onValueChange={(value) => updateEducation(index, 'yearStart', value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={`start-${year}`} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-medium mb-2">End Year (or Expected)</label>
              <Select
                value={edu.yearEnd}
                onValueChange={(value) => updateEducation(index, 'yearEnd', value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present / In Progress</SelectItem>
                  {yearOptions.map((year) => (
                    <SelectItem key={`end-${year}`} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <Textarea
              value={edu.description}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              placeholder="Briefly describe your studies, achievements, etc."
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 mb-8 border-dashed"
        onClick={addEducation}
      >
        <i className="fas fa-plus mr-2"></i> Add Another Education
      </Button>
    </>
  );

  // Render skills form
  const renderSkills = () => (
    <>
      <h1 className="text-2xl font-bold mb-8">Skills</h1>

      <div className="mb-6">
        <label className="block font-medium mb-2">Add Your Skills</label>
        <div className="flex">
          <Input
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="e.g. JavaScript, Photoshop, Project Management"
            className="h-12 flex-grow mr-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button
            type="button"
            className="h-12 px-6"
            style={{ backgroundColor: "#F6C500", color: "#000000" }}
            onClick={addSkill}
          >
            Add
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Press Enter to add multiple skills quickly
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-full px-4 py-2"
          >
            <span className="mr-2">{skill}</span>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => removeSkill(skill)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-400 italic">No skills added yet</p>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto">
        {/* Header with logo */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <img src={logo} alt="JobHive Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">JobHive</span>
          </Link>
        </div>

        {/* Progress bar */}
        <RegistrationProgress currentStep={currentStep} steps={registrationSteps} />

        <form onSubmit={handleNext} className="max-w-4xl mx-auto">
          {currentStep === 0 && renderPersonalInfo()}
          {currentStep === 1 && renderEducation()}
          {currentStep === 2 && renderSkills()}

          {/* Footer */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              className="w-40 h-12 font-medium"
              onClick={handlePrevious}
            >
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </Button>
            <Button
              type="submit"
              className="w-40 h-12 font-medium"
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
            >
              {currentStep === registrationSteps.length - 1 ? 'Complete' : 'Continue'}{' '}
              <i className="fas fa-arrow-right ml-1"></i>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;