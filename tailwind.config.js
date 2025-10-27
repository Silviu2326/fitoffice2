/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Paleta de colores del sistema de diseño
      colors: {
        // Primarios
        primary: {
          DEFAULT: '#6366F1',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        // Neutros (Light Mode)
        background: '#FFFFFF',
        surface: {
          DEFAULT: '#F8FAFC',
          2: '#F1F5F9',
        },
        // Text
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        // Borders
        border: {
          DEFAULT: '#E2E8F0',
          light: '#F1F5F9',
        },
        // Estados semánticos
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#DBEAFE',
          dark: '#2563EB',
        },
        // Dark Mode
        dark: {
          background: '#0F0F23',
          surface: '#1E1E2E',
          surface2: '#2A2A3A',
          text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
            muted: '#64748B',
          },
          border: '#334155',
          borderLight: '#475569',
        },
      },
      // Tipografía
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-large': ['48px', { lineHeight: '56px', fontWeight: '800' }],
        'display': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'h1': ['30px', { lineHeight: '38px', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-large': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'overline': ['10px', { lineHeight: '16px', fontWeight: '600', textTransform: 'uppercase' }],
      },
      // Espaciado (Sistema 8px)
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
      },
      // Radios de borde
      borderRadius: {
        'none': '0px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      // Sombras (Elevación)
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      // Transiciones
      transitionDuration: {
        'instant': '0ms',
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
        'slower': '500ms',
      },
      // Animations y easing
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      // Tamaños de iconos
      width: {
        'icon-xs': '12px',
        'icon-sm': '16px',
        'icon-md': '20px',
        'icon-lg': '24px',
        'icon-xl': '32px',
        'icon-2xl': '48px',
      },
      height: {
        'icon-xs': '12px',
        'icon-sm': '16px',
        'icon-md': '20px',
        'icon-lg': '24px',
        'icon-xl': '32px',
        'icon-2xl': '48px',
      },
    },
  },
  plugins: [],
};
