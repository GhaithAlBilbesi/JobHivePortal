import { useEffect, useRef } from "react";
import { Button, Typography, Container, Box, Grid } from "@mui/material";
import { Link } from "wouter";
import "./Hero.css";

/**
 * Hero Component
 * 
 * Main landing banner showcasing the core value proposition
 * Implements a responsive design that adapts to different screen sizes
 * Uses Material UI and vanilla CSS instead of Tailwind
 */
const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Set initial visibility and trigger animations
  useEffect(() => {
    if (heroContentRef.current) {
      heroContentRef.current.classList.add("fade-in-up");
    }
    if (heroImageRef.current) {
      heroImageRef.current.classList.add("fade-in-up");
      heroImageRef.current.style.animationDelay = "0.2s";
    }
  }, []);

  return (
    <Box 
      component="section" 
      ref={heroRef}
      className="hero-section"
    >
      <Container>
        <Grid container alignItems="center" spacing={4}>
          {/* Left Column - Text Content */}
          <Grid item xs={12} lg={6}>
            <Box 
              ref={heroContentRef}
              className="hero-content opacity-0"
            >
              <Typography variant="h1" component="h1" className="hero-title">
                Sweet opportunities
                <Box component="span" className="hero-subtitle">
                  for the NewBees!
                </Box>
              </Typography>
              <Typography className="hero-text">
                Find the perfect job opportunities tailored for students and fresh graduates. 
                Start building your career today!
              </Typography>
              <Box className="hero-buttons">
                <Button 
                  variant="contained" 
                  color="primary"
                  className="btn-rounded"
                  component={Link}
                  href="/jobs"
                >
                  Explore Jobs
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  className="btn-rounded"
                  component={Link}
                  href="/post-job"
                  sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}
                >
                  Post a Job
                </Button>
              </Box>
            </Box>
          </Grid>
          
          {/* Right Column - Hero Image */}
          <Grid item xs={12} lg={6}>
            <Box 
              ref={heroImageRef}
              className="hero-image-container opacity-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Young professional looking for job opportunities" 
                className="hero-image float-animation" 
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Background Hexagon Pattern */}
      <Box className="hero-background">
        <Box className="hero-background-pattern" style={{ 
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NiIgaGVpZ2h0PSIxMDAiPgogIDxwYXRoIGZpbGw9IiNGNkM1MDAiIGQ9Ik00MyAwbDQzIDI1djUwbC00MyAyNUwwIDc1VjI1eiI+PC9wYXRoPgo8L3N2Zz4=")`, 
          backgroundRepeat: "repeat" 
        }}></Box>
      </Box>
    </Box>
  );
};

export default Hero;
