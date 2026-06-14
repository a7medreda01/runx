export const ThemeConfig = {
  colors: {
    primary: '#0F1F5C',       // Deep prestige navy
    secondary: '#B8923A',     // Antique gold (richer, less yellow)
    secondaryLight: '#D4AF6A', // Lighter gold for highlights
    accent: '#EEF3FF',        // Soft blue tint
    accentWarm: '#FDF8EE',    // Warm gold tint
    background: '#F5F6FB',    // Crisp off-white
    surface: '#FFFFFF',
    surfaceElevated: '#FAFBFF',
    dark: '#080F2E',          // Almost-black navy
    darker: '#040A1D',        // Footer depth
    border: '#E2E8F8',        // Subtle border
    success: '#0E9158',
    text: {
      primary: '#0F1F5C',
      secondary: '#4A5880',
      light: '#8494B8',
      muted: '#B0BDDA',
      inverse: '#FFFFFF',
      gold: '#B8923A',
    },
    gradient: {
      hero: 'linear-gradient(145deg, #040A1D 0%, #0F1F5C 45%, #162872 100%)',
      heroOverlay: 'linear-gradient(180deg, rgba(4,10,29,0.0) 0%, rgba(4,10,29,0.85) 100%)',
      card: 'linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 100%)',
      gold: 'linear-gradient(135deg, #9A7A2E 0%, #C9A84C 40%, #E8C96B 70%, #B8923A 100%)',
      goldSubtle: 'linear-gradient(135deg, #FDF8EE 0%, #F5E9CC 100%)',
      navy: 'linear-gradient(135deg, #0F1F5C 0%, #162872 100%)',
      section: 'linear-gradient(180deg, #F5F6FB 0%, #FFFFFF 100%)',
    }
  },
  typography: {
    fontFamily: {
      arabic: "'Tajawal', 'Cairo', sans-serif",
      display: "'Cairo', sans-serif",
    },
    sizes: {
      hero: '3.4rem',
      h1: '2.6rem',
      h2: '2.1rem',
      h3: '1.4rem',
      body: '1rem',
      small: '0.875rem',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.7',
      relaxed: '1.9',
    }
  },
  spacing: {
    sectionPadding: '110px 0',
    containerMaxWidth: '1200px',
    containerPadding: '0 28px',
  },
  effects: {
    borderRadius: {
      xs: '6px',
      small: '10px',
      medium: '18px',
      large: '26px',
      xl: '36px',
      pill: '100px',
    },
    shadow: {
      xs: '0 1px 4px rgba(15, 31, 92, 0.06)',
      card: '0 4px 28px rgba(15, 31, 92, 0.08)',
      cardHover: '0 16px 48px rgba(15, 31, 92, 0.15)',
      hover: '0 20px 60px rgba(15, 31, 92, 0.18)',
      gold: '0 6px 24px rgba(184, 146, 58, 0.35)',
      goldHover: '0 12px 40px rgba(184, 146, 58, 0.45)',
      dark: '0 24px 80px rgba(4, 10, 29, 0.4)',
      inset: 'inset 0 1px 0 rgba(255,255,255,0.08)',
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transitionFast: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
    transitionSlow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  assets: {
    logoPath: 'assets/logo.svg',
    logoText: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
      about: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      office: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    }
  },
  icons: {
    cdn: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
  }
};