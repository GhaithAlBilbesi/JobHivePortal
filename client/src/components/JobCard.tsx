import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Job Card Component
 * 
 * Displays a single job posting with all relevant details
 * Handles animation and interaction for the job card
 * 
 * @param {Object} props - Component props
 * @param {Object} props.job - Job data object
 * @param {number} props.animationDelay - Delay for animation in milliseconds
 */
const JobCard = ({ job, animationDelay = 0 }: { job: any, animationDelay?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden opacity-0 fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
      ref={cardRef}
    >
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="bg-[#FFFBEA] text-[#F6C500] hover:bg-[#FFFBEA]">{job.type}</Badge>
            <h3 className="text-xl font-bold mt-2">{job.title}</h3>
            <div className="text-gray-600 mt-1">{job.company}</div>
          </div>
          <div className="w-12 h-12 bg-[#FFFBEA] rounded-lg flex items-center justify-center">
            <i className={`fas ${job.icon} text-[#F6C500] text-xl`}></i>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <i className="fas fa-map-marker-alt mr-2"></i>
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <i className="fas fa-clock mr-2"></i>
          <span>{job.schedule}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-3">
          <i className="fas fa-money-bill-wave mr-2"></i>
          <span>{job.salary}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {job.skills.map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between mt-3">
          <Button 
            className="rounded-full"
            style={{ backgroundColor: "#F6C500", color: "#000000" }}
          >
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            className="border border-gray-300 text-gray-600 rounded-full"
          >
            <i className="far fa-bookmark"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
