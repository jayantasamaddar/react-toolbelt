/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}', 'mdx-components.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'virgin-america': 'linear-gradient(to-right, #7B4397, #DC2430)',
        'grid-gradient':
          'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(to right, transparent 50%, rgba(0, 0, 0, 0.1) 50%)'
      },
      height: {
        header: 'var(--header-min-h)',
        logo: 'var(--header-logo-h)',
        'body-screen': 'calc(100vh - var(--header-min-h))',
        'body-full': 'calc(100% - var(--header-min-h))',
        footer: 'var(--footer-min-h)'
      },
      minHeight: {
        header: 'var(--header-min-h)',
        logo: 'var(--header-logo-h)',
        'body-screen': 'calc(100vh - var(--header-min-h))',
        'body-full': 'calc(100% - var(--header-min-h))',
        footer: 'var(--footer-min-h)'
      },
      maxHeight: {
        header: 'var(--header-min-h)',
        logo: 'var(--header-logo-h)',
        'body-screen': 'calc(100vh - var(--header-min-h))',
        'body-full': 'calc(100% - var(--header-min-h))',
        footer: 'var(--footer-min-h)'
      },
      margin: {
        header: 'var(--header-min-h)'
      },
      colors: {
        theme: {
          background: 'var(--color-background)',
          primary: 'var(--color-primary)',
          'primary-2': 'var(--color-primary-2)',
          accent: 'var(--color-accent)',
          'accent-2': 'var(--color-accent-2)',
          'accent-3': 'var(--color-accent-3)',
          complementary: 'var(--color-complementary)',
          'ds-complementary': 'var(--color-ds-complementary)',
          secondary: 'var(--color-secondary)',
          tertiary: 'var(--color-tertiary)'
        }
      },
      fontFamily: {
        'nexa-bold': ['Nexa', 'Helvetica', 'Arial', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif']
      },
      zIndex: {
        1: '1',
        100: '100',
        1000: '1000'
      },
      transitionProperty: {
        height: 'height',
        'min-height': 'max-height',
        'max-height': 'max-height',
        spacing: 'margin, padding'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 }
        },
        'fade-out': {
          '0%': { opacity: 100 },
          '100%': { opacity: 0 }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        'smooth-slide-in-top': {
          '0%': { transform: 'translateY(-25%)', opacity: 0 },
          '100%': { transform: 'translateX(0%)', opacity: 100 }
        },
        'grid-lines': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '30px 30px' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out forwards 0.2s',
        'fade-out': 'fade-out 0.2s ease-out forwards 0.2s',
        'slide-in-left': 'slide-in-left 0.2s ease-in-out forwards',
        'smooth-slide-in-top': 'smooth-slide-in-top 0.2s ease-in-out forwards',
        'slow-spin': 'spin 20s linear infinite',
        grid: 'grid-lines 5s linear infinite'
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        circle: 'circle',
        square: 'square',
        decimal: 'decimal',
        'lower-roman': 'lower-roman',
        'upper-roman': 'upper-roman'
      }
    }
  }
};

// module.exports = {
//   content: ['./src/**/*.{tsx,ts,jsx,js}'],
//   theme: {
//     extend: {
//   },
//   plugins: [
//     plugin(function ({ addVariant }) {
//       addVariant('middle', '&:not(:first-child):not(:last-child)');
//     })
//   ]
// };
