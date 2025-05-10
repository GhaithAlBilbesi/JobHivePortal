import { useState, useEffect } from "react";
import { Link as WouterLink, useLocation } from "wouter";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  List,
  ListItem,
  Drawer,
  Menu,
  MenuItem,
  Divider,
  Avatar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "@/contexts/UserContext";
import LoginModal from "./auth/LoginModal";
import "./Header.css";

/**
 * Header Component
 * 
 * Main navigation bar for the application
 * Features responsive design with mobile menu toggle
 * Implements scroll behavior for header shrinking
 * Displays different navigation options based on user role
 * Uses Material UI and vanilla CSS instead of Tailwind
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { user, isAuthenticated, logout, isRole } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginAction, setLoginAction] = useState<'login' | 'register'>('login');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handle scroll event to shrink header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path ? "active" : "";
  };

  const openLoginModal = (action: 'login' | 'register' = 'login') => {
    setLoginAction(action);
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // Get the user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Determine which navigation links to show based on user role
  const renderNavigationLinks = () => {
    const commonLinks = (
      <>
        <ListItem disablePadding>
          <WouterLink href="/" className={`nav-link ${isActive("/")}`}>
            Home
          </WouterLink>
        </ListItem>
        <ListItem disablePadding>
          <WouterLink href="/jobs" className={`nav-link ${isActive("/jobs")}`}>
            Jobs
          </WouterLink>
        </ListItem>
      </>
    );

    // Additional links based on roles
    if (!isAuthenticated) {
      return commonLinks;
    }

    if (isRole('student')) {
      return (
        <>
          {commonLinks}
          <ListItem disablePadding>
            <WouterLink href="/resume-builder" className={`nav-link ${isActive("/resume-builder")}`}>
              Resume Builder
            </WouterLink>
          </ListItem>
          <ListItem disablePadding>
            <WouterLink href="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
              Dashboard
            </WouterLink>
          </ListItem>
        </>
      );
    }

    if (isRole('employer')) {
      return (
        <>
          {commonLinks}
          <ListItem disablePadding>
            <WouterLink href="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
              Dashboard
            </WouterLink>
          </ListItem>
          <ListItem disablePadding>
            <WouterLink href="/post-job" className={`nav-link ${isActive("/post-job")}`}>
              Post Job
            </WouterLink>
          </ListItem>
        </>
      );
    }

    if (isRole('admin')) {
      return (
        <>
          {commonLinks}
          <ListItem disablePadding>
            <WouterLink href="/admin" className={`nav-link ${isActive("/admin")}`}>
              Admin Panel
            </WouterLink>
          </ListItem>
        </>
      );
    }

    return commonLinks;
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={0} 
        className={`header ${isScrolled ? 'header-shrink' : 'header-default'}`}
      >
        <Container>
          <Toolbar disableGutters className="header-container">
            {/* Logo */}
            <WouterLink href="/" className="logo-container">
              <Box className="logo-icon">
                <span role="img" aria-label="bee">🐝</span>
              </Box>
              <Box className="logo-text">
                Job<span className="logo-highlight">Hive</span>
              </Box>
            </WouterLink>
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleMenu}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <Box className="nav-menu">
                <List className="nav-list">
                  {renderNavigationLinks()}
                </List>
                
                {/* Auth Buttons or User Menu */}
                {!isAuthenticated ? (
                  <Box className="auth-buttons">
                    <Button 
                      variant="contained" 
                      color="primary"
                      className="btn-rounded"
                      onClick={() => openLoginModal('login')}
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      className="btn-rounded"
                      onClick={() => openLoginModal('register')}
                    >
                      Sign Up
                    </Button>
                  </Box>
                ) : (
                  <div>
                    <Button 
                      onClick={handleOpenUserMenu}
                      className="user-menu-button"
                    >
                      <Avatar 
                        alt={user?.name}
                        src={user?.profilePicture}
                        className="user-avatar"
                        sx={{ bgcolor: '#FFFBEA', color: '#F6C500' }}
                      >
                        {getUserInitials()}
                      </Avatar>
                      <span className="user-name">{user?.name}</span>
                    </Button>
                    <Menu
                      id="user-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseUserMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleCloseUserMenu} component={WouterLink} href="/dashboard">
                        Dashboard
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu} component={WouterLink} href="/profile">
                        My Profile
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
        
        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="top"
          open={isMobile && isMenuOpen}
          onClose={toggleMenu}
          classes={{ paper: 'mobile-nav' }}
        >
          <Container className="mobile-nav-container">
            {/* Home and Jobs links always visible */}
            <WouterLink href="/" className={`mobile-nav-link ${isActive("/")}`}>
              Home
            </WouterLink>
            <WouterLink href="/jobs" className={`mobile-nav-link ${isActive("/jobs")}`}>
              Jobs
            </WouterLink>
            
            {/* Conditional links based on authentication and role */}
            {isAuthenticated && (
              <>
                {isRole('student') && (
                  <>
                    <WouterLink href="/resume-builder" className={`mobile-nav-link ${isActive("/resume-builder")}`}>
                      Resume Builder
                    </WouterLink>
                    <WouterLink href="/dashboard" className={`mobile-nav-link ${isActive("/dashboard")}`}>
                      Dashboard
                    </WouterLink>
                  </>
                )}
                
                {isRole('employer') && (
                  <>
                    <WouterLink href="/dashboard" className={`mobile-nav-link ${isActive("/dashboard")}`}>
                      Dashboard
                    </WouterLink>
                    <WouterLink href="/post-job" className={`mobile-nav-link ${isActive("/post-job")}`}>
                      Post Job
                    </WouterLink>
                  </>
                )}
                
                {isRole('admin') && (
                  <WouterLink href="/admin" className={`mobile-nav-link ${isActive("/admin")}`}>
                    Admin Panel
                  </WouterLink>
                )}
                
                <WouterLink href="/profile" className={`mobile-nav-link ${isActive("/profile")}`}>
                  My Profile
                </WouterLink>
                
                <Button 
                  onClick={handleLogout}
                  color="error"
                  sx={{ justifyContent: 'flex-start', textTransform: 'none', fontWeight: 500 }}
                >
                  Logout
                </Button>
              </>
            )}
            
            {/* Auth buttons for logged out users */}
            {!isAuthenticated && (
              <Box className="mobile-auth-buttons">
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  className="btn-rounded"
                  onClick={() => openLoginModal('login')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  fullWidth
                  className="btn-rounded"
                  onClick={() => openLoginModal('register')}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Container>
        </Drawer>
      </AppBar>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        action={loginAction}
      />
    </>
  );
};

export default Header;
