import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useLocation } from 'wouter';
import RegistrationProgress from '@/components/auth/RegistrationProgress';
import logo from '@/assets/logo.svg';

/**
 * Employer Registration - Company Info Step
 * 
 * First step in the employer registration process
 * Collects basic company information and logo
 */
const CompanyInfo = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [, navigate] = useLocation();

  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Handle banner file selection
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  // Progress bar steps
  const registrationSteps = [
    { icon: <i className="fas fa-building"></i>, label: "Company Info" },
    { icon: <i className="fas fa-info-circle"></i>, label: "Founding Info" },
    { icon: <i className="fas fa-share-alt"></i>, label: "Social Media Profile" },
    { icon: <i className="fas fa-phone"></i>, label: "Contact" },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register/employer/founding-info');
  };

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
        <RegistrationProgress currentStep={0} steps={registrationSteps} />

        <form onSubmit={handleNext} className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Logo & Banner Image</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Logo upload */}
            <div>
              <h2 className="text-lg font-medium mb-2">Logo</h2>
              <p className="text-sm text-gray-500 mb-4">Upload document</p>
              
              <div 
                className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center h-44 ${logoPreview ? 'border-[#F6C500]' : 'border-gray-200'}`}
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="h-full object-contain" />
                ) : (
                  <>
                    <div className="mb-4 text-gray-400">
                      <i className="fas fa-cloud-upload-alt text-3xl"></i>
                    </div>
                    <p className="text-sm text-gray-500 text-center">Browse photo or drop here</p>
                    <p className="text-xs text-gray-400 text-center mt-2">A photo larger than 400 pixels works best. Max photo size 1 MB.</p>
                  </>
                )}
                <input 
                  id="logo-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Banner upload */}
            <div>
              <h2 className="text-lg font-medium mb-2">Banner Image</h2>
              <p className="text-sm text-gray-500 mb-4">Banner Image</p>
              
              <div 
                className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center h-44 ${bannerPreview ? 'border-[#F6C500]' : 'border-gray-200'}`}
                onClick={() => document.getElementById('banner-upload')?.click()}
              >
                {bannerPreview ? (
                  <img src={bannerPreview} alt="Banner Preview" className="h-full object-contain" />
                ) : (
                  <>
                    <div className="mb-4 text-gray-400">
                      <i className="fas fa-cloud-upload-alt text-3xl"></i>
                    </div>
                    <p className="text-sm text-gray-500 text-center">Browse photo or drop here</p>
                    <p className="text-xs text-gray-400 text-center mt-2">Banner image optimal dimension 1240x400. Supported format JPEG, PNG. Max photo size 5 MB.</p>
                  </>
                )}
                <input 
                  id="banner-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Company name */}
          <div className="mb-8">
            <label htmlFor="company-name" className="block font-medium mb-2">Company name</label>
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-12"
              required
            />
          </div>

          {/* About */}
          <div className="mb-12">
            <label htmlFor="about" className="block font-medium mb-2">About Us</label>
            <Textarea
              id="about"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              placeholder="Write down about your company here. Let the candidate know who we are..."
              rows={6}
              className="resize-none"
            />
            <div className="mt-2 flex gap-2 justify-end">
              <Button variant="ghost" size="sm" type="button" className="text-gray-400">
                <i className="fas fa-bold"></i>
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-gray-400">
                <i className="fas fa-italic"></i>
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-gray-400">
                <i className="fas fa-underline"></i>
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-gray-400">
                <i className="fas fa-strikethrough"></i>
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-gray-400">
                <i className="fas fa-link"></i>
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-gray-400">
                <i className="fas fa-list-ul"></i>
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-gray-400">
                <i className="fas fa-list-ol"></i>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-40 h-12 font-medium"
              style={{ backgroundColor: "#F6C500", color: "#000000" }}
            >
              Save & Next <i className="fas fa-arrow-right ml-1"></i>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;