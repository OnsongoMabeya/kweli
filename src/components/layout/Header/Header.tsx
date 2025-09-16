import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  // TODO: Implement dark mode toggle
  const isDarkMode = false;
  const toggleColorMode = () => {
    // TODO: Implement dark mode toggle
    console.log('Toggle color mode');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          Kweli
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
          <Button component={RouterLink} to="/feedback" color="inherit">
            Feedback
          </Button>
          <Button component={RouterLink} to="/reports" color="inherit">
            Reports
          </Button>
          <IconButton onClick={toggleColorMode} color="inherit">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
