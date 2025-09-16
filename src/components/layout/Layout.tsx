import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import '../../styles/global.css';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100vw',
  maxWidth: '100%',
  overflowX: 'hidden',
  position: 'relative',
});

const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const ContentContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const FullWidthContainer = styled('div')({
  width: '100%',
  maxWidth: '100%',
  margin: 0,
  padding: 0,
});

const Layout = ({ children, fullWidth = false }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        {fullWidth ? (
          <FullWidthContainer>{children}</FullWidthContainer>
        ) : (
          <ContentContainer>{children}</ContentContainer>
        )}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
