import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Box,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(2deg);
  }
  75% {
    transform: translateY(3px) rotate(-2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const shine = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: 'inherit',
  padding: '8px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    '& .logo-icon': {
      animation: `${float} 2s ease-in-out infinite`,
      color: theme.palette.primary.main,
    },
    '& .logo-text': {
      letterSpacing: '1px',
    },
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.75rem',
  letterSpacing: '0.5px',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #60A5FA 30%, #3B82F6 90%)'
    : 'linear-gradient(45deg, #1E40AF 30%, #2563EB 90%)',
  backgroundSize: '200% auto',
  color: 'transparent',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    animation: `${shine} 3s linear infinite`,
  },
}));

const StyledIcon = styled(DescriptionIcon)(({ theme }) => ({
  fontSize: '2.2rem',
  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
  transition: 'all 0.3s ease',
  filter: theme.palette.mode === 'dark' 
    ? 'drop-shadow(0 0 3px rgba(96, 165, 250, 0.5))' 
    : 'drop-shadow(0 0 2px rgba(37, 99, 235, 0.3))',
}));

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <LogoContainer component={Link} to="/" sx={{ flexGrow: 1 }}>
          <StyledIcon className="logo-icon" />
          <LogoText className="logo-text" variant="h6">
            CV<span style={{ 
              color: theme.palette.mode === 'dark' 
                ? theme.palette.primary.light 
                : theme.palette.primary.main,
              marginLeft: '1px'
            }}>Gennies</span>
          </LogoText>
        </LogoContainer>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit" component={Link} to="/templates">
            Templates
          </Button>
          <Button color="inherit" component={Link} to="/features">
            Features
          </Button>
          <Button color="inherit" component={Link} to="/pricing">
            Pricing
          </Button>
          
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/my-resumes" onClick={handleClose}>
                  My Resumes
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            onClick={handleMobileMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/templates" onClick={handleClose}>
              Templates
            </MenuItem>
            <MenuItem component={Link} to="/features" onClick={handleClose}>
              Features
            </MenuItem>
            <MenuItem component={Link} to="/pricing" onClick={handleClose}>
              Pricing
            </MenuItem>
            {user ? (
              <>
                <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                  Dashboard
                </MenuItem>
                <MenuItem component={Link} to="/my-resumes" onClick={handleClose}>
                  My Resumes
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/login" onClick={handleClose}>
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleClose}>
                  Sign Up
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
