import { Link } from "wouter";

/**
 * Footer Component
 * 
 * Main footer for the application with links, information and contact details
 * Features responsive design with multi-column layout
 */
const Footer = () => {
  // Quick Links section removed per user request
  
  // Job Categories for the footer
  const jobCategories = [
    { label: "Technology", path: "/jobs?category=technology" },
    { label: "Business & Marketing", path: "/jobs?category=business" },
    { label: "Engineering", path: "/jobs?category=engineering" },
    { label: "Healthcare", path: "/jobs?category=healthcare" },
    { label: "Education", path: "/jobs?category=education" }
  ];
  
  // Social media links
  const socialLinks = [
    { icon: "fa-twitter", url: "#" },
    { icon: "fa-facebook-f", url: "#" },
    { icon: "fa-instagram", url: "#" },
    { icon: "fa-linkedin-in", url: "#" }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#F6C500] rounded-lg flex items-center justify-center mr-2">
                <i className="fas fa-bug text-black text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-white">Job<span className="text-[#F6C500]">Hive</span></span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting students and fresh graduates with their dream career opportunities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-gray-400 hover:text-[#F6C500] transition-colors duration-200"
                  aria-label={`Follow us on ${social.icon.replace('fa-', '')}`}
                >
                  <i className={`fab ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links section removed per user request */}
          
          {/* Job Categories */}
          <div>
            <h4 className="text-xl font-bold mb-4">Job Categories</h4>
            <ul className="space-y-2">
              {jobCategories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={category.path} 
                    className="text-gray-400 hover:text-[#F6C500] transition-colors duration-200"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#F6C500] mt-1 mr-3"></i>
                <span className="text-gray-400">Middle East University, Amman, Jordan</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-[#F6C500] mt-1 mr-3"></i>
                <span className="text-gray-400">info@jobhive.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-[#F6C500] mt-1 mr-3"></i>
                <span className="text-gray-400">+962 6 123 4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; 2024-2025 JobHive. All rights reserved. Made with passion by graduating students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
