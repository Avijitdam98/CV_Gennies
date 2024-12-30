import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles';

const StyledToggle = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50%',
  padding: '12px',
  width: '48px',
  height: '48px',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 6px rgba(0, 0, 0, 0.4)' 
    : '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'}`,
  zIndex: 1300,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(30, 41, 59, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    transform: 'scale(1.05)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 6px 8px rgba(0, 0, 0, 0.5)'
      : '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const StyledIcon = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#F1F5F9' : '#1E293B',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',
  transform: theme.palette.mode === 'dark' ? 'rotate(180deg)' : 'rotate(0)',
}));

const DarkModeToggle = ({ toggleColorMode }) => {
  const theme = useTheme();

  return (
    <StyledToggle
      onClick={toggleColorMode}
      aria-label="toggle dark mode"
    >
      <StyledIcon>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon sx={{ fontSize: '1.5rem' }} />
        ) : (
          <Brightness4Icon sx={{ fontSize: '1.5rem' }} />
        )}
      </StyledIcon>
    </StyledToggle>
  );
};

export default DarkModeToggle;
