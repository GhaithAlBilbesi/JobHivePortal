import React from 'react';

interface JobHiveLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const JobHiveLogo: React.FC<JobHiveLogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  // Calculate dimensions based on size
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 },
  }[size];

  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height 
      }}
    >
      <div className="relative">
        <div 
          className="bg-[#F6C500] rounded-full absolute"
          style={{
            width: dimensions.width * 0.9,
            height: dimensions.height * 0.9,
            top: '5%',
            left: '5%',
          }}
        />
        <div className="absolute" style={{ top: '20%', left: '25%' }}>
          <span 
            role="img" 
            aria-label="bee" 
            style={{ 
              fontSize: dimensions.width * 0.6,
              filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))'
            }}
          >
            🐝
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobHiveLogo;