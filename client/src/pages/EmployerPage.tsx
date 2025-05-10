import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Employer Page Component
 * 
 * Dedicated page for employers to learn about JobHive's services
 * Includes features, benefits, and a contact form for employers
 */
const EmployerPage = () => {
  const { ref: pageRef } = useScrollAnimation();
  
  // Set page title
  useEffect(() => {
    document.title = "For Employers - JobHive";
  }, []);

  return (
    <main className="py-20 px-4" ref={pageRef}>
      <div className="container">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Candidate</h1>
              <p className="text-lg mb-6">
                Connect with qualified students and fresh graduates who are eager to bring fresh perspectives and up-to-date knowledge to your company.
              </p>
              <Button className="btn-pulse" style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                Post a Job
              </Button>
            </div>
            
            <div className="fade-in-up animate-delay-200">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Professional workplace environment" 
                className="rounded-lg shadow-xl w-full float-animation"
              />
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="mb-16 fade-in-up animate-delay-100">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Hire Fresh Talent?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="bg-[#FFFBEA] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <i className="fas fa-lightbulb text-[#F6C500] text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Fresh Perspectives</h3>
                <p className="text-gray-600">
                  Recent graduates bring new ideas and perspectives that can help your company innovate and stay competitive.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="bg-[#FFFBEA] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <i className="fas fa-code text-[#F6C500] text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Up-to-date Skills</h3>
                <p className="text-gray-600">
                  Students and fresh graduates have been trained in the latest technologies, methodologies, and best practices.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="bg-[#FFFBEA] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <i className="fas fa-users text-[#F6C500] text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Growth Potential</h3>
                <p className="text-gray-600">
                  Young professionals are eager to learn and grow with your company, offering long-term value and loyalty.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="mb-16 fade-in-up animate-delay-200">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#F6C500] text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Create Account</h3>
              <p className="text-gray-600">Register your company and create your employer profile</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#F6C500] text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Post Job</h3>
              <p className="text-gray-600">Create detailed job listings with requirements and benefits</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#F6C500] text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Review Applications</h3>
              <p className="text-gray-600">Browse applications and filter candidates based on criteria</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#F6C500] text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-bold mb-2">Connect</h3>
              <p className="text-gray-600">Message candidates directly and schedule interviews</p>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="mb-16 fade-in-up animate-delay-300">
          <h2 className="text-3xl font-bold mb-8 text-center">Simple Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <div className="text-3xl font-bold mb-4">Free</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>1 job posting</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Basic candidate filters</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Email support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-[#F6C500] shadow-lg">
              <CardContent className="p-6">
                <div className="bg-[#FFFBEA] text-[#F6C500] text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-2">
                  Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Standard</h3>
                <div className="text-3xl font-bold mb-4">$99<span className="text-lg font-normal">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>5 job postings</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Advanced candidate filters</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Featured listings</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button style={{ backgroundColor: "#F6C500", color: "#000000" }} className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">Custom</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Unlimited job postings</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Custom employer branding</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Premium candidate access</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="mb-16 fade-in-up animate-delay-400">
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                  <p className="mb-6">
                    Have questions or need more information about our employer services? Contact our team and we'll get back to you shortly.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <i className="fas fa-map-marker-alt text-[#F6C500] mt-1 mr-3"></i>
                      <span>Middle East University, Amman, Jordan</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-envelope text-[#F6C500] mt-1 mr-3"></i>
                      <span>employers@jobhive.com</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-phone-alt text-[#F6C500] mt-1 mr-3"></i>
                      <span>+962 6 123 4567</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your company" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@company.com" />
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message..." rows={5} />
                    </div>
                    <Button style={{ backgroundColor: "#F6C500", color: "#000000" }}>
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default EmployerPage;
