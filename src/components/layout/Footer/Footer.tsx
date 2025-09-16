import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(3, 0),
  marginTop: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  margin: theme.spacing(0, 2),
}));

const Footer = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems="center"
          textAlign={isMobile ? 'center' : 'left'}
        >
          <Typography variant="body2" mb={isMobile ? 2 : 0}>
            © {new Date().getFullYear()} Kweli. All rights reserved.
          </Typography>
          <Box>
            <StyledLink to="/privacy">
              Privacy Policy
            </StyledLink>
            <StyledLink to="/terms">
              Terms of Service
            </StyledLink>
            <StyledLink to="/contact">
              Contact
            </StyledLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
